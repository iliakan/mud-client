'use strict';

class Character {

  constructor(connector, name, options) {
    connector.character = this;
    this.options = options || {};

    this.water = this.options.water || 'gourd';
    this.store = this.options.store || 'backpack';
    this.food = this.options.food || 'wafer';
    this.rug = this.options.rug || 'rug';

    this.name = name;

    this.connector = connector;
    this.stats = {};

    connector.on('prompt', prompt => {
      this.updateStats(prompt);
    });

    this.connector.on('readlineServer', line => this.onReadlineServer(line));
  }

  onReadlineServer(line) {
    line = line.replace(/^<.*?>\s+/, '');
    if (line.startsWith('You go to sleep')) {
      this.state = this.SLEEPING;
    }
    if (line == "You rest.") {
      this.state = this.RESTING;
    }
    if (line.startsWith('You wake and stand') || line == "You stand up.") {
      this.state = this.STANDING;
    }

    if (this.stats && this.stats.battle) {
      if (line.toLowerCase() == this.stats.battle.target.toLowerCase() + ' is dead!!') {
        this.connector.emit("battleDead");
      }
    }

    if (line == 'Your body undergoes a rapid transformation and you revert to your true form.') {
      this.formType = null;
    }

  }

  updateStats(stats) {
    // console.log(stats);
    this.stats = stats;
    if (stats.battle && this.state != this.BATTLE) {
      this.state = this.BATTLE;
      // console.log("BATTLE START");
      this.connector.emit('battleStart', stats.battle);
    }

    if (!stats.battle && this.state == this.BATTLE) {
      this.state = this.STANDING;

      // console.log("BATTLE FINISH");
      this.connector.emit('battleFinish');
    }

    this.connector.emit('stats', stats);
  }

  // can be improved to track current character state to wake up/sleep
  eat() {
    let connector = this.connector;

    this.wake();
    this.connector.write(`get ${this.food} ${this.store}`);
    this.connector.write(`eat ${this.food}`);


    // if too full in 5 seconds then put back
    connector.on('readlineServer', checkFull);

    setTimeout(() => {
      connector.removeListener('readlineServer', checkFull)
    }, 15000);

    let self = this;
    function checkFull(line) {
      if (line.includes('You are too full to eat more.')) {
        connector.removeListener('readlineServer', checkFull);
        connector.write(`put ${self.food} ${self.store}`);
      }
    }

  }

  sleep() {
    this.connector.write('drop ' + this.rug);
    this.connector.write('sleep ' + this.rug);
    this.connector.write('sleep');
  }

  wake() {
    this.connector.write('wake');
    this.connector.write('get ' + this.rug);
  }

  drink() {

    this.wake();
    this.connector.write(`drink ${this.water}`);

    // if empty in 5 seconds then get new
    this.connector.on('readlineServer', checkEmpty);

    setTimeout(() => {
      this.connector.removeListener('readlineServer', checkEmpty)
    }, 15000);

    let connector = this.connector;
    let self = this;

    function checkEmpty(line) {
      if (line.includes('It is already empty.')) {
        connector.removeListener('readlineServer', checkEmpty);
        connector.write(`drop ${self.water}`);
        connector.write(`sac ${self.water}`);
        connector.write(`get ${self.water} ${self.store}`);
        connector.write(`drink ${self.water}`);
      }
    }

  }

  // offense || defense
  morph(formType) {
    if (!this.options.morph) return;
    let form = this.options.morph[formType];
    if (!form) {
      this.connector.showError("No form: " + formType);
      return;
    }
    this.connector.write('revert');
    this.connector.write('shapeshift ' + form);
    this.formType = formType;
  }

}
Character.prototype.STANDING = 1;
Character.prototype.RESTING = 2;
Character.prototype.SLEEPING = 3;
Character.prototype.BATTLE = 4;

module.exports = Character;
