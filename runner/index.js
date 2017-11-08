import Preload from 'states/Preload';
import Main from 'states/Main';

/*
  Game start stuff
*/
class Game extends Phaser.Game {
  constructor() {
    super(800, 300, Phaser.AUTO, 'runnerGame');
    
    this.state.add('Preload', Preload, false);
    this.state.add('Main', Main, false);
  }
}

new Game();
