const SPLASH = 1, GAME = 2
let currentScreen = SPLASH
let img, img2, img3, myFont;
let screenFlash = true
let timer = 60
let jumps = 0
let jumps2 = 0
let playerYSpeed = 1
let player2YSpeed = 1
let rightSpeed = false, leftSpeed = false
let right2Speed = false, left2Speed = false
let playerX = 20, playerY = 450, playerW = 20, playerH = 20;
let player2X = 760, player2Y = 450, player2W = 20, player2H = 20;
let groundX = 0, groundY = 515, groundW = 800, groundH = 85;
let portal1X = 250, portal1Y = 325, portal1W = 20, portal1H = 30;
let portal2X = 700, portal2Y = 225, portal2W = 20, portal2H = 30;

function preload() {
  img = loadImage('IMAGES/TAG_SPLASH11.png');
  img2 = loadImage('IMAGES/TAG_SPLASH22.png');
  img3 = loadImage('IMAGES/TAG.png');
  myFont = loadFont('SHO-CARD.TTF');
}

function setup() {
  createCanvas(800, 600);
  frameRate(60);
  noStroke();
}

function splashScreen() {
  background(0);
  if (frameCount % 15 === 0) {
    screenFlash = !screenFlash
  } if (screenFlash) {
    image(img, 0, 0);
  } else {
    image(img2, 0, 0)
  }
}
function gameScreen() {
  image(img3, 0, 0);
  //timer
  if (frameCount % 60 === 0) {
    timer--;
    if (timer === 0) {
      noLoop();
    }
  }
  fill(255);
  textSize(45);
  text(" TIME LEFT:" + timer, 225, 60);
  textFont(myFont)
  //ground
  noFill();
  rect(groundX, groundY, groundW, groundH);
  //portal1
  fill(0)
  ellipse(portal1X, portal1Y, portal1W, portal1H)
  //portal2
  fill(0)
  ellipse(portal2X, portal2Y, portal2W, portal2H)
  //player1
  fill(250, 75, 75);
  rect(playerX, playerY, playerW, playerH, 0, 0, 0, 0);
  //player2
  fill(0, 75, 75);
  rect(player2X, player2Y, player2W, player2H, 0, 0, 0, 0);
  //player1control
  if (rightSpeed === true) {
    playerX += 5
  }
  if (leftSpeed === true) {
    playerX -= 5
  }
  playerY += playerYSpeed;
  playerYSpeed += 0.2;
  //player2control
  if (right2Speed === true) {
    player2X += 5
  }
  if (left2Speed === true) {
    player2X -= 5
  }
  player2Y += player2YSpeed;
  player2YSpeed += 0.2;
  //player1gravity
  if (areColliding(playerX, playerY, playerW, playerH, groundX, groundY, groundW, groundH)) {
    playerY = groundY - playerH;
    playerYSpeed = 0;
    jumps = 0
  }
  //player2gravity
  if (areColliding(player2X, player2Y, player2W, player2H, groundX, groundY, groundW, groundH)) {
    player2Y = groundY - player2H;
    player2YSpeed = 0;
    jumps2 = 0
  }
  //portal1collisionplayer1
  if (areColliding(playerX, playerY, playerH, playerW, portal1X, portal1Y, portal1W, portal1H)) {
    playerX === portal1X, playerY === portal1Y;
    playerX = portal2X, playerY = portal2Y;
  }
  //portal1collisionplayer2
  if (areColliding(player2X, player2Y, player2H, player2W, portal1X, portal1Y, portal1W, portal1H)) {
    player2X === portal1X, player2Y === portal1Y;
    player2X = portal2X, player2Y = portal2Y;
  }
  //boundary
  if (playerX < 0) {
    playerX = playerX + 5;
  }
  if (playerX > 780) {
    playerX = playerX - 5;
  }
  if (player2X < 0) {
    player2X = player2X + 5;
  }
  if (player2X > 780) {
    player2X = player2X - 5;
  }
}

function areColliding(x1, y1, w1, h1, x2, y2, w2, h2) {
  return x1 < x2 + w2 && x2 < x1 + w1
    && y1 < y2 + h2 && y2 < y1 + h1;
}

function keyPressed() {
  //player1keys
  if (jumps < 2) {
    if (keyCode === 87) {
      playerYSpeed = -6;
      jumps++
    }
  }
  if (keyCode === 68) {
    rightSpeed = true
  }
  if (keyCode === 65) {
    leftSpeed = true
  }
  //player2keys
  if (jumps2 < 2) {
    if (keyCode === UP_ARROW) {
      player2YSpeed = -6;
      jumps2++
    }
  }
  if (keyCode === RIGHT_ARROW) {
    right2Speed = true
  }
  if (keyCode === LEFT_ARROW) {
    left2Speed = true
  }
  //spacetostart
  if (keyCode === 32) {
    currentScreen = GAME
  }
}

function keyReleased() {
  //player1keyreleased
  if (keyCode === 68) {
    rightSpeed = false
  }
  if (keyCode === 65) {
    leftSpeed = false
  }
  //player2keyreleased
  if (keyCode === RIGHT_ARROW) {
    right2Speed = false
  }
  if (keyCode === LEFT_ARROW) {
    left2Speed = false
  }
}

function draw() {
  if (currentScreen === SPLASH) {
    splashScreen()
  } else if (currentScreen === GAME) {
    gameScreen()
  }
}