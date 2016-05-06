'use strict';



// TODO: ??

const ConnectorHandler = require('../lib/connectorHandler');
const GroupReader = require('../lib/groupReader');
const castCheck = require('../lib/castCheck');

module.exports = class extends ConnectorHandler {

  get connectorCommands() {
    return ['mhon', 'mhoff'];
  }


  get connectorEvents() {
    return ['stats', 'readlineServer'];
  }

  onCommandGhon(args) {
    this.enabled = true;
  }

  onCommandGhoff(args) {
    this.enabled = false;
  }


  onReadlineServer(line) {
    if (castCheck(line)) {
      this.inProcess = false;
    }
  }

  onStats(stats) {
    if (!stats.battle || !this.enabled || this.inProcess) return;

    this.inProcess = true;
    new GroupReader(this.connector, group => {
      let minHpPercent = Infinity;
      let minMember = null;
      for (let member in group) {
        let hpPercent = group[member].hpPercent;
        if (minHpPercent > hpPercent) {
          minHpPercent = hpPercent;
          minMember = member;
        }
      }

      // console.log(minMember, minHpPercent);
      if (minHpPercent < 0.7) {
        this.connector.write('c heal ' + minMember);
      } else {
        this.inProcess = false;
      }
    });
  }


};
