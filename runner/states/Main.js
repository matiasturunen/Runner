/*
  Main game state
*/
class Main extends Phaser.State {

  constructor() {
    super();

    this.platforms;
    this.player;
    this.cursors;
    this.crouch = false;

    this.distance = 0;
    this.distaceText;

    this.obstacles;
    this.obsTimer;
    this.obsSpeed = 3000;
    this.obsStartDelay = Phaser.Timer.SECOND * 1;
    this.obsTimerAdjustStep = 1000;

    this.paused = false; // custom pause state
  }

  create() {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    // Create groups
    this.platforms = this.game.add.group();
    this.platforms.enableBody = true;

    this.obstacles = this.game.add.group();
    this.obstacles.enableBody = true;

    // Create ground
    let ground;
    for (let i = 0; i < this.game.world.width; i += 38) {
      ground = this.platforms.create(i, this.game.world.height - 64, 'ground');
      ground.body.immovable = true;
    }

    // Player
    this.player = this.game.add.sprite(32, this.game.world.height - 150, 'player');
    this.game.physics.arcade.enable(this.player);
    //  Player physics properties.
    this.player.body.gravity.y = 1000;
    this.player.body.collideWorldBounds = true;

    this.cursors = this.game.input.keyboard.createCursorKeys();

    this.obsTimer = this.game.time.events.loop(this.obsStartDelay, this.createObstacle, this);

    this.distaceText = this.game.add.text(16, 16, 'DISTANCE: 0', { fontSize: '32px', fill: '#4bbafa' });

    // Reset some variables
    this.distance = 0;
    this.crouch = false;
    this.paused = false;
  }

  update() {
    // Make player to collide with platforms
    const hitPlatform = this.game.physics.arcade.collide(this.player, this.platforms);

    // Collide with obstacles
    this.game.physics.arcade.overlap(this.player, this.obstacles, this.hitObstacle, null, this);

    //  Allow the player to jump if they are touching the ground.
    if (this.cursors.up.isDown && this.player.body.touching.down && hitPlatform && !this.crouch)
    {
        this.player.body.velocity.y = -350;
    }
    else if (this.cursors.down.isDown)
    {
      //  crouch
      if (this.crouch == false && this.player.body.touching.down && hitPlatform) {
        this.player.scale.setTo(1, 0.5);
        this.player.y += 35
      }
      this.crouch = true;
    }
    else
    {
      if (this.crouch) {
        // Reset player size
        if (this.player.body.touching.down && hitPlatform) {
          this.player.y -= 35;
        }
        this.player.scale.setTo(1,1);
        this.crouch = false;
      }
    }

    // adjust obstacle spawn rate and speed
    if (this.distance % this.obsTimerAdjustStep == 0) {
      this.obsTimer.delay = this.getCurrentObsDelay();
      console.log('delay', this.obsTimer.delay);
    }

    // add distance
    if (!this.paused) {
      this.distance += 1;
      this.distaceText.text = 'DISTANCE: ' + this.distance;
    }

  }

  createObstacle() {
    let posY = this.game.world.height - 104;
    if (Math.round(Math.random()) < 0.5) {
      // Random jump and crouch obstacles
      posY -= 40;
    }
    const box = this.obstacles.create(this.game.world.width - 40, posY, 'box');
    box.body.collideWorldBounds = false;
    box.checkWorldBounds = true;
    box.events.onOutOfBounds.add(b => b.destroy(), this); // destroy when outside screen
    box.body.moveTo(this.obsSpeed, 900, 180);

  }

  getCurrentObsDelay() {
    return this.obsTimer.delay - Math.floor((Math.pow((this.distance/this.obsTimerAdjustStep), 1.5)*5));
  }

  render() {
  }

  hitObstacle(b) {
    // pause game
    //this.game.paused = true;
    this.paused = true;

    // stop creating new obstacles for more than a second
    this.obsTimer.tick = this.obsTimer.tick + Phaser.Timer.SECOND * 10;
    // stop movement of current obstacles
    //this.obstacles.callAll('body.stopMovement', null, true); // does not work

    const currentDistance = this.distance;

    // move to game over state after delay
    const stateDelay = this.game.time.events.add(Phaser.Timer.SECOND, function() {
      console.log('Game over state starting');
      this.game.state.start('GameOver', true, false, currentDistance);
    }, this);
  }
}

export default Main;