'use strict';

const AutoBattleHandler = require('../lib/autoBattleHandler');

module.exports = class extends AutoBattleHandler {

  constructor(connector) {
    super(connector, 'eyejab', function(line) {
      return line.startsWith('You try to catch');
    });
  }


  onReadlineServer(line) {

    // and then lunge
    if (line.endsWith('with a sharp flick of your weapon!')
      || line.startsWith('You attempt to jab') // unaffected
      || line.startsWith("Your lunge ")) {
      this.connector.write('lunge');
      this.repeats++;
      if (this.repeats % 15 == 0) {
        this.connector.write('nop' + (Math.random()*10 ^ 0));
        this.repeats = 0;
      }
    } else {
      super.onReadlineServer(line);
    }


  }


};
