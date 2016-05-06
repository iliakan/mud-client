'use strict';

const ConnectorHandler = require('../lib/connectorHandler');

// reverses the speedwalk
// #back 2wn  -> s2e
class BackCommand extends ConnectorHandler {

  get connectorCommands() {
    return ['back'];
  }

  onCommandBack(args) {
    let walk = args[0];
    if (!walk.match(/^[0-9neswud]+$/)) {
      this.connector.showError("Not a valid speedwalk: " + walk);
    }

    let walks = walk.match(/\d*[neswud]/g).reverse();
    let reversed = '';
    for (let i = 0; i < walks.length; i++) {
      let walk = walks[i]; // 13w
      let direction = walk[walk.length - 1];
      direction = {
        w: 'e',
        e: 'w',
        s: 'n',
        n: 's',
        u: 'd',
        d: 'u'
      }[direction];
      reversed += (parseInt(walk) || '') + direction;
      let count = parseInt(walk) || 1;
      for (let j = 0; j < count; j++) {
        this.connector.write(direction, true);
      }
    }

    this.connector.show(reversed);

  }

}

module.exports = BackCommand;

