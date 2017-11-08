const game = new Phaser.Game(800, 300, Phaser.AUTO, 'runnerGame', { 
  preload: preload, 
  create: create, 
  update: update,
  render: render
});


const Runner {};

Runner.PlayState = game => {
  
};

let platforms;
let player;
let cursors;
let crouch = false;

let distance = 0;
let distaceText;

let restartButton;
let saveScoresButton;

let obstacles;
let obsTimer;
let obsSpeed = 3000;
const obsStartDelay = Phaser.Timer.SECOND * 1;
const obsTimerAdjustStep = 1000;


function preload() {
  game.load.image('ground', 'assets/ground.png');
  game.load.image('player', 'assets/player.png');
  game.load.image('box', 'assets/box.png');
  game.load.spritesheet('restart', 'assets/restartbutton.png', 177, 51);
}

function create() {
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

function update() {
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

function createObstacle() {
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

function getCurrentObsDelay() {
  return obsTimer.delay - Math.floor((Math.pow((distance/obsTimerAdjustStep), 1.5)*5));
}

function render() {
  //game.debug.text("Time until event: " + game.time.events.duration.toFixed(0), 32, 32);
  //game.debug.text("Boxes: " + obstacles.length, 32, 64);
  //game.debug.text("Distance " + distance, 32, 32*3);

  //game.debug.body(player);
  //game.debug.body(obstacles);

}

function hitObstacle(b) {
  // pause game
  game.paused = true;
  restartButton.visible = true;

}

function restartGame() {
  console.log('restart');
}