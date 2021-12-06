class ChatMessage extends window.Message
{

    constructor(text, playerID,playerName) {
        super(window.messageType.CHAT);
        this.text = text;
        this.playerID = playerID;
        this.playerName = playerName;
    }
    fromStream(stream) {
        this.stream = stream;
        const data = JSON.parse(stream);
        this.playerID = data.playerID;
        this.playerName = data.playerName;
        this.text = data.text;
    }
    toStream() {
        const data = {};
        data.messageType = this.messageType;
        data.playerID = this.playerID;
        data.playerName = this.playerName;
        data.text = this.text;
        return JSON.stringify(data);
    }
}
window.ChatMessage = ChatMessage;