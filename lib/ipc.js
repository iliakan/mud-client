'use strict';

const ipc = require("@node-ipc/node-ipc").default;

module.exports = function(charName) {

  ipc.config.id = charName;
  ipc.config.silent = true;

  ipc.connectToNet('mud', 3232);

  return ipc;
};
