'use strict';

const ConnectorHandler = require('../lib/connectorHandler');
const GroupReader = require('../lib/groupReader');

module.exports = class extends ConnectorHandler {

  get connectorCommands() {
    return ['groupdo'];
  }

  onCommandGroupdo(args) {
    let action = args.join(' ');
    new GroupReader(this.connector, group => {
      for(let member in group) {
        this.connector.write(`${action} ${member}`);
      }

    });
  }


};
