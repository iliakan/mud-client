'use strict';

module.exports = {

  CHAR_NAME: {
    host:         'solace.appcasion.com',
    port:         4000,
    password:     'PASSWORD',
    loadHandlers: [
      './classes/fighter',
      './triggers/starveGuard',
      './battle/lunge'
    ]
  }

};
