let cW = 600;
let cH = 300;

const LOADING = 0;
const MAIN_MENU = 1;
const PLAY = 2;
const LEADERBOARD = 3;
const VICTORY = 4;
const LEVEL1C = 5;
const PLAY2 = 6;
let currentState = LOADING;

var brick;
var brickSprites;
var spikes;
var scoreS;
var player;
var exit;
var exit2;
var level1BG;
var introVid;
var doorD;
var playerD;
var coinSprite;
var coin2;
var coin3;
var coin4;
var coinD;
var enemyD;
var level1Com = false;

function preload() {
  playerImage = loadImage("img/SoccerBall.png");
  backgroundIMG = loadImage('img/full_background.png');
  brickData = loadJSON('data/brick.json');
  brickImage = loadImage("img/brick1.png");
  spikeImage = loadImage("img/spike.png");
  exitImage = loadImage("img/castledoors.png");
  enemySprite = loadImage("img/spike_monster_A.png");
  level2BG = loadImage("img/background01.png");
  deathSound = loadSound("snd/death.wav");
  doorSound = loadSound("snd/round_end.wav");
  level1BG = loadSound("snd/level1_bg.mp3");
  level2BGSound = loadSound("snd/level2_bg.ogg");
  coinSFX = loadSound("snd/coin_sf.flac");

  animCoin = loadAnimation("img/goldCoin/goldCoin1.png", "img/goldCoin/goldCoin2.png", "img/goldCoin/goldCoin3.png", "img/goldCoin/goldCoin4.png", "img/goldCoin/goldCoin5.png", "img/goldCoin/goldCoin6.png", "img/goldCoin/goldCoin7.png", "img/goldCoin/goldCoin8.png", "img/goldCoin/goldCoin9.png");

}
//Buttons

let mainMenuBTTN;
let mainMenuBTTNPressed = false;


//to see full map = 1200 , 600

function setup() {
  createCanvas(cW, cH)

  brickSprites = new Group()
  spikes = new Group()
  exitDoor = new Group()
  enemySprites = new Group()
  coinGroup = new Group()

  introVid = createVideo('videos/video1.mp4');
  introVid.hide();


  mainMenuBTTN = createButton('PLAY GAME');
  mainMenuBTTN.position(225, 105);
  mainMenuBTTN.hide();

  score = brickData.scores.scoreSet;
  brick = brickData.brick;
  spikeD = brickData.spike;
  doorD = brickData.door;
  playerD = brickData.player;
  enemyD = brickData.enemy;
  coinD = brickData.coin;


  initLevel1();


}


function draw() {

  switch (currentState) {
    case LOADING:
      drawLoadingScreen();
      break;
    case MAIN_MENU:
      drawMainMenuScreen();
      break;
    case PLAY:
      drawlevel1()
      break;
    case LEVEL1C:
      drawLevel1C()
      break;
    case PLAY2:
      drawlevel2()
      break;
    case VICTORY:
      drawVictoryScreen()
      break;
    case LEADERBOARD:
      drawLeaderboardScreen();
      break;
  }


}


function drawLoadingScreen() {
  background('black');
  fill('white');
  text('Loading...', 200, 200);
  if (frameCount == 140) {
    currentState = MAIN_MENU;

  }

}

function drawMainMenuScreen() {

  background('black');
  fill('green');
  rect(175, 0, 200, 300);
  fill('white');
  text('Ball Game', 240, 50);
  image(introVid, 200, 150, 150, 150);

  introVid.play();

  //loop intro video 
  if (introVid.time() > 5.5) {
    introVid.time(0);
  }

  mainMenuBTTN.show();

  mainMenuBTTN.mousePressed(function () {
    mainMenuBTTN.hide();
    currentState = PLAY;
    level1BG.play();

  });

}

function drawLevel1C() {
  // level complete
  camera.position.x = width / 2;
  camera.position.y = height / 2;
  background('black');
  fill('lightblue');
  rect(175, 0, 200, 300);
  //green rectangle in middle
  fill('lightgreen');
  rect(225, 220, 100, 50);
  //text inside green rectangle

  fill('white');
  text('Click to progress.', 230, 250);

  textStyle(BOLD);
  fill('white');
  text('Level Complete.', 230, 50);

}

function drawLeaderboardScreen() {

  background('black');
  fill('lightblue');
  rect(175, 0, 200, 300);
  fill('white');
  text('Leaderboard', 230, 50);
  camera.position.x = width / 2;
  camera.position.y = height / 2;


  for (let i = 0; i < score.length; i++) {
    fill('white');
    text(score[i] + ' Score', 200, 100 + i * 20);

  }

  //rect with text
  fill('lightgreen');
  rect(225, 220, 100, 50);
  fill('white');
  text('Main Menu.', 245, 250);

}

function drawVictoryScreen() {
  camera.position.x = width / 2;
  camera.position.y = height / 2;
  background('black');
  fill('lightblue');
  rect(175, 0, 200, 300);
  //green rectangle in middle
  fill('lightgreen');
  rect(225, 220, 100, 50);
  // text inside green rectangle
  fill('white');
  text('Main Menu.', 245, 250);
  textStyle(BOLD);
  fill('white');
  text('Victory!. Game Complete.', 200, 50);

}

function initLevel1() {
  // init level 1

  player = createSprite(100, 100, 40, 40);
  player.scale = playerD.Scale;
  player.addImage(playerImage);
  player.velocity.y = 0;


  //////////////////////Level1////////////////////////

  //Outline of level1
  for (var i = 0; i < width; i++) {
    var groundSprite = createSprite(i * 32, 15, brick.Width, brick.Height);
    groundSprite.addImage(brickImage);
    brickSprites.add(groundSprite);
  }

  for (var i = 0; i < height; i++) {
    var wallL = createSprite(10, i * 32, 50, 50);
    wallL.addImage(brickImage);
    brickSprites.add(wallL);
  }

  for (var i = 0; i < width; i++) {
    var topWall = createSprite(i * 32, 285, brick.Width, brick.Height);
    topWall.addImage(brickImage);
    brickSprites.add(topWall);
  }

  for (var i = 0; i < height; i++) {
    var wallR = createSprite(1200, i * 32, 50, 50);
    wallR.addImage(brickImage);
    brickSprites.add(wallR);
  }

  //Vertical walls

  for (var i = 0; i < 2; i++) {
    var obsVWall1 = createSprite(400, 225 + (i * 32), brick.Width, brick.Height);
    obsVWall1.addImage(brickImage);
    brickSprites.add(obsVWall1);
  }

  for (var i = 0; i < 2; i++) {
    var obsVWall2 = createSprite(500, 225 + (i * 32), brick.Width, brick.Height);
    obsVWall2.addImage(brickImage);
    brickSprites.add(obsVWall2);
  }

  //Horizontal walls

  for (var i = 0; i < 9; i++) {
    var obsHWall = createSprite(i * 32, 150, brick.Width, brick.Height);
    obsHWall.addImage(brickImage);
    brickSprites.add(obsHWall);
  }

  for (var i = 0; i < 4; i++) {
    var obsHWall2 = createSprite(600 + (i * 32), 160, brick.Width, brick.Height);
    obsHWall2.addImage(brickImage);
    brickSprites.add(obsHWall2);
  }

  for (var i = 0; i < 4; i++) {
    var obsL2HWall3 = createSprite(800 + (i * 32), 160, brick.Width, brick.Height);
    obsL2HWall3.addImage(brickImage);
    brickSprites.add(obsL2HWall3);
  }

  for (var i = 0; i < 4; i++) {
    var obsHWall4 = createSprite(1100 + (i * 32), 160, brick.Width, brick.Height);
    obsHWall4.addImage(brickImage);
    brickSprites.add(obsHWall4);
  }

  //Spike creation

  for (var i = 0; i < 9; i++) {
    var spike1 = createSprite(92 + (i * 120), 240, doorD.Width, doorD.Height);
    spike1.addImage(spikeImage);
    spike1.scale = spikeD.Scale[1];
    spikes.add(spike1);
  }

  //Door creation

  exit = createSprite(1150, -190 + (i * 32), spikeD.Width, spikeD.Height);
  exit.addImage(exitImage);
  //exit.scale = 0.3;
  exitDoor.add(exit);

  //Coin Both Levels
  let label = "coin";

  let coinL1 = coinD.Location1
  let coinL2 = coinD.Location2
  let coinL3 = coinD.Location3
  let coinL4 = coinD.Location4

  coinSprite = createSprite(coinL1[0], coinL1[1], coinL1[2], coinL1[3]);
  coin2 = createSprite(coinL2[0], coinL2[1], coinL2[2], coinL2[3]);
  coin3 = createSprite(coinL3[0], coinL3[1], coinL3[2], coinL3[3]);
  coin4 = createSprite(coinL4[0], coinL4[1], coinL4[2], coinL4[3]);
  coinSprite.scale = 1.5;
  coin2.scale = 1.5;
  coin3.scale = 1.5;
  coin4.scale = 1.5;
  coin2.addAnimation(label, animCoin);
  coin3.addAnimation(label, animCoin);
  coin4.addAnimation(label, animCoin);
  coinSprite.addAnimation(label, animCoin);
  coinGroup.add(coin2);
  coinGroup.add(coin3);
  coinGroup.add(coin4);
  coinGroup.add(coinSprite);


  /////////////////////////////// LEVEL 2 //////////////////////////////////////


  //  Level 2 Outline

  for (var i = 0; i < width; i++) {
    var btWallL2 = createSprite(i * 32, 585, brick.Width, brick.Height);
    btWallL2.addImage(brickImage);
    brickSprites.add(btWallL2);
  }
  // Vertical obs

  for (var i = 0; i < 4; i++) {
    var obsL2VWall1 = createSprite(450, 455 + (i * 32), brick.Width, brick.Height);
    obsL2VWall1.addImage(brickImage);
    brickSprites.add(obsL2VWall1);
  }
  for (var i = 0; i < 5; i++) {
    var obsL2VWall2 = createSprite(250, 300 + (i * 32), brick.Width, brick.Height);
    obsL2VWall2.addImage(brickImage);
    brickSprites.add(obsL2VWall2);
  }

  //Horizontal obs

  for (var i = 0; i < 7; i++) {
    var obsL2HWall3 = createSprite(160 + (i * 32), 428, brick.Width, brick.Height);
    obsL2HWall3.addImage(brickImage);
    brickSprites.add(obsL2HWall3);
  }

  for (var i = 0; i < 2; i++) {
    var obsL2HWall4 = createSprite(386 + (i * 32), 528, brick.Width, brick.Height);
    obsL2HWall4.addImage(brickImage);
    brickSprites.add(obsL2HWall4);
  }

  for (var i = 0; i < 8; i++) {
    var obsL2HWall5 = createSprite(686 + (i * 32), 490, brick.Width, brick.Height);
    obsL2HWall5.addImage(brickImage);
    brickSprites.add(obsL2HWall5);
  }

  for (var i = 0; i < 2; i++) {
    var obsL2HWall6 = createSprite(20 + (i * 32), 528, brick.Width, brick.Height);
    obsL2HWall6.addImage(brickImage);
    brickSprites.add(obsL2HWall6);
  }

  //Spikes

  var spike1LV2 = createSprite(450, 415, spikeD.Width, spikeD.Height);
  spike1LV2.addImage(spikeImage);
  spike1LV2.scale = spikeD.Scale[0];
  spikes.add(spike1LV2);

  var spike2LV2 = createSprite(280, 390, spikeD.Width, spikeD.Height);
  spike2LV2.addImage(spikeImage);
  spike2LV2.scale = spikeD.Scale[0];
  spikes.add(spike2LV2);

  var spike3LV2 = createSprite(220, 390, spikeD.Width, spikeD.Height);
  spike3LV2.addImage(spikeImage);
  spike3LV2.scale = spikeD.Scale[0];
  spikes.add(spike2LV2);

  var spike4LV2 = createSprite(800, 545, spikeD.Width, spikeD.Height);
  spike4LV2.addImage(spikeImage);
  spike4LV2.scale = spikeD.Scale[0];
  spikes.add(spike4LV2);


  //Exit Door

  exit2 = createSprite(1150, 450 + (i * 32), doorD.Width, doorD.Height);
  exit2.addImage(exitImage);
  exitDoor.add(exit2);

  //Enemy
  let ESp = enemyD.Sprite;
  enemy = createSprite(ESp[0], ESp[1], ESp[2], ESp[3]);
  enemy.addImage(enemySprite);
  enemy.scale = enemyD.Scale;
  enemySprites.add(enemy);
  enemy.setSpeed(enemyD.Speed[0], enemyD.Speed[1]);

}

function drawlevel1() {
  mainMenuBTTN.hide();
  background(backgroundIMG);
  initPlayer();


}

function initPlayer() {

  coinSprite.displace(player, function () {
    coinSprite.remove();
    coinSFX.play();
  });

  coin2.displace(player, function () {
    coin2.remove();
    coinSFX.play();
  });
  coin3.displace(player, function () {
    coin3.remove();
    coinSFX.play();
  });

  coin4.displace(player, function () {
    coin4.remove();
    coinSFX.play();
  });

  //enemy movement  
  if (enemy.position.x > 900) {
    enemy.setSpeed(1, 180);
  } else if (enemy.position.x < 700) {
    enemy.setSpeed(1, 360);
  }

  player.addSpeed(playerD.Speed[0], playerD.Speed[1]);
  //when player collide with brickSprites player stops
  player.collide(brickSprites, function () {
    player.velocity.y = 0;
    player.velocity.x = 0;

  })

  player.collide(enemySprites, function () {
    // to leaderboard state
    currentState = LEADERBOARD;
    player.velocity.y = 0;
    player.position.x = 100;
    player.position.y = 100;
    level1Com = false;
    deathSound.play();
  })

  //Collide for spike
  player.collide(spikes, function () {
    // to leaderboard state
    currentState = LEADERBOARD;
    player.velocity.y = 0;
    player.position.x = 100;
    player.position.y = 100;
    level1Com = false;
    deathSound.play();


  })

  //Collide for exit
  player.collide(exit, function () {
    // to LEVEL2 state
    currentState = LEVEL1C;
    player.velocity.y = 0;
    player.position.x = 100;
    player.position.y = 500;
    doorSound.play();

  })

  //collide for exit2
  player.collide(exit2, function () {
    // to LEVEL2 state
    currentState = VICTORY;
    player.velocity.y = 0;
    player.position.x = 100;
    player.position.y = 100;
    level1Com = false;
    doorSound.play();

  })

  // Left right input handling
  if (keyDown(RIGHT_ARROW)) {
    player.position.x = player.position.x + 5
    player.rotation += 20;
  } if (keyDown(LEFT_ARROW)) {
    player.position.x = player.position.x - 5
    player.rotation -= 20;
  }

  //Camera setup for each level
  if (level1Com == true) {
    camera.position.y = 440;
  }

  if (level1Com == true && player.position.y > 400) {
    camera.position.x = player.position.x
  } else if (player.position.x < 400) {
    camera.position.x = 300
  }

  if (level1Com == true && camera.position.x > 900) {
    camera.position.x = 900;

  }
  //Further camera setup

  if (player.position.x > 400) {
    camera.position.x = player.position.x
  } else if (player.position.x < 400) {
    camera.position.x = 300
  }

  // when camera exceeds canvas stop camera
  if (camera.position.x > 900) {
    camera.position.x = 900;
  }
  drawSprites()
}

function keyPressed() {
  if (keyCode === UP_ARROW && player.velocity.y < 1) {
    player.velocity.y = -5;
  }
}

function drawlevel2() {
  background(level2BG);
  initPlayer();
}

function mouseClicked() {
  if (currentState == LEADERBOARD) {
    level1BG.stop();
    level2BGSound.stop();
    currentState = MAIN_MENU;
  } else if (currentState == LEVEL1C) {
    level1Com = true;
    currentState = PLAY2;
    level1BG.stop();
    level2BGSound.play();
  } else if (currentState == VICTORY) {
    currentState = MAIN_MENU;
    level2BGSound.stop();
  }

}