var websocketGame = {
  socket: {},
  playerID: '',
  playerName: '',
  quit: false,
  running: true
};
var playercount = 0;
// init script when the DOM is ready.
var level = [];
$(function () {
  connect();
  validatePlayerName();
  startGame();
  handleChatText();
});
var wavecounter = 0;
var win = false;
/**
 * Validate length (min. 3, max. 10 chars) of playername
 */
function validatePlayerName() {
  $('#input-playername').keyup(function (e) {});
}

function waitStateInvoke(socket, data) {
  console.log('Wait State');
}

function createMessage(messageType, value) {
  let message = {
    messageType: messageType,
    value: value,
    playerID: websocketGame.playerID,
    playerName: websocketGame.playerName,
    timestamp: new Date()
  };
  return JSON.stringify(message);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function gameLoop() {
  console.log('this')
  // das wird Client-mässig gebraucht
  let i = 0;
  while (1) {
    i++;
    if (websocketGame.running) {
      run();
      // lets go
      /* render() */
      /* console.log(map); */
    }
    await sleep(10000);
  }
}
/**
 * Manage the websocket connection and react to the different messages
 */

function connect() {
  try {
    //websocket is supported by browser
    if (window['WebSocket']) {
      //create connection
      websocketGame.socket = new WebSocket('ws://localhost:8080');

      //on open event
      websocketGame.socket.onopen = function (e) {
        console.log('[OPEN] Connection established');
        websocketGame.playerID = '1' + Math.floor(Math.random() * 1000000000);
      };

      //on message event
      websocketGame.socket.onmessage = function (event) {
        /* console.log('[MESSAGE] Data received from server: ' + event.data); */

        try {
          this.message = new window.Message();
          this.message.fromStream(event.data);
          let data = JSON.parse(event.data);
          /* console.log('data', data, data['messageType']); */
          switch (data.messageType) {
            case messageType.CHAT:
              chatLogEntry(data);
              break;
            case messageType.GAMESTART:
              let gamestartmessage = new window.GameStartMessage();
              gamestartmessage.fromStream(event.data);
              level = [];
              level = gamestartmessage.Level.level;
              gameLoop();
              websocketGame.running = true;
              break;
            case messageType.GAMEUPDATE:
              let gameupdatemessage = new window.GameUpdateMessage();
              gameupdatemessage.fromStream(event.data);
              if(gameupdatemessage.updateType == UpdateType.Tower)
              {
                towers = [];
                for (var y = 0; y < gameupdatemessage.UpdateObject.length; y++) {
                  towers.push(
                      new Tower(gameupdatemessage.UpdateObject[y].type,
                          gameupdatemessage.UpdateObject[y].range,
                          gameupdatemessage.UpdateObject[y].x,
                          gameupdatemessage.UpdateObject[y].y,
                          gameupdatemessage.UpdateObject[y].damage,
                          gameupdatemessage.UpdateObject[y].upgrade));
                }
              }
              if(gameupdatemessage.updateType == UpdateType.Level)
              {
              }
              if(gameupdatemessage.updateType == UpdateType.Player)
              {
              }
              if(gameupdatemessage.updateType == UpdateType.Wave)
              {
                  wave.push(
                      new Enemy(gameupdatemessage.UpdateObject.x,
                          gameupdatemessage.UpdateObject.y,
                          gameupdatemessage.UpdateObject.pv,
                          gameupdatemessage.UpdateObject.speed,
                          gameupdatemessage.UpdateObject.type,
                          gameupdatemessage.UpdateObject.sprite,
                          gameupdatemessage.UpdateObject.genre));
                  wavecounter = gameupdatemessage.UpdateObject.wave;
              }
              break;
            case messageType.SHOT:
              renderHit(data);
              break;
            case messageType.GAMESTOP:
              let gamestopmessage = new window.GameStopMessage();
              gamestopmessage.fromStream(event.data);
              win = gamestopmessage.win;
              websocketGame.running = false;
              reset();
              removeCanvas();
              break;
            default:
              console.log(
                "[MESSAGE.WARNING] Client doesn't expect this message: " + data
              );
              break;
          }
        } catch (e) {
          console.log('[MESSAGE.ERROR] Catch: ' + e.toString() + 'data: ' + event.data);
        }
      };

      //on error event
      websocketGame.socket.onerror = function (error) {
        console.log(`[ERROR] ${error.message}`);
      };

      //on close event
      websocketGame.socket.onclose = function (event) {
        if (!websocketGame.quit) {
          console.log(
            `[closeD] Connection closed cleanly, code=${event.code} reason=${event.reason}`
          );
        }
      };
    }
  } catch (exception) {
    console.log('[ERROR] An error occurred: ' + exception);
  }
}

function reset() {
  window.GameSession.handleGameExit();
}

/**
 * Submit playername of signin form to server to start a game.
 */
function startGame() {
  $('#form-signin').submit(function (e) {
    console.log('[INFORMATION] start game');

    //alert to avoid that player waits without open socket connection for another player
    //e.g. if server is not running, there's an alert before
    //but we don't deactivate the whole site
    if (websocketGame.socket.readyState != 1) {
      console.log('[ERROR] Socket connection is not open.');
      alert(lang.ALERT_CONNECTIONLOST);
    } else {
      let playerName = this.playername.value;
      e.preventDefault(); //prevent page reload
      bindPreventPageReload();

      websocketGame.playerName = playerName;
      let message = new RegisterMessage(websocketGame);
      if(playercount == 0)
      {

      }

      console.log(message);
      websocketGame.socket.send(message.toStream());
      $('#div_Lobby').addClass('d-none');
      $('#div_Game').removeClass('d-none');
    }
  });
}
/**
 * Binds chat field to click and return event
 * for sending text to server
 */
function handleChatText() {
  $('#btn-chat').on('click', sendChatText);

  $('#input-chat').on('keyup', function (e) {
    if (e.key === 'Enter' && e.shiftKey === false) {
      sendChatText();
    }
  });
}

/**
 * Send text of chat input to websocket server
 * and clear the field
 */
function sendChatText() {
  let input = $('#input-chat').val();
  console.log('[SEND] chat text: ' + input);
  let message = new window.ChatMessage(websocketGame,input);
  websocketGame.socket.send(message.toStream());

  $('#input-chat').val('');
  // addChatText(input, false);
}

// Add sent chat text to chatbox, that means create a div-element for a card

function addChatText(message, received) {
  let divcard = $('<div/>', {
    class: 'chatcard'
  });
  let divcardbody = $('<div/>', {
    class: 'chatcard-body'
  });
  let text = $('<p/>');
  text.text(message);
  //if message is received put it left otherwise right
  if (received == true) {
    text.addClass('chatcard-text float-left');
  } else {
    text.addClass('chatcard-text float-right');
  }
  divcard.append(divcardbody);
  divcardbody.append(text);
  $('#chatEntries').append(divcard);
  //keep scrollbar at bottom
  var chatBody = document.querySelector('#chatEntries');
  chatBody.scrollTop = chatBody.scrollHeight - chatBody.clientHeight;
}
/**
 * Handle chat message from server (if received ChatLogEntry)
 * @param clientWebSocket
 * @param stream
 */
function chatLogEntry(data) {
  addChatText('[' + data.playerName + ']: ' + data.text, true);
}

/**
 * Bind event to prevent page reload
 */
function bindPreventPageReload() {
  window.addEventListener('beforeunload', preventPageReload);
}

// Show standard message if user wants to reload browser page

function preventPageReload(e) {
  // Cancel the event
  e.preventDefault(); // If you prevent default behavior in Mozilla Firefox prompt will always be shown
  // Chrome requires returnValue to be set
  e.returnValue = '';
}
