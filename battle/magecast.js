
'use strict';

let casted = [
  'You chant a sweet melodious line.',
  'You recite a sweet mystical tune.',
  'You intone an ancient mystical chant.',
  'You recite a sweet mystical verse.',
  'You raise your voice into an ancient incantation.',
  'Beautiful, mystical incantation comes out of your lips.',
  "You concentrate and commune with nature's essence.",
  "You concentrate for a moment"
];

const AutoBattleHandler = require('../lib/autoBattleHandler');

module.exports = class extends AutoBattleHandler {

  constructor(connector) {
    // beware: invoker 'chain lightning' is area!
    super(connector, "cast 'magic missile", function(line) { // lightning bolt
      for (let i = 0; i < casted.length; i++) {
        let test = casted[i];
        if (line.startsWith(test)) {
          return true;
        }
      }
    });
  }

};

