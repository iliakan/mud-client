'use strict';

const phrases = [
  /^You trace a rune/,
  /^You draw a rune/,
  /^With your finger, you draw a sigil in the air./,
  /^You trace a sigil/,
  /^You chant a sweet melodious line./,
  /^You recite a sweet mystical tune./,
  /^You intone an ancient mystical chant./,
  /^You recite a sweet mystical verse./,
  /^You raise your voice into an ancient incantation./,
  /^Beautiful, mystical incantation comes out of your lips./,
  /^You concentrate and commune with nature's essence./,
  /^You concentrate for a moment/,
  /^You utter a prayer/,
  /^You draw upon the powers/,
  /^You concentrate a moment/
];

module.exports = function(line) {
  for (let i = 0; i < phrases.length; i++) {
    let phrase = phrases[i];
    if (phrase.test(line)) return true;
  }

  return false;
};
