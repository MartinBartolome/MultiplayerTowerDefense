class RegisterMessage extends window.Message
{

    constructor(websocketGame) {
        super(window.messageType.REGISTER);
        this.wsgame = websocketGame;
    }
    fromStream(stream) {
        this.stream = stream;
        var data = JSON.parse(stream);
        this.playerID = data.playerID;
        this.playerName = data.playerName;
    }
    toStream() {
        var data = {};
        data.messageType = this.messageType;
        data.playerID = this.wsgame.playerIdentifier;
        data.playerName = this.wsgame.playerName;
        return JSON.stringify(data);
    }
}
window.RegisterMessage = RegisterMessage;