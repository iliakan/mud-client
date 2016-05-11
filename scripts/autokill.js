'use strict';

// Auto-mermaid-killing script

let co = require('co');

const SpeedWalk = require('../lib/speedwalk');

const ConnectorHandler = require('../lib/connectorHandler');

/**
 * options:
 *   attack
 *   waitBetween
 *   walk
 *   prepare
 *   there
 *   back
 *   targets
 */
module.exports = class extends ConnectorHandler {

  constructor(connector, options) {
    super(connector);
    this.options = options;
  }

  enable() {
    super.enable();

    for (let p of this.options.prepare) {
      this.connector.write(p);
    }

    co(this.run()).catch(err => {
      console.error(err.message, err.stack);
      process.exit(1);
    });
  }

  get connectorEvents() {
    return ['readlineServer'];
  }

  onReadlineServer(line) {

    let match = line.match(/^A strange buzzing sound fills your ears as (.*) pops in from nowhere!/);

    if (match) {
      this.connector.write(`get "${match[1]}"`);
      this.connector.write(`put "${match[1]}" back`);
      return;
    }


  }


  disable() {
    super.disable();
    this.stopRun = true;
  }

  goThere() {
    if (this.options.there) {
      let walks = SpeedWalk.splitMany(this.options.there);
      for (let walk of walks) this.connector.write(walk, true);
    }
  }

  goBack() {
    if (this.options.back) {
      let walks = SpeedWalk.splitMany(this.options.back);
      for (let walk of walks) this.connector.write(walk, true);
    }
  }

  *run() {

    let connector = this.connector;
    while (!this.stopRun) { // forever

      this.goThere();

      let walks = SpeedWalk.splitMany(this.options.walk);

      while (true) { // walk

        let i = 0;

        let self = this;
        while (true) { // one kill

          connector.write(this.options.attack + ' ' + this.options.targets[i]);

          // true if killed, false otherwise
          let killed = yield function(callback) {
            connector.once('readlineServer', function onLine(line) {
              // console.log("ONLINE", JSON.stringify(line));
              if (line.includes('DEAD!!')) {
                // connector.write('get chance');
                // connector.write('get luck');
                // connector.write('get fortune');
                connector.write('get book');
                if (self.options.onKill) {
                  self.options.onKill.call(self, connector);
                }
                callback(null, true);
              } else if (line.endsWith('has fled!')) {
                callback(null, true);
              } else if (line.includes('in half with a clean cut!')) {
                connector.write('get all corp');
                connector.write('sac corp');
                callback(null, true);
              } else if (line.includes("They aren't here.")) {
                callback(null, false);
              } else {
                connector.once('readlineServer', onLine);
              }
            });
          }.bind(this);

          // console.log("I=" + i, killed);
          if (killed) {
            i = 0;
          } else {
            i++;
            // console.log("NEW", i);
            if (i == this.options.targets.length) break;
          }

          // console.log(this.connector.character.state);
          if (this.connector.character.state == this.connector.character.BATTLE) {
            // console.log("WAIT FINISH");
            yield function(callback) {
              this.connector.once('battleFinish', () => callback());
            }.bind(this);
          }

        }

        if (!walks.length) {
          break;
        }
        if (this.options.betweenWalks) {
          if (typeof this.options.betweenWalks == 'function') {
            this.options.betweenWalks.call(this);
          } else {
            connector.write(this.options.betweenWalks);
          }
        }

        let nextWalk = walks.shift();
        connector.show("NEXT " + nextWalk);
        connector.write(nextWalk);
        if(nextWalk.startsWith('open ')) {
          nextWalk = walks.shift();
          connector.show("NEXT " + nextWalk);
          connector.write(nextWalk);
        }

      }

      this.goBack();

      /*
      if (!this.options.nofood) {
        connector.character.eat();
        connector.character.drink();
      }
      */

      // connector.write('put luck ' + connector.character.store);
      // connector.write('put chance ' + connector.character.store);
      // connector.write('put fortune ' + connector.character.store);

      connector.write('drop all.spellbook');

      yield (callback) => {
        setTimeout(callback, this.options.waitBetween);
      };
    }

  }


};

