'use strict';

const AutoBattleHandler = require('../lib/autoBattleHandler');

module.exports = class extends AutoBattleHandler {

  constructor(connector) {
    super(connector, 'under\nunder\nunder\nunder');

    /*
    super(connector, 'under\nunder', function(line) {
      return line.startsWith('You slip behind') || line.startsWith('You try to dodge beneath');
    });
*/
  }

};
