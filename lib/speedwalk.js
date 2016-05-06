'use strict';

const ConnectorHandler = require('./connectorHandler');

// speedwalk 13wn4w4s5wdd
class SpeedWalk extends ConnectorHandler {

  get connectorEvents() {
    return ['readlineClient'];
  }

  onReadlineClient(line, result) {
    if (line.match(/^[0-9neswud]+$/)) {
      result.handled = true;
      let walks = this.constructor.split(line);
      for (let i = 0; i < walks.length; i++) {
        this.connector.write(walks[i], true);
      }
    }
  }

  static split(speedwalk) {
    let items = [];
    let walks = speedwalk.match(/\d*[neswud]/g);

    if (!walks) return [];

    for (let i = 0; i < walks.length; i++) {
      let walk = walks[i]; // 13w
      let direction = walk[walk.length - 1];
      let count = parseInt(walk) || 1;
      for (let j = 0; j < count; j++) {
        items.push(direction);
      }
    }

    return items;
  }

  static splitMany(walk) {
    walk = walk.split(';');
    let result = [];
    for (let i = 0; i < walk.length; i++) {
      let line = walk[i];
      if (line.match(/^[0-9neswud]+$/)) {
        result = result.concat(SpeedWalk.split(line));
      } else {
        result.push(line)
      }

    }

    return result;

  }

}


module.exports = SpeedWalk;
