(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

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
    this.game.state.start('Main');
  }
}

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
    this.game.paused = false;
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
        this.player.y += 35;
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
    this.game.state.start('Main');
  }
}

class Game extends Phaser.Game {
  constructor() {
    super(800, 300, Phaser.AUTO, 'runnerGame');
    
    // Add states
    this.state.add('Preload', Preload, false);
    this.state.add('Main', Main, false);
    this.state.add('GameOver', GameOver, false);

    this.state.start('Preload');
  }
}

new Game();

})));
