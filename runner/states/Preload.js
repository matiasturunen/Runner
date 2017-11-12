class Preload extends Phaser.State {
  preload() {
    // Load all needed assets
    const assetsFolder = 'runner/assets/';
    this.game.load.image('ground', assetsFolder + 'ground.png');
    this.game.load.image('player', assetsFolder + 'player.png');
    this.game.load.image('box', assetsFolder + 'box.png');
    this.game.load.spritesheet('restart', assetsFolder + 'restartbutton.png', 177, 51);
    this.game.load.spritesheet('submit', assetsFolder + 'submitbutton.png', 164, 51);
    this.game.load.spritesheet('newgame', assetsFolder + 'newgamebutton.png', 206, 51);
  }

  create() {
    // Switch to next state
    this.game.state.start('Titlescreen');
  }
}

export default Preload;
