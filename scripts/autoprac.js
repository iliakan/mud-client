'use strict';


const ConnectorHandler = require('../lib/connectorHandler');

const SLEEP = false;


module.exports = class extends ConnectorHandler {


  enable() {
    super.enable();
    this.prepare = this.connector.character.options.prac.prepare || [];
    this.commands = this.connector.character.options.prac.commands;
    setInterval(() => {
      this.connector.write('');
    }, 10e3);
  }

  get connectorEvents() {
    return ['stats', 'readlineServer'];
  }

  onStats(stats) {

    if (stats.hpPercent < 0.8) {
      process.exit(1);
    }
    if (this.casting) return;

    if (stats.manaPercent > 0.9) {
      this.casting = true;
      this.connector.write('wake');
      for (let i = 0; i < this.prepare.length; i++) {
        let cmd = this.prepare[i];
        this.connector.write(cmd);
      }
      let loops = 2;
      for (let l = 0; l < loops; l++) {
        for (let i = 0; i < this.commands.length; i++) {
          let cmd = this.commands[i];
          this.connector.write(cmd);
        }
      }

      // this.connector.write('sleep rug');
      if (SLEEP) {
        this.connector.write('sleep');
      } else {
        this.connector.write('smile');
      }

    }

  }


  onReadlineServer(line) {
    if (line.includes('You go to sleep') || line.includes('You smile happily.')) {
      this.casting = false;
    }

    if (line.includes('You wake') && this.connector.character.manaPercent < 0.8) {
      // this.connector.write('sleep rug');
      this.connector.write('sleep');
    }
  }


};



