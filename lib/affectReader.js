'use strict';

module.exports = class {

  constructor(connector, callback) {
    this.callback = callback;
    this.connector = connector;

    this.affects = {};

    this.onPrompt = this.onPrompt.bind(this);
    this.onReadlineServer = this.onReadlineServer.bind(this);
    this.connector.on('prompt', this.onPrompt);
    this.connector.on('readlineServer', this.onReadlineServer);
    this.connector.write(Math.random() > 0.5 ? 'affe' : 'aff');
  }

  onReadlineServer(line) {

    if (line == 'The following skills and spells are affecting you:' || line == 'You are not affected by any skills or spells at the moment.') {
      this.gettingAffects = true;
    }

    if (this.gettingAffects) {
      let match = line.match(/'([\w ]+)' \w+ is active for (\d+) hours and (\d+) minutes/);

      if (match) {
        let spell = match[1];
        let hours = +match[2];
        let minutes = +match[3];

        this.affects[spell.toLowerCase()] = {hours, minutes};
      }

      match = line.match(/'([\w ]+)' \w+ is active permanently/);
      if (match) {
        let spell = match[1];
        this.affects[spell.toLowerCase()] = {hours: Infinity, minutes: 0};
      }
    }
  }

  onPrompt() {
    if (this.gettingAffects) {
      this.gettingAffects = false;

      this.connector.removeListener('prompt', this.onPrompt);
      this.connector.removeListener('readlineServer', this.onReadlineServer);
      this.callback(this.affects);
    }
  }
};
