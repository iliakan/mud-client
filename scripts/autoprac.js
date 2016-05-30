'use strict';


const ConnectorHandler = require('../lib/connectorHandler');

const SLEEP = false;

let prepare = [
  'wake',
  'get whi kna',
  'drink whi',
  'drink whi',
  'drop whi',
  'sac whi'
];

let prac;


prac = [
  "c 'detect in",
  "c 'cancel",
  "c 'spider",
  "c 'dispel m' self",
  "c sanc",
  // "c ironskin",
  // "c haste self",
  // "c displacement",
  // "c pass",
  "c protective",
  // "c duo",
  // "c astral",
  // "c 'water brea",
  // "c spellt",
  // "c fly",
  // "c identify 1.",
  // "c 'harden",
  "c 'faerie fog",
  "c 'tesseract' wedna",
  // "c 'word of recall'",
  // "c grounding",
  // "c enlar",
  // "c shrink",
  // "c eldrit",
  // "c shape fox",
  // "c shape fox",
  // "c shape fox",
  // "revert",
  // "c beholder",
  // "c beholder",
  // "c beholder",
  // "revert"
];

/*
prac = [
  "c cancel",
  // "c word",
  "c gate rorks",
  "c 'remove curse",
  "c pass",
  "c 'resist fire",
  "c 'resist cold",
  "c 'resist light",
  // "c bless",
  "c fly",
  "c protection",
  "c 'ring of sanc",
  "c 'cure bli",
  "c 'detect i",
  "c ident 1.",
  "c 'cure poi",
  "c 'cure dis"
];
*/

module.exports = class extends ConnectorHandler {


  enable() {
    super.enable();
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
      for (let i = 0; i < prepare.length; i++) {
        let cmd = prepare[i];
        this.connector.write(cmd);
      }
      let loops = 2;
      for (let l = 0; l < loops; l++) {
        for (let i = 0; i < prac.length; i++) {
          let cmd = prac[i];
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



