'use strict';

const _ = require('lodash');

// reloadable handler for Connector#loadHandler
// enable/disable is used for reloading
class ConnectorHandler {

  constructor(connector) {
    this.connector = connector;
  }


  enable() {
    this.listenToConnectorEvent('readlineClient');
  }

  disable() {
    this.stopListenToConnectorEvents().removeListener('readlineClient', this.onReadlineClient);
  }

  get connectorEvents() {
    return [];
  }

  get connectorCommands() {
    return [];
  }

  // readlineServer -> onReadlineServer(line)
  listenToConnectorEvents() {
    let map = Object.create(null);
    for(let eventName of this.connectorEvents) {
      let methodName = 'on' + eventName[0].toUpperCase() + eventName.slice(1);
      if (!this[methodName]) {
        throw new Error("No method " + methodName);
      }

      let method = this[methodName].bind(this);
      map[eventName] = method;
      this.connector.on(eventName, method);
    }

    this._eventMap = map;
  }

  // on('command') for #back -> onCommandBack(args)
  listenToConnectorCommands() {
    let map = Object.create(null);
    for(let commandName of this.connectorCommands) {
      let methodName = 'onCommand' + commandName[0].toUpperCase() + commandName.slice(1);
      if (!this[methodName]) {
        throw new Error("No method " + methodName);
      }
      let method = this[methodName].bind(this);
      let onCommand = function(checkName, args) {
        if (checkName != commandName) {
          return;
        }
        method(args);
      };
      map[commandName] = onCommand;
      this.connector.on('command', onCommand);
    }

    this._commandMap = map;
  }

  stopListenToConnectorCommands() {
    if (!this._commandMap) return;

    for(let commandName in this._commandMap) {
      this.connector.removeListener(commandName, this._commandMap[commandName])
    }
    delete this._commandMap;
  }

  stopListenToConnectorEvents() {
    if (!this._eventMap) return;

    for(let eventName in this._eventMap) {
      this.connector.removeListener(eventName, this._eventMap[eventName])
    }
    delete this._eventMap;
  }

  enable() {
    this.listenToConnectorEvents();
    this.listenToConnectorCommands();
  }

  disable() {
    this.stopListenToConnectorEvents();
    this.stopListenToConnectorCommands();
  }

}

module.exports = ConnectorHandler;
