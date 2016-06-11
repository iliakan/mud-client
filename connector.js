'use strict';

const net = require('net');
const readline = require('readline');
const TelnetInput = require('telnet-stream').TelnetInput;
const TelnetOutput = require('telnet-stream').TelnetOutput;
const EventEmitter = require('events').EventEmitter;
const debug = require('debug')('connector');
const through2 = require('through2');
const chalk = require('chalk');
const path = require('path');
const fse = require('fs-extra');
const ipc = require('./lib/ipc');

class ReadlineInterface extends readline.Interface {
  constructor(...args) {
    super(...args);
    this.setPrompt('');
    this.prompt(true); // no reset cursor position @ prompt
  }

  handleKey(key) {
    // ctrl + arrows are for text editing
    if (key.ctrl && ['up', 'down', 'left', 'right'].includes(key.name)) {
      key.ctrl = false;
      return false;
    }

    if (key && key.name == 'up') {
      this.emit('line', key.shift ? 'u' : 'n');
      return true;
    }
    if (key && key.name == 'down') {
      this.emit('line', key.shift ? 'd' : 's');
      return true;
    }
    if (key && key.name == 'left') {
      this.emit('line', 'w');
      return true;
    }
    if (key && key.name == 'right') {
      this.emit('line', 'e');
      return true;
    }

  }

  _ttyWrite(s, key) {
    if (key) {
      let handled = this.handleKey(key);
      if (handled) return;
    }

    // vs <target>
    // alias a1 murder <target>
    if (s == '`') {
      this.emit('line', 'a1'); // attack 2
      return;
    }
    if (s == '~') {
      this.emit('line', 'a2'); // attack 2
      return;
    }
/*
    if (s == '!') {
      this.emit('line', '!'); // attack
      return;
    }
*/
    super._ttyWrite(s, key);
  }
}

/**
 * events:
 *  readlineServer - a line from server
 *  readlineClient - a line from client
 *  data - anything from a server
 */
class Connector extends EventEmitter {

  constructor() {
    super();
    this.handlers = {};
    this.setMaxListeners(0);
  }

  // connect to MUD via Telnet
  connect(config, charName) {

    let charConfig = config[charName];
    let port = charConfig.port;
    let host = charConfig.host;

    const telnetInput = this.telnetInput = new TelnetInput();
    const telnetOutput = this.telnetOutput = new TelnetOutput();

    this.ipc = ipc(charName);
    this.socket = net.createConnection(port, host)
      .setKeepAlive(true)
      .setNoDelay(true);

    this.socket.pipe(telnetInput);
    telnetOutput.pipe(this.socket);

    this.socket.on('close', () => {
      this.socket.unpipe(telnetInput);
      telnetOutput.unpipe(this.socket);
      this.readlineServer.close();
      this.readlineClient.close();
    });

    this.readlineClient = new ReadlineInterface(
      process.stdin,
      process.stdout // need that for history and special keys to work
    );

    telnetInput.on('data', data => this.emit('dataServer', data));

    /*
    // add \n to prompt unless it exists already or a battleprompt
    const promptNewLineStream = through2(function(chunk, enc, callback) {
      chunk = chunk.toString('utf-8');
      chunk = chunk.replace(/([\n\r]|^)<.*?>(?!\n)(?! \[)/g, '$&\n');
      // console.log("CHUNK", JSON.stringify(chunk));
      callback(null, chunk);
    });
    telnetInput.pipe(promptNewLineStream);

     */

    fse.ensureDirSync('./logs/' + charName);

    telnetInput.pipe(through2(function(chunk, enc, callback) {
      chunk = chunk.toString('utf-8');
      chunk = chunk.replace(/\r/g, '');
      callback(null, chunk);
    })).pipe(fse.createWriteStream('./logs/' + charName + '/' + Date.now() + '.log'));

    telnetInput.pipe(through2((chunk, enc, callback) => {
      // remove ending newline from the prompt to show more nicely
      chunk = chunk.toString('utf-8');
      chunk = chunk.replace(/((?:[\n\r]|^)<.*?>)\n\r?/g, '$1 ');
      // chunk = this.ignoreFilter(chunk);
      if (chunk) {
        callback(null, chunk);
      } else {
        callback(null);
      }
    })).pipe(process.stdout);

    this.readlineServer = readline.createInterface({
      input: telnetInput
    });

    this.readlineServer.resume();


    // wait until the prompt and login
    this.readlineServer.on('line', function login(line) {
      if (line.includes('SOLACE II, The Awakening')) {
        this.write(charName);
        this.write(charConfig.password);
        this.write('Y\n'); // reconnect if needed
        this.readlineServer.removeListener('line', login);
      }

      if (line == 'The realm will await your return.') {
        process.exit();
      }

      if (line == '[Hit Return to continue]') {
        this.write('\r\n');
      }
    }.bind(this));

    this.readlineServer.on('line', line => {

      if (this.readlineServerDisabled) return;

      line = chalk.stripColor(line.trim());

      // console.log("LINE", JSON.stringify(line));

      if (this.processServerPrompt(line)) return;

      // otherwise
      this.emit('readlineServer', line);

      debug("<--", line);
    });


    this.readlineClient.on('line', line => {
      line = line.trim();
      let result = {};

      debug("-->", line);

      this.processClientInput(line);

      this.readlineClient.prompt(true);
    });

    if (charConfig.loadHandlers) {
      for (let handler of charConfig.loadHandlers) {
        this.loadHandler(handler);
      }
    }
  }

  /*
  ignoreFilter(line) {
    line = line.replace(/(\n|^)(Your |You |They ).*$/gim, '');
    if (line.startsWith('Your ') || line.startsWith('You ') || line.startsWith('They ')) {
      return '';
    }
    return line;
  }*/

  processClientInput(line) {
    // no nested { } supported

    // #cmd {arg1;smth} {arg2}
    if (line[0] == '#') {
      let command = line.slice(1);
      let commandName = command.split(' ')[0];
      command = command.slice(commandName.length).trim(); // {arg1;smth} {arg2}

      let args = [];

      while (true) {
        let count = args.length;
        command = command.trim();
        if (!command) break;
        command = command.replace(/\{(.*?)\}|([#'"a-zA-Z0-9-_\/.\\]+)/, function(match, bracketed, bare) {
          args.push(bracketed || bare);
          return '';
        });

        if (args.length == count) {
          // no new args found
          this.showError("Command fail to parse command: " + line);
          return;
        }
      }

      this.emit('command', commandName, args);
      return;
    }


    // a; b; c
    let parts = line.split(';');

    for (let i = 0; i < parts.length; i++) {
      let part = parts[i].trim();

      let result = {};
      this.emit('readlineClient', part, result);
      if (!result.handled) {
        this.write(part, true);
      }

    }


  }

  // process server line, try to see if it's a prompt
  // @returns true if it was a prompt
  processServerPrompt(line) {

    let reg = /(?:^|[\r\n])<\w+ (-?\d+)\/(-?\d+)hp (-?\d+)\/(-?\d+)mana (-?\d+)\/(-?\d+)mv \|([ a-zA-Z!]*)>(?: \[(.*?)\]: (.*?)\[(.*?)\]: (.*?)(?:$|[\r\n]))?/g;

    let prompt, match;

    while ((match = reg.exec(line)) !== null) {
      // look for last stats
      prompt = match;
    }

    if (!prompt) return false;

    prompt = {
      hp:          +prompt[1],
      hpMax:       +prompt[2],
      hpPercent:   prompt[1] / prompt[2],
      mana:        +prompt[3],
      manaMax:     +prompt[4],
      manaPercent: prompt[3] / prompt[4],
      mv:          +prompt[5],
      mvMax:       +prompt[6],
      mvPercent:   prompt[5] / prompt[6],
      exits:       prompt[7].trim(),
      battle:      prompt[8] ? {
        attacker:       prompt[8].trim(),
        attackerHealth: prompt[9].trim(),
        target:         prompt[10].trim(),
        targetHealth:   prompt[11].trim()
      } : null
    };

    this.emit('prompt', prompt);

    return true;
  }

  // Send something to MUD
  write(line, quiet) {
    if (!quiet) {
      // show to user
      // speedwalk doesn't do that
      this.show(line);
    }
    this.telnetOutput.write(line + '\n')
  }

  show(line) {
    process.stdout.write(line + '\n');
  }

  showError(line) {
    this.show(chalk.red("#" + line));
  }

  showInfo(line) {
    this.show(chalk.gray("#" + line));
  }

  loadHandler(scriptPath) {
    scriptPath = path.resolve(scriptPath);
    delete require.cache[scriptPath];
    let HandlerClass;
    try {
      HandlerClass = require(scriptPath);
    } catch(e) {
      this.showError(e.message + " for " + scriptPath + "\n" + e.stack);
      return;
    }
    if (this.handlers[scriptPath]) {
      this.handlers[scriptPath].disable();
      this.showInfo("Unloaded " + scriptPath);
    }
    this.handlers[scriptPath] = new HandlerClass(this);
    this.handlers[scriptPath].enable();
    this.showInfo("Loaded " + scriptPath);
  }

  unloadHandler(scriptPath) {
    scriptPath = path.resolve(scriptPath);
    if (!this.handlers[scriptPath]) {
      this.showError("Not loaded " + scriptPath);
    } else {
      this.handlers[scriptPath].disable();
      delete this.handlers[scriptPath];

      this.showInfo("Unloaded " + scriptPath);
    }

  }

  disconnect() {
    this.socket.end();
  }

}

module.exports = Connector;
