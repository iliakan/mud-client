'use strict';


const ConnectorHandler = require('../lib/connectorHandler');

module.exports = class extends ConnectorHandler {

  get connectorCommands() {
    return ['opall'];
  }

  onCommandOpall(args) {
    this.connector.write('open east');
    this.connector.write('open west');
    this.connector.write('open south');
    this.connector.write('open north');
    this.connector.write('open up');
    this.connector.write('open down');
  }

};

