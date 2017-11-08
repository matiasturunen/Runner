class Preload extends Phaser.state {
  preload() {
    game.load.image('ground', '../assets/ground.png');
    game.load.image('player', '../assets/player.png');
    game.load.image('box', '../assets/box.png');
    game.load.spritesheet('restart', '../assets/restartbutton.png', 177, 51);
  }
}

export default Preload();
