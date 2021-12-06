class RegisterMessage extends window.Message
{

    constructor(playerID, playerName) {
        super(window.messageType.REGISTER);
        this.playerID = playerID;
        this.playerName = playerName;
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
        data.playerID = this.playerID;
        data.playerName = this.playerName;
        return JSON.stringify(data);
    }
}
window.RegisterMessage = RegisterMessage;