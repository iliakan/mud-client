'use strict';

const ipc = require('node-ipc');

ipc.config.id = 'mud';
ipc.config.retry = 1500;

ipc.serveNet(3232, function() {
    ipc.server.on('all', function(data, socket) {
        ipc.server.broadcast('all', data);
      }
    );
  }
);


ipc.server.start();

