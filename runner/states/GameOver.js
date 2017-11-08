class GameOver extends Phaser.State {
  constructor() {
    super();

    this.saveScoresButton;
    this.newgameButton;
    this.distanceText;
  }

  init(distance) {
    this.distance = distance;
  }

  create() {
    this.saveScoresButton = this.game.add.button(this.game.world.centerX - 200, this.game.world.centerY, 'submit', this.submitScore, this, 1, 2, 0);
    this.newgameButton = this.game.add.button(this.game.world.centerX - 0, this.game.world.centerY, 'newgame', this.startNewGame, this, 0, 1, 2);
    this.distanceText = this.game.add.text(16, 16, 'DISTANCE: ' + this.distance, { fontSize: '32px', fill: '#4bbafa' });
  }

  submitScore() {
    console.log('submit score');
  }

  startNewGame() {
    console.log('new game');
    this.game.state.start('Main')
  }
}

export default GameOver;
