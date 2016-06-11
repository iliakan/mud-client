'use strict';

const ConnectorHandler = require('../lib/connectorHandler');

// #trigger hi {says, '(.*?)'} {say $1}
// #trigger bleed {bleeding .* (\w+)!} {c soften $1}
// #trigger backhand {backhand .* (\w+).} {c soften $1}
// #trigger lunge {(?:lunge|bleeding|backhand|overhead blow) .* (\w+).} {c soften $1}
// #trigger backhand {backhand .* (\w+).} {bleed $1}
// #trigger bleed {bleeding .* (\w+)!} {fd $1}
class Trigger {
  constructor(connector, pattern, reaction) {
    this.connector = connector;

    this.pattern = new RegExp(pattern);
    this.reaction = reaction;

    this.onReadlineServer = this.onReadlineServer.bind(this);

    connector.on('readlineServer', this.onReadlineServer);
  }

  remove() {
    this.connector.removeListener('readlineServer', this.onReadlineServer);
  }

  onReadlineServer(line) {
    let match = line.match(this.pattern);
    // console.log(match);
    if (match) {
      let cmd = this.reaction.replace(/\$(\d)/g, function(_, num) {
        // console.log("REPLACING " + _ + " -> " + match[num]);
        return match[num];
      });
      this.connector.showInfo(`trigger ${cmd}`);
      this.connector.readlineClient.emit('line', cmd);
    }
  }
}

module.exports = class extends ConnectorHandler {

  constructor(connector) {
    super(connector);
    this.triggers = {};
  }


  get connectorCommands() {
    return ['trigger'];
  }

  onCommandTrigger(args) {
    let triggerName = args[0];

    if (this.triggers[triggerName]) {
      this.triggers[triggerName].remove();
      delete this.triggers[triggerName];
      this.connector.showInfo(`-trigger ${triggerName}`);
    }

    if (!args[1]) {
      return;
    }

    if (args.length != 3) {
      this.connector.showError("Arguments must be 1 (delete) or 3 (create trigger)")
      return;
    }
    let pattern = new RegExp(args[1]);
    let reaction = args[2];

    this.triggers[triggerName] = new Trigger(this.connector, pattern, reaction);

    this.connector.showInfo(`+trigger ${pattern} -> ${reaction}`);
  }

};

