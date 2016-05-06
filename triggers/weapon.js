'use strict';

const ConnectorHandler = require('../lib/connectorHandler');

module.exports = class extends ConnectorHandler {


  get connectorEvents() {
    return ['readlineServer'];
  }


  get connectorCommands() {
    return ['wield'];
  }

  onCommandWield(args) {
    this.wieldType(args[0]);
  }

  remove(weapon) {
    this.connector.write(`remove "${weapon}"`);
  }

  wield(weapon) {
    this.connector.write(`wear "${weapon}"`);
  }

  removeAll() {
    let weapons = this.connector.character.options.weapons;

    if (this.connector.character.weapons) {
      this.connector.character.weapons.forEach(w => this.remove(w));
    } else {
      if (weapons.phys) {
        weapons.phys.forEach(w => this.remove(w));
      }
      if (weapons.fire) {
        weapons.fire.forEach(w => this.remove(w));
      }
      if (weapons.misc) {
        weapons.misc.forEach(w => this.remove(w));
      }
    }
  }

  wieldType(type) {
    let weapons = this.connector.character.options.weapons;
    if (!weapons) return;

    if (!weapons[type]) {
      this.connector.showError("No type " + type);
      return;
    }

    this.removeAll();

    weapons[type].forEach(w => this.wield(w));

    this.connector.character.weapons = weapons[type];
  }

  onReadlineServer(line) {

    let weapons = this.connector.character.options.weapons;
    if (!weapons) return;


    if (line.match(/^\w+ tells the group, 'Fire.'/) && weapons.fire) {
      this.wieldType('fire');
    }

    if (line.match(/^\w+ tells the group, 'Phys.'/) && weapons.phys) {
      this.wieldType('phys');
    }

    if (line.match(/^\w+ tells the group, 'Misc.'/) && weapons.misc) {
      this.wieldType('misc');
    }

  }


};
