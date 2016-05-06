'use strict';

module.exports = class {

  constructor(connector, callback) {
    this.connector = connector;
    this.callback = callback;

    this.members = {};

    this.onPrompt = this.onPrompt.bind(this);
    this.onReadlineServer = this.onReadlineServer.bind(this);
    this.connector.on('prompt', this.onPrompt);
    this.connector.on('readlineServer', this.onReadlineServer);

    this.connector.write(Math.random() > 0.5 ? 'group' : 'gr');
  }

  onPrompt() {
    if (Object.keys(this.members).length) { // when finish reading group
      // process.stderr.write(this.members.join(','));

      this.connector.removeListener('prompt', this.onPrompt);
      this.connector.removeListener('readlineServer', this.onReadlineServer);

      this.callback(this.members);
    }
  }

  onReadlineServer(line) {
    let member = line.match(/^\[\d+ \w+\] (.*?)(\d+)/);

    if (member) {
      // A white tiger => tiger
      let memberName = member[1].trim();
      if (memberName.indexOf(' ') !== -1) return;

      memberName = memberName.split(' ').pop();
      let hpPercent = member[2] / 100; // all members must be different for this to work
      this.members[memberName] = {
        hpPercent
      };
    }
  }


};
