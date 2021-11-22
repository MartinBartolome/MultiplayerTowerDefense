const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 8080 });

console.log('Server Online\n');

const messageType = {
  REGISTER: 'register',
  CHAT: 'chat',
  GAMEUPDATE: 'gameupdate',
  GAMESTART: 'gamestart',
  GAMESTOP: 'gamestop',
  SHOT: 'shot'
};

// Message :
// {
//    messageType: messageType,
//    value: value,
//    playerId: playerId,
//    playerName: playerName,
//    timestamp: timestamp
// }

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
  // das wird Server-mässig gebraucht
  let i = 0;
  while (1) {
    i++;
    console.log(i % 2 == 0 ? 'tick' : 'tock');
    if ((i + 1) % 3) {
      shoot();
    }
    if (gameStatus.registeredPlayers.size == 2 && !gameStatus.countdownStarted) {
      gameStatus.countdownStarted = true;
      console.log('Start Countdown');
    } else if (gameStatus.countdown > 0 && gameStatus.countdownStarted) {
      let message = createMessage(
        messageType.CHAT,
        'Game start in ' + gameStatus.countdown
      );
      broadcast(message);
      gameStatus.countdown--;
    } else if (gameStatus.countdown == 0 && !gameStatus.started) {
      let message = createMessage(messageType.CHAT, 'LFG');
      gameStatus.started = true;
      broadcast(message);
      let message2 = createMessage(messageType.GAMESTART, 'starting');
      broadcast(message2);
    }
    await sleep(1000);
  }
}

gameLoop();

server.getUniqueID = function () {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4();
};

server.on('connection', socket => {
  socket.id = server.getUniqueID();
  server.clients.forEach(function each(client) {
    console.log('Client.ID: ' + client.id);
  });
  socket.onmessage = function (event) {
    try {
      let data = JSON.parse(event.data);
      console.log('parsed data', data);
      switch (data.messageType) {
        case messageType.CHAT:
          broadcast(event.data);
          break;
        case messageType.REGISTER:
          gameStatus.registeredPlayers.set(socket.id, data.value);
          break;
        case messageType.GAMEUPDATE:
          broadcast(event.data);
          break;
        case messageType.SHOT:
          broadcast(event.data);
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
      let message = createMessage(messageType.GAMESTOP, 'stoping');
      broadcast(message);
    }
  };
});

function shoot() {
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
  let enemy = map.enemiesMoving[0];
  let diffX = Math.abs(tower[0] - enemy[0]);
  let diffY = Math.abs(tower[1] - enemy[1]);
  let distance = Math.sqrt(diffX * diffX + diffY * diffY);
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
    let message = createMessage(messageType.SHOT, value);
    // broadcast
    
    // cause of miss handling
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
      client.send(data);
    }
  });
}
