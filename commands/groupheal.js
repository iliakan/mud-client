'use strict';

const ConnectorHandler = require('../lib/connectorHandler');
const GroupReader = require('../lib/groupReader');
const castCheck = require('../lib/castCheck');

module.exports = class extends ConnectorHandler {

  get connectorCommands() {
    return ['ghon', 'ghoff'];
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
    if (!this.enabled || this.inProcess || !stats.battle) return;

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
