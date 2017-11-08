/*
  Main game state
*/
class Main extends Phaser.state {

  constructor() {
    this.platforms;
    this.player;
    this.cursors;
    this.crouch = false;

    this.distance = 0;
    this.distaceText;

    this.restartButton;
    this.saveScoresButton;

    this.obstacles;
    this.obsTimer;
    this.obsSpeed = 3000;
    this.obsStartDelay = Phaser.Timer.SECOND * 1;
    this.obsTimerAdjustStep = 1000;
  }

  create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    // Create groups
    platforms = game.add.group();
    platforms.enableBody = true;

    obstacles = game.add.group();
    obstacles.enableBody = true;

    // Create ground
    let ground;
    for (let i = 0; i < game.world.width; i += 38) {
      ground = platforms.create(i, game.world.height - 64, 'ground');
      ground.body.immovable = true;
    }

    // Player
    player = game.add.sprite(32, game.world.height - 150, 'player');
    game.physics.arcade.enable(player);
    //  Player physics properties.
    player.body.gravity.y = 1000;
    player.body.collideWorldBounds = true;

    cursors = game.input.keyboard.createCursorKeys();

    obsTimer = game.time.events.loop(obsStartDelay, createObstacle);

    distaceText = game.add.text(16, 16, 'DISTANCE: 0', { fontSize: '32px', fill: '#00befd' });

    // Buttons
    restartButton = game.add.button(game.world.centerX, 100, 'restart', restartGame, this, 1, 0, 2);
    restartButton.visible = false;
  }

  update() {
    // Make player to collide with platforms
    const hitPlatform = game.physics.arcade.collide(player, platforms);

    // Collide with obstacles
    game.physics.arcade.overlap(player, obstacles, hitObstacle, null, this);

    //  Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown && player.body.touching.down && hitPlatform && !crouch)
    {
        player.body.velocity.y = -350;
    }
    else if (cursors.down.isDown)
    {
      //  crouch
      if (crouch == false && player.body.touching.down && hitPlatform) {
        player.scale.setTo(1, 0.5);
        player.y += 35
      }
      crouch = true;
    }
    else
    {
      if (crouch) {
        // Reset player size
        if (player.body.touching.down && hitPlatform) {
          player.y -= 35;
        }
        player.scale.setTo(1,1);
        crouch = false;
      }
    }

    // adjust obstacle spawn rate and speed
    if (distance % obsTimerAdjustStep == 0) {
      obsTimer.delay = getCurrentObsDelay();
      console.log('delay', obsTimer.delay);
    }

    // add distance
    distance += 1;
    distaceText.text = 'DISTANCE: ' + distance;

  }

  createObstacle() {
    let posY = game.world.height - 104;
    if (Math.round(Math.random()) < 0.5) {
      // Random jump and crouch obstacles
      posY -= 40;
    }
    const box = obstacles.create(game.world.width - 40, posY, 'box');
    box.body.collideWorldBounds = false;
    box.checkWorldBounds = true;
    box.events.onOutOfBounds.add(b => b.destroy(), this); // destroy when outside screen
    box.body.moveTo(obsSpeed, 900, 180);

  }

  getCurrentObsDelay() {
    return obsTimer.delay - Math.floor((Math.pow((distance/obsTimerAdjustStep), 1.5)*5));
  }

  render() {
    //game.debug.text("Time until event: " + game.time.events.duration.toFixed(0), 32, 32);
    //game.debug.text("Boxes: " + obstacles.length, 32, 64);
    //game.debug.text("Distance " + distance, 32, 32*3);

    //game.debug.body(player);
    //game.debug.body(obstacles);

  }

  hitObstacle(b) {
    // pause game
    game.paused = true;
    restartButton.visible = true;

  }

  restartGame() {
    console.log('restart');
  }
}

export default Main();