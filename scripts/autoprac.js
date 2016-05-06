'use strict';


const ConnectorHandler = require('../lib/connectorHandler');


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
  "c 'resist acid' self",
  "c 'resist negative' self",
  'c sanc self',
  'c sanc self',
  "c 'remove curse' self",
  "c 'cure blind' self",
  "c 'cure poi' self"

];


prac = [
  "c earthshield",
  "c iceshield",
  "c fireshield",
  "c 'force field'",
  "c 'force field'",
  "c 'enhanced fireball' self",
  "c 'enhanced fireball' self",
  "c 'enhanced fireball' self",
  "c 'enhanced fireball' self",
  "c 'enhanced fireball' self",
  "c 'enhanced fireball' self",
  "c 'enhanced fireball' self",
  "c 'enhanced fireball' self",
  "c 'enhanced fireball' self",
  "c 'enhanced fireball' self",
  "c 'enhanced fireball' self",
  "c 'enhanced fireball' self",
  "c 'enhanced fireball' self",
  "c 'enhanced fireball' self",
  "c 'enhanced fireball' self",
  "c 'enhanced fireball' self",
];


/*
 prac =  [
 "c redempt self",
 "c utter"
 ];*/

prac = [
  "c sanc",
  "c ironskin",
  "c soften self",
  "c haste self",
  "c slow self",
  "c slow self",
  "c blink",
  "c eldritch",
  "c armor",
  "c shield",
  "c pass",
  "c protective",
  "c duo"
];


prac = [
  'c crown',
  "c wyvern",
  "c imbue",
];

prac = ['c ignite dag', 'c "improved armor"', "c 'improved shield'"];

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
      let loops = 20;
      for (let l = 0; l < loops; l++) {
        for (let i = 0; i < prac.length; i++) {
          let cmd = prac[i];
          this.connector.write(cmd);
        }
      }
      this.connector.write('sleep rug');
      this.connector.write('sleep');

    }

  }


  onReadlineServer(line) {
    if (line.includes('You go to sleep')) {
      this.casting = false;
    }

    if (line.includes('You wake') && this.connector.character.manaPercent < 0.8) {
      this.connector.write('sleep rug');
      this.connector.write('sleep');
    }
  }


};


