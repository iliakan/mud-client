'use strict';


const ConnectorHandler = require('../lib/connectorHandler');

module.exports = class extends ConnectorHandler {


  get connectorCommands() {
    return ['enchant'];
  }

  onCommandEnchant(args) {
    this.working = true;
    this.pending = false;
    this.target = args[0];
    this.count = +args[1];

    this.timer = setInterval(() => {
      this.connector.write('');
    }, 10e3);

  }

  end() {
    clearInterval(this.timer);
    this.working = false;
  }

  get connectorEvents() {
    return ['stats', 'readlineServer'];
  }

  onStats(stats) {
    if (!this.working) return;
    if (stats.hpPercent < 0.8) {
      process.exit(1);
    }

    if (stats.manaPercent > 0.9) {
      if (!this.pending) {
        this.connector.write('wake');
        this.act();
        this.pending = true;
      }
    }

    if (stats.manaPercent < 0.1 && this.connector.character.state != this.connector.character.SLEEPING) {
      this.connector.write('sleep rug');
    }

  }

  act() {
    this.connector.write("c 'enchant weapon' " + this.target);
  }


  onReadlineServer(line) {
    if (!this.working) return;

    if (line.includes('You wake') && this.connector.character.manaPercent < 0.8) {
      this.connector.write('sleep rug');
      this.connector.write('sleep');
    }

    if (line.startsWith('You go to sleep')) {
      this.pending = false;
    }

    if (line.endsWith('glows blue.') || line.endsWith('glows a brilliant blue!')) {

      this.count++;
      if (line.endsWith('glows a brilliant blue!')) this.count++;

      if (this.count >= 8) {
        this.connector.show("DONE!");
        this.end();
      } else {
        this.act();
      }
    }

    if (line == 'Nothing seemed to happen.') {
      this.act();
    }

    if (line == 'You lost your concentration.') {
      this.act();
    }

    if (line.endsWith('then fades...oops.')) {
      this.count = 0;
      this.act();
    }

    if (line.endsWith('shivers violently and explodes!')) {
      this.connector.show("OOPS!");
      this.end();
    }
  }


};


