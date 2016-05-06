'use strict';

const ConnectorHandler = require('../lib/connectorHandler');

module.exports = class extends ConnectorHandler {

  constructor(connector) {
    super(connector);
    setInterval(() => {
      connector.write(' '.repeat(Math.random()*10 ^ 0));
    }, 60*1e3)
  }

};
