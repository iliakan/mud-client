'use strict';

const ConnectorHandler = require('../lib/connectorHandler');

const AffectReader = require('../lib/affectReader');

module.exports = class extends ConnectorHandler {

  constructor(connector) {
    super(connector);
  }

  get connectorCommands() {
    return ['edge'];
  }

  onCommandEdge() {
    new AffectReader(this.connector, affects => {

      let full = false;
      if (!affects['resist poison']) {
        this.connector.ipc.of.mud.emit('all', {to: 'ethero', command: '#groupdo rp'});
      }
      if (!affects['resist acid']) {
        this.connector.ipc.of.mud.emit('all', {to: 'ethero', command: '#groupdo ra'});
      }

      if (!affects['resist fire'] && full) {
        this.connector.ipc.of.mud.emit('all', {to: 'elly', command: '#groupdo rf'});
      }
      if (!affects['resist cold']) {
        this.connector.ipc.of.mud.emit('all', {to: 'elly', command: '#groupdo rc'});
      }
      if (!affects['resist negative']) {
        this.connector.ipc.of.mud.emit('all', {to: 'elly', command: '#groupdo rn'});
      }
      if (!affects['resist lightning'] && full) {
        this.connector.ipc.of.mud.emit('all', {to: 'ethero', command: '#groupdo rl'});
        // this.connector.ipc.of.mud.emit('all', {to: 'rorks', command: '#groupdo rl'});
      }

      if (!affects['proxied earthshield'] && full) {
        this.connector.ipc.of.mud.emit('all', {to: 'inno', command: '#groupdo c earthshield'});
      }

      if (!affects['proxied fireshield'] && full) {
        this.connector.ipc.of.mud.emit('all', {to: 'inno', command: '#groupdo c fireshield'});
      }
      /*
      if (!affects['proxied iceshield']) {
        this.connector.ipc.of.mud.emit('all', {to: 'inno', command: '#groupdo c iceshield'});
      }*/

      if (!affects['proxied energyshield'] && full) {
        this.connector.ipc.of.mud.emit('all', {to: 'inno', command: '#groupdo c energyshield'});
      }

      /*
      if (!affects['proxied lightning shield']) {
        this.connector.ipc.of.mud.emit('all', {to: 'inno', command: '#groupdo c "lightning shield"'});
      }*/

      if (!affects['sanctuary']) {
        this.connector.ipc.of.mud.emit('all', {to: 'jumbo', command: '#sanc'});
      }

    });
  }

};

