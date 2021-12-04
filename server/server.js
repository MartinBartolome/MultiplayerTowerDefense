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
const {Game} = require("./Game/Game");
const {UpdateType} = require("./communication/Message");

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
          if(updatemessage.updateType == UpdateType.Tower)
          {
            broadcast(updatemessage);
          }
          if(updatemessage.updateType == UpdateType.Wave)
          {
            gameStatus.canSpawn = true;
          }
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
  started: false,
  canSpawn: false
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
      message.playerName = 'Server';
      gameStatus.started = true;
      broadcast(message);
      let message2 = new GameStartMessage(new LevelB());
      this.Game = new Game(server,new LevelB());
      broadcast(message2);
    } else if (gameStatus.started) {
      this.Game.Tick(i);
      if(gameStatus.canSpawn)
      {
        this.Game.forceNextWave();
        gameStatus.canSpawn = false;
      }
    }
    await sleep(1000);
  }
}

server.getUniqueID = function () {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4();
};

function broadcast(data) {
  server.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data.toStream());
    }
  });
}

gameLoop();
