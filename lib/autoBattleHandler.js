'use strict';


const ConnectorHandler = require('../lib/connectorHandler');

// acts on battle start and on death of enemy if still fighting

class AutoBattleHandler extends ConnectorHandler {


  get connectorEvents() {
    return ['battleStart', 'readlineServer', 'battleDead'];
  }

  // do action, repeat if repeatOn(line) == true
  constructor(connector, action, repeatOn) {
    super(connector);
    this.action = action;
    this.repeatOn = repeatOn;
    this.repeats = 0;
  }

  enable() {
    // to prevent "mind drained" diesconnect when repeating the same, use nop
    super.enable();
  }

  disable() {
    super.disable();
  }

  act() {
    this.repeats++;
    if (this.repeats % 15 == 0) {
      this.connector.write('nop' + (Math.random()*10 ^ 0));
      this.repeats = 0;
    }
    this.connector.write(this.action);
  }

  onReadlineServer(line) {
    if (this.repeatOn && this.repeatOn(line)) {
      this.act();
    }
  }

  onBattleStart() {
    this.act();
  }

  onBattleDead() {
    // check if next prompt is still in battle, then do it again
    this.connector.once('stats', (stats) => {
      if (stats.battle) {
        this.act();
      }
    });

  }

}

module.exports = AutoBattleHandler;
