const WebSocket = require('ws');
const Message = require('./communication/Message');
const Level = require('./Game/Level/Level');
const {ChatMessage} = require("./communication/ClientMessages/ChatMessage");
const {RegisterMessage} = require("./communication/ClientMessages/RegisterMessage");
const {GameUpdateMessage} = require("./communication/ClientMessages/GameUpdateMessage");
const {GameStartMessage} = require("./communication/ServerMessages/GameStartMessage");
const {GameStopMessage} = require("./communication/ServerMessages/GameStopMessage");
const {LevelA} = require("./Game/Level/LevelA");
const {LevelB} = require("./Game/Level/LevelB");
const {LevelC} = require("./Game/Level/LevelC");

const server = new WebSocket.Server({ port: 8080 });

console.log('Server Online\n');



var websocketGame = {
  socket: {},
  playerID: '',
  playerName: '',
  quit: false,
  running: true
};

server.on('connection', socket => {
  socket.id = server.getUniqueID();

  server.clients.forEach(function each(client) {
    console.log('Client.ID: ' + client.id);
  });
  socket.onmessage = function (event) {
    try {
      this.message = new Message.Message();
      this.message.fromStream(event.data);
      switch (this.message.messageType) {
        case Message.MessageType.CHAT:
          let chatMessage = new ChatMessage();
          chatMessage.fromStream(event.data);
          broadcast(chatMessage);
          break;
        case Message.MessageType.REGISTER:
          let regmsg = new RegisterMessage();
          regmsg.fromStream(event.data);
          gameStatus.registeredPlayers.set(socket.id, regmsg.playerID);
          break;
        case Message.MessageType.GAMEUPDATE:
          let updatemessage = new GameUpdateMessage();
          updatemessage.fromStream(event.data);
          if (updatemessage.updateType == Message.UpdateType.AddTower) {
            addTower(updatemessage);
          }
          broadcast(updatemessage);
          break;
        default:
          console.log("[MESSAGE.WARNING] Client doesn't expect this message: " + data);
          break;
      }
    } catch (e) {
      console.log('[MESSAGE.ERROR] Catch: ' + e.toString() + 'data: ' + event.data);
    }
  };
  socket.onclose = function (event) {
    console.log('connection closed', event);
    gameStatus.registeredPlayers.delete(socket.id);
    gameStatus.countdownStarted = false;
    gameStatus.started = false;
    gameStatus.countdown = 2;
    if (gameStatus.registeredPlayers.size < 2) {
      let message = createMessage(Message.MessageType.GAMESTOP, 'stopping');
      broadcast(message);
    }
  };
});

// Message :
// {
//    messageType: messageType,
//    value: value,
//    playerId: playerId,
//    playerName: playerName,
//    timestamp: timestamp
// }

var map = {
  cols: 12,
  rows: 12,
  tsize: 64,
  tiles: [
    [119, 119, 119, 60, 119, 119, 119, 119, 119, 119, 119, 119],
    [119, 119, 119, 60, 119, 119, 119, 119, 119, 119, 119, 119],
    [119, 119, 60, 60, 119, 119, 119, 119, 119, 119, 119, 119],
    [119, 119, 60, 119, 119, 119, 119, 119, 119, 119, 119, 119],
    [119, 119, 60, 119, 119, 119, 119, 119, 119, 119, 119, 119],
    [119, 119, 60, 119, 119, 119, 119, 119, 119, 119, 119, 119],
    [119, 119, 60, 60, 60, 119, 119, 119, 119, 119, 119, 119],
    [119, 119, 119, 119, 60, 119, 119, 119, 119, 119, 119, 119],
    [119, 119, 119, 119, 60, 60, 119, 119, 119, 119, 119, 119],
    [119, 119, 119, 119, 119, 60, 119, 119, 119, 119, 119, 119],
    [119, 119, 119, 119, 119, 60, 119, 119, 119, 119, 119, 119],
    [119, 119, 119, 119, 119, 60, 119, 119, 119, 119, 119, 119]
  ],
  getTile: function (col, row) {
    return this.tiles[row][col];
  },
  // 245-248
  enemiesMoving: [],
  towersAlive: []
};

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function createMessage(messageType, value) {
  let message = {
    messageType: messageType,
    value: value,
    playerID: 4419,
    playerName: 'SERVER',
    timestamp: new Date()
  };
  return JSON.stringify(message);
}

var gameStatus = {
  registeredPlayers: new Map(),
  countdown: 3,
  countdownStarted: false,
  started: false
};

async function gameLoop() {
  // das ist der haupt loop
  let i = 0;
  while (1) {
    i++;
    console.log(i % 2 == 0 ? 'tick' : 'tock');

    if (gameStatus.registeredPlayers.size == 2 && !gameStatus.countdownStarted) {
      gameStatus.countdownStarted = true;
      console.log('Start Countdown');
    } else if (gameStatus.countdown > 0 && gameStatus.countdownStarted) {
      let message = new ChatMessage();
      message.playerName = 'Server';
      message.text = 'Game start in ' + gameStatus.countdown;
      broadcast(message);
      gameStatus.countdown--;
    } else if (gameStatus.countdown == 0 && !gameStatus.started) {
      let message = new ChatMessage('LFG')
      gameStatus.started = true;
      broadcast(message);
      let message2 = new GameStartMessage(new LevelC());
      broadcast(message2);
    } else if (gameStatus.started) {
      if ((i + 1) % 3 == 0) {
        shoot();
      }
      if (i % 4 == 0) {
        spawnEnemy();
      }
      moveEnemies();
    }
    await sleep(1000);
  }
}

function spawnEnemy() {
  // get starting coordinates
  let topRow = map.tiles[0];
  let x = topRow.indexOf(60);
  let y = 0;
  let value = {
    x: x,
    y: y,
    hp: 100,
    updateType: 1,
    type: 247
  };
  let message = createMessage(Message.MessageType.GAMEUPDATE, value);
  map.enemiesMoving.push([x,y,100,247])
  broadcast(message);
}

function addTower(updatemessage) {
  map.towersAlive.push([updatemessage.x, updatemessage.y, updatemessage.objectid])
}

function moveEnemies() {
  map.enemiesMoving.forEach(enemy => {
    if (
      enemy[1] == 0 ||
      enemy[1] == 1 ||
      enemy[1] == 3 ||
      enemy[1] == 4 ||
      enemy[1] == 5 ||
      enemy[1] == 7 ||
      enemy[1] == 9 ||
      enemy[1] == 10 ||
      (enemy[1] == 2 && enemy[0] == 2) ||
      (enemy[1] == 6 && enemy[0] == 4) ||
      (enemy[1] == 8 && enemy[0] == 5) ||
      enemy[1] == 11
    ) {
      enemy[1]++;
    } else if (enemy[1] == 2 && enemy[0] == 3) {
      enemy[0]--;
    } else if (
      (enemy[1] == 6 && enemy[0] == 2) ||
      (enemy[1] == 6 && enemy[0] == 3) ||
      (enemy[1] == 8 && enemy[0] == 4)
    ) {
      enemy[0]++;
    }
    if (enemy[1] == 12) {
      // lost game!
      console.log('you lost!');
      map.enemiesMoving.shift();
    }
  });
  let value = {
    x: 0,
    y: 0,
    type: 0,
    updateType: 0,
    enemiesMoving: map.enemiesMoving
  }
  let message = createMessage(Message.MessageType.GAMEUPDATE, value);
  broadcast(message)
}

server.getUniqueID = function () {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4();
};

function shoot() {
  console.log('shot', map.towersAlive)
  for (i = 0; i < map.towersAlive.length; i++) {
    activeTower = map.towersAlive[i];
    if (map.enemiesMoving.length != 0) {
      let activeEnemy = map.enemiesMoving[0];
      activeEnemy[2] = activeEnemy[2] - calculateShot(activeTower, activeEnemy[2]);
      // create message and broadcast it
      if (activeEnemy[2] <= 0) {
        map.enemiesMoving.shift();
      }
    }
  }
}

function calculateShot(tower, activeEnemyHp) {
  console.log("calculating shot")
  let enemy = map.enemiesMoving[0];
  let diffX = Math.abs(tower[0] - enemy[0]);
  let diffY = Math.abs(tower[1] - enemy[1]);
  let distance = Math.sqrt(diffX * diffX + diffY * diffY) + 1;
  let randomNumber = Math.floor(Math.random() * 17); // zwischen 1 und 17 // 15.5 ist max
  if (distance < randomNumber) {
    // here, we can also adjust difficulty
    // if hit, send message already here
    let value = {
      enemyX: enemy[0],
      enemyY: enemy[1],
      enemyHp: activeEnemyHp,
      towerX: tower[0],
      towerY: tower[1]
    };
    let message = createMessage(Message.MessageType.SHOT, value);
    broadcast(message);
    console.log('hit: ', 50 / distance);
    return 50 / distance;
  } else {
    console.log('miss');
    return 0;
  }
}

function broadcast(data) {
  server.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data.toStream());
    }
  });
}

gameLoop();
