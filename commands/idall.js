'use strict';

const chalk = require('chalk');
const ConnectorHandler = require('../lib/connectorHandler');
const _ = require('lodash');

const notifier = require('node-notifier');
// identify all items on the ground

module.exports = class extends ConnectorHandler {

  constructor(connector) {
    super(connector);
    this.getAll = this.getAll.bind(this);
    this.ident = this.ident.bind(this);
  }

  get connectorCommands() {
    return ['idall'];
  }

  get connectorEvents() {
    return ['readlineServer'];
  }

  onCommandIdall() {
    this.enabled = true;
    this.connector.write(`get all.coins`);
    this.connector.write(`get all.coins`);
  }


  getAll() {
    this.connector.write('get all');
  }

  ident() {
    this.connector.write(`c ident 1.`);
    this.connector.write(`put 1. kna`);
    this.connector.write(`get all`);
  }


  onReadlineServer(line) {
    if (!this.enabled) return;

    let match;
    if (match = line.match(/can be referred to as '(.*)'/)) {
      this.last = match[1];
    }

    let connector = this.connector;

    let lastGetTime = 0;

    let timer = setInterval(() => {
      if (Date.now() - lastGetTime > 10000) {
        this.enabled = false;
        clearInterval(timer);
      }
    }, 10000);


    if (line.match(/^You get \d+ (gold|silver) coins?/)
      || line.match(/You get a gold coin./)
      || line.startsWith('You see no coin')) {
      this.connector.once('stats', this.getAll);
    } else if (line.startsWith('You get')) {
      lastGetTime = Date.now();
      this.connector.once('stats', this.ident);
    } else if (line.match(/regeneration|artifact|artefact|averaging at [23]|strange|by \d\d/i) && !line.includes('health by') && !line.includes('mana by')) {
      let found = this.last + '\n' + line;
      notifier.notify({
        message: found,
        sound:   'Bottle',
        wait:    true
      });
      process.stdout.write('\n' + chalk.red(found) + '\n');
    }
  }


};


