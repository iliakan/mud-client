'use strict';

// A simple auto-recasting script

let action = "c slow self";

let cast = [
  'You trace a rune of magic in the air.',
  'You draw a rune of magic with your hand.',
  'With your finger, you draw a sigil in the air.',
  "You trace a sigil in the air."
];

module.exports = function(connector) {

  connector.on('readlineServer', function (line) {
    // strip beginning prompt
    // if I cast a spell
    if (cast.indexOf(line) != -1) {
      // recast it
      connector.write(action);
      connector.write('u');
    }

  });

};
