class GameOver extends Phaser.State {
  constructor() {
    super();

    this.saveScoresButton;
    this.newgameButton;
    this.distanceText;
    this.scoreSubmitted;
  }

  init(distance) {
    this.distance = distance;
  }

  create() {
    this.saveScoresButton = this.game.add.button(this.game.world.centerX - 200, this.game.world.centerY, 'submit', this.submitScore, this, 1, 2, 0);
    this.newgameButton = this.game.add.button(this.game.world.centerX - 0, this.game.world.centerY, 'newgame', this.startNewGame, this, 0, 1, 2);
    this.distanceText = this.game.add.text(16, 16, 'DISTANCE: ' + this.distance, { fontSize: '32px', fill: '#4bbafa' });
    this.scoreSubmitted = false;
  }

  submitScore() {
    if (!this.scoreSubmitted) {
      if (typeof Cookies.get('userloggedin') === 'undefined') {
        alert('Log in to save scores!');
        console.log('no-cookie');
      } else {


      console.log('submit score');
        $.ajax('ajax.php', {
          method: 'POST',
          data: {
            m: 'score',
            score: this.distance
          },
          success: res => {
            //$('#ajaxError').html(res);
            updateToplist(); // Global function
            this.scoreSubmitted = true;
          }
        });
      }
    }
  }

  startNewGame() {
    console.log('new game');
    this.game.state.start('Main')
  }
}

export default GameOver;
