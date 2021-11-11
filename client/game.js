
var ctx = null;
var canvas = null;
function addCanvas() {
  // Create the canvas
  canvas = document.createElement("canvas");
  canvas.id = "gameCanvas";
  ctx = canvas.getContext("2d");
  canvas.width = 12 * 64;
  canvas.height = 12 * 64;
  document.body.appendChild(canvas);
}

function removeCanvas() {
  ctx = null;
  canvas = null;
  document.getElementById("gameCanvas").outerHTML = "";
}

function generateBlock2dMatrix(n) {
  a = Array(n).fill(0).map(x => Array(n).fill(0))
  return a;
}

var map = {
  cols: 12,
  rows: 12,
  tsize: 64,
  tiles: [
    [ 119, 119, 119, 60, 119, 119, 119, 119, 119, 119, 119, 119],
    [ 119, 119, 119, 60, 119, 119, 119, 119, 119, 119, 119, 119],
    [ 119, 119, 60, 60, 119, 119, 119, 119, 119, 119, 119, 119],
    [ 119, 119, 60, 119, 119, 119, 119, 119, 119, 119, 119, 119],
    [ 119, 119, 60, 119, 119, 119, 119, 119, 119, 119, 119, 119],
    [ 119, 119, 60, 119, 119, 119, 119, 119, 119, 119, 119, 119],
    [ 119, 119, 60, 60, 60, 119, 119, 119, 119, 119, 119, 119],
    [ 119, 119, 119, 119, 60, 119, 119, 119, 119, 119, 119, 119],
    [ 119, 119, 119, 119, 60, 60, 119, 119, 119, 119, 119, 119],
    [ 119, 119, 119, 119, 119, 60, 119, 119, 119, 119, 119, 119],
    [ 119, 119, 119, 119, 119, 60, 119, 119, 119, 119, 119, 119],
    [ 119, 119, 119, 119, 119, 60, 119, 119, 119, 119, 119, 119],    
  ],
  getTile: function (col, row) {
    return this.tiles[row][col]
  },
  // 245-248
  enemiesMoving: [],
  towersAlive: []
};

function handleGameUpdate() {
  console.log('arrived here!', data)
  let x = value.x;
  let y = value.y;
  let type = value.type;
  console.log(x, y, type)
  // push tower
  map.towersAlive.push([x,y,type])
}

function handleGameExit() {

}


function spawnEnemy(type) {
  // get starting coordinates
  let topRow = map.tiles[0];
  let x = topRow.indexOf(60);
  let y = 0;
  map.enemiesMoving.push([x, y, type])
}

function spawnTowerPlayerOne() {
  let x = Math.floor(Math.random()*13);
  let y = Math.floor(Math.random()*13);
  console.log('spawning tower', x, y)
  let value = {
    x: x,
    y: y,
    type: 247
  }
  let message = createMessage(messageType.GAMEUPDATE, value);
  websocketGame.socket.send(message);
  /* map.towersAlive.push([x,y,248]); */
}

function spawnTowerPlayerTwo() {
  let x = Math.floor(Math.random()*13);
  let y = Math.floor(Math.random()*13);
  console.log('spawning tower', x, y)
  let value = {
    x: x,
    y: y,
    type: 248
  }
  let message = createMessage(messageType.GAMEUPDATE, value);
  websocketGame.socket.send(message);
  /* map.towersAlive.push([x,y,248]); */
}

function moveEnemies() {
  console.log('moving')
  map.enemiesMoving.forEach(enemy => {
    if (enemy[1] == 0 || enemy[1] == 1 || enemy[1] == 3 || enemy[1] == 4 || enemy[1] == 5 || enemy[1] == 7 || enemy[1] == 9 || enemy[1] == 10 || enemy[1] == 2 && enemy[0] == 2 || enemy[1] == 6 && enemy[0] == 4 || enemy[1] == 8 && enemy[0] == 5 || enemy[1] == 11) {
      enemy[1]++;
    } else if (enemy[1] == 2 && enemy[0] == 3) {
      enemy[0]--;
    } else if (enemy[1] == 6 && enemy[0] == 2 || enemy[1] == 6 && enemy[0] == 3 || enemy[1] == 8 && enemy[0] == 4) {
      enemy[0]++;
    }
    if (enemy[1] == 12) {
      map.enemiesMoving.shift();
    }
  });
}

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
  bgReady = true;
};
bgImage.src = "images/background.png";

// Tiles
var tilesReady = false;
var tiles = new Image();
tiles.onload = function () {
  tilesReady = true;
};
tiles.src = "images/towerDefense_tilesheet.png";


// Hero image
/* var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
  heroReady = true;
};
heroImage.src = "images/hero.png";

// Monster image
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
  monsterReady = true;
};
monsterImage.src = "images/monster.png"; */

// Game objects
/* var hero = {
  speed: 256 // movement in pixels per second
};
var monster = {};
var monstersCaught = 0;

// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
  keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
  delete keysDown[e.keyCode];
}, false); */

// Reset the game when the player catches a monster
/* var reset = function () {
  hero.x = canvas.width / 2;
  hero.y = canvas.height / 2;

  // Throw the monster somewhere on the screen randomly
  monster.x = 32 + (Math.random() * (canvas.width - 64));
  monster.y = 32 + (Math.random() * (canvas.height - 64));
}; */

// Update game objects
/* var update = function (modifier) {
  if (38 in keysDown) { // Player holding up
    hero.y -= hero.speed * modifier;
  }
  if (40 in keysDown) { // Player holding down
    hero.y += hero.speed * modifier;
  }
  if (37 in keysDown) { // Player holding left
    hero.x -= hero.speed * modifier;
  }
  if (39 in keysDown) { // Player holding right
    hero.x += hero.speed * modifier;
  }

  // Are they touching?
  if (
    hero.x <= (monster.x + 32)
    && monster.x <= (hero.x + 32)
    && hero.y <= (monster.y + 32)
    && monster.y <= (hero.y + 32)
  ) {
    ++monstersCaught;
    reset();
  }
}; */

// Draw everything
var render = function () {
  // if (bgReady) {
  // 	ctx.drawImage(bgImage, 0, 0);
  // }
  if (tilesReady) {
    for (var c = 0; c < map.cols; c++) {
      for (var r = 0; r < map.rows; r++) {
        var tile = map.getTile(c, r);
        if (tile !== 0) { // 0 => empty tile
          ctx.drawImage(
            tiles, // image
            ((tile) % 23) * map.tsize, // source x
            (Math.floor((tile)/ 23)) * map.tsize, // source y
            map.tsize, // source width
            map.tsize, // source height
            c * map.tsize, // target x
            r * map.tsize, // target y
            map.tsize, // target width
            map.tsize // target height
          );
        }
      }
    }

    // draw enemies
    for (i = 0; i < map.enemiesMoving.length; i++){
      let enemy = map.enemiesMoving[i];
      let tile = enemy[2];
      if (tile !== 0) { // 0 => empty tile
        ctx.drawImage(
          tiles, // image
          ((tile) % 23) * map.tsize, // source x
          (Math.floor((tile)/ 23)) * map.tsize, // source y
          map.tsize, // source width
          map.tsize, // source height
          enemy[0] * map.tsize, // target x
          enemy[1] * map.tsize, // target y
          map.tsize, // target width
          map.tsize // target height
        );
      }
    }

    // draw towers
    for (i = 0; i < map.towersAlive.length; i++){
      let tower = map.towersAlive[i];
      let tile = tower[2];
      if (tile !== 0) { // 0 => empty tile
        ctx.drawImage(
          tiles, // image
          ((tile) % 23) * map.tsize, // source x
          (Math.floor((tile)/ 23)) * map.tsize, // source y
          map.tsize, // source width
          map.tsize, // source height
          tower[0] * map.tsize, // target x
          tower[1] * map.tsize, // target y
          map.tsize, // target width
          map.tsize // target height
        );
      }
    }
  }


  // if (heroReady) {
  //   ctx.drawImage(heroImage, hero.x, hero.y);
  // }
// 
  // if (monsterReady) {
  //   ctx.drawImage(monsterImage, monster.x, monster.y);
  // }

  // Score
  /* ctx.fillStyle = "rgb(250, 250, 250)";
  ctx.font = "24px Helvetica";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText("Goblins caught: " + monstersCaught, 32, 32); */
};

// The main game loop
var main = function () {
  var now = Date.now();
  var delta = now - then;

  // update(delta / 1000);
  render();

  then = now;

  // Request to do this again ASAP
  requestAnimationFrame(main);
};


// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
var then = Date.now();
// reset();
// main();