const Message = require('../Message');
const StartGame = require('./StartGame');
const Database = require('../../Database/Database');

const WaitStateInvoke = require('../ServerMessages/WaitStateInvoke');


class Handler {
    /**
     * The default constructor.
     */
    constructor() {
        this.database = new Database().getInstance();
    }
    /**
     * Handle the client request to join a game.
     * @param clientWebSocket The receiving web socket
     * @param stream The received data stream
     */
    startGame(clientWebSocket, stream) {
        var message = new StartGame();
        message.fromStream(stream);
        // Register websocket and wait for opponent player
        clientWebSocket.setPlayerProperties(message.getPlayerIdentifier(), message.getPlayerName());
        var clientWebSockets = this.database.getClientWebSockets();
        // Lookup for waiting play candidates
        for (var index = 0; (index < clientWebSockets.length); index++) {
            if (clientWebSocket === clientWebSockets[index]) {
                continue;
            }
            // Shall create new game session?
            if (clientWebSockets[index].isWaitingToJoinGameSession()) {
                return;
            }
        }
        // No registered player opponent found
        var response = new WaitStateInvoke.WaitStateInvoke(Message.TextKey.WaitForPlayers, WaitStateInvoke.State.WaitingForPlayer);
        clientWebSocket.send(response.toStream());
    }
}

module.exports = Handler
