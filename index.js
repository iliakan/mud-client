'use strict';

const config = require('./config');
const Connector = require('./connector');
const Character = require('./character');

const charName = process.argv[process.argv.length - 1];

if (!config[charName]) {
  throw new Error("No character in config: " + charName);
}

let connector = new Connector();
connector.connect(config, charName);

let character = new Character(connector, charName, config[charName].options);

// #off disables all actions
connector.on('command', function(cmd, args) {
  if (cmd == 'off') {
    connector.readlineServerDisabled = true;
  }
});

connector.on('command', function(cmd, args) {
  if (cmd == 'prompt') {
    let name = charName[0].toUpperCase() + charName.slice(1);
    connector.write(`prompt <${name} %h/%Hhp %m/%Mmana %v/%Vmv | %e>%c`);
    connector.write(`battleprompt <${name} %h/%Hhp %m/%Mmana %v/%Vmv | %e> [%n]: %t     [%N]: %T%c`);
  }
});

// Autorepeat command:
// #10 say Boo!

// require('./autoprac')(connector);

connector.loadHandler('./lib/speedwalk');
connector.loadHandler('./commands/back');
connector.loadHandler('./commands/all');
connector.loadHandler('./commands/groupdo');
connector.loadHandler('./commands/groupheal');
connector.loadHandler('./commands/idall');
connector.loadHandler('./commands/morph');
connector.loadHandler('./commands/sac');
connector.loadHandler('./commands/repeat');
connector.loadHandler('./commands/go');
connector.loadHandler('./commands/load');
connector.loadHandler('./commands/unload');
connector.loadHandler('./commands/vc');
connector.loadHandler('./commands/opall');
connector.loadHandler('./commands/sanc');
connector.loadHandler('./triggers/autoeat');
connector.loadHandler('./commands/edge');
connector.loadHandler('./triggers/weapon');
connector.loadHandler('./commands/sle');
connector.loadHandler('./commands/afk');
connector.loadHandler('./commands/buyfood');
connector.loadHandler('./triggers/autogroup');


connector.loadHandler('./notifiers/interaction');


