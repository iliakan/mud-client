'use strict';

const AutoBattleHandler = require('../lib/autoBattleHandler');

class Pincer extends AutoBattleHandler {

  constructor(connector) {
    super(connector, 'pincer', function(line) {
      return line.match(/^You catch .*? between your axes in a pincer.$/) || line == 'You mix up your axes and fail.';
    });
  }

}

module.exports = Pincer;
