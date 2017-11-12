import Preload from './states/Preload';
import Main from './states/Main';
import GameOver from './states/GameOver';
import Titlescreen from './states/Titlescreen';

/*
  Game start stuff
*/
class Game extends Phaser.Game {
  constructor() {
    super(800, 300, Phaser.AUTO, 'runnerGame');
    
    // Add states
    this.state.add('Preload', Preload, false);
    this.state.add('Main', Main, false);
    this.state.add('GameOver', GameOver, false);
    this.state.add('Titlescreen', Titlescreen, false);

    this.state.start('Preload');
  }
}

new Game();
