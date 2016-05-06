'use strict';

const ConnectorHandler = require('../lib/connectorHandler');
const SpeedWalk = require('../lib/speedwalk');

const walks = {
  pal2merms: '13wn2w3n3wn2wn3w3n2e2n;open n;10n;open n;n',
  merms2pal: 's;open s;10s;open s;2s2w3s3es2es3e3s2e13e',
  merms: 'w2n2wnw3nw5nen'
};

// #go merms
module.exports = class extends ConnectorHandler {

  get connectorCommands() {
    return ['go'];
  }

  onCommandGo(args) {

    let walk = walks[args[0]];
    if (!walk) {
      this.connector.showError("Don't know walk: " + args[0]);
      return;
    }

    this.connector.show(walk);

    let walkItems = SpeedWalk.splitMany(walk);
    walkItems.forEach(item => this.connector.write(item, true));
  }

};


