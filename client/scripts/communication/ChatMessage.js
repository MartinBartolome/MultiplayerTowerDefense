class ChatMessage extends window.Message
{

    constructor(websocketGame,text) {
        super(window.messageType.CHAT);
        this.wsgame = websocketGame;
        this.text = text;
    }
    fromStream(stream) {
        this.stream = stream;
        var data = JSON.parse(stream);
        this.playerID = data.playerID;
        this.playerName = data.playerName;
        this.text = data.text;
    }
    toStream() {
        var data = {};
        data.messageType = this.messageType;
        data.playerID = this.wsgame.playerIdentifier;
        data.playerName = this.wsgame.playerName;
        data.text = this.text;
        return JSON.stringify(data);
    }
}
window.ChatMessage = ChatMessage;