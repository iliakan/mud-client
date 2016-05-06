
'use strict';

const ConnectorHandler = require('../lib/connectorHandler');

// command #vc enabled auto lower air rests -> vapour chain

module.exports = class extends ConnectorHandler {


  get connectorEvents() {
    return ['battleStart', 'readlineServer', 'battleDead', 'battleFinish'];
  }


  get connectorCommands() {
    return ['vc'];
  }


  constructor(connector) {
    super(connector);
    this.repeats = 0;
  }

  onBattleFinish() {
    this.enabled = false;
  }

  onCommandVc() {
    this.enabled = true;
    if (this.connector.character.stats.battle) {
      this.connector.write("cast 'lower air resist'");
    }
  }

  onBattleStart() {
    if (!this.enabled) return;
    this.connector.write("cast 'lower air resist'");
  }

  onBattleDead() {
    if (!this.enabled) return;
    this.connector.write("cast 'lower air resist'");
  }


  onReadlineServer(line) {
    if (!this.enabled) return;

    if (line.startsWith('You direct a channel of superheated air')) {
      this.act();
    }

    if (line.endsWith('looks more vulnerable to air and gas attacks.')) {
      this.act();
    }

  }

  act() {
    this.connector.write("cast 'vapour'");

    this.repeats++;
    if (this.repeats % 15 == 0) {
      this.connector.write('nop' + (Math.random()*10 ^ 0));
      this.repeats = 0;
    }
  }

};

