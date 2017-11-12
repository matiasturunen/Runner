class Titlescreen extends Phaser.State {
  constructor() {
    super();

    this.newgameButton;
    this.titleText
  }

  create() {
    this.newgameButton = this.game.add.button(300, this.game.world.centerY, 'newgame', this.startNewGame, this, 0, 1, 2);
    this.titleText = this.game.add.text(260, 16, 'RUNNER', { fontSize: '64px', fill: '#4bbafa' });
  }

  submitScore() {
    console.log('submit score');

      $.ajax('ajax.php', {
        method: 'POST',
        data: {
          m: 'score',
          user: 1,
          score: this.distance
        },
        success: res => {
          //$('#ajaxError').html(res);
          updateToplist(); // Global function
        }
      });
  }

  startNewGame() {
    console.log('new game');
    this.game.state.start('Main')
  }
}

export default Titlescreen;
