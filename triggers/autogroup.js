'use strict';

// A simple auto-recasting script

let action = "c slow self";


const ConnectorHandler = require('../lib/connectorHandler');

module.exports = class extends ConnectorHandler {


  get connectorEvents() {
    return ['readlineServer'];
  }

  onReadlineServer(line) {

    let match = line.match(/^(\w+) now follows you./);
    if (match) {
      this.connector.write('group ' + match[1]);
      return;
    }

    match = line.match(/^(\w+) beckons for you to follow. Better hurry up!/);

    if (match) {
      this.connector.write('follow ' + match[1]);
      return;
    }


  }


};
