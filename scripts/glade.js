'use strict';

// auto glade exping script

const AutoKill = require('./autokill');

/**
 * Walk glade of beginners from SW corner
 */
module.exports = class extends AutoKill {

  constructor(connector) {
    super(connector, {
      waitBetween: 0,
      attack: 'kill',
      there: '',
      back: '',
      betweenWalks: '',
      nofood: true,
      targets: ['bird', 'fox', 'lizard', 'boar', 'rabbit', 'sparrow', 'wolf', 'trav', 'mins', 'bear', 'hunter'],
      prepare: [],
      walk: "6en6wn6en6wn6en6w5s"
    });
  }


};
