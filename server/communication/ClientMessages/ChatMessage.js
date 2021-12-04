const Message = require('../Message')

class ChatMessage extends Message.Message
{
    constructor(text)
    {
        super(Message.MessageType.CHAT)
        this.text = text;
    }

    fromStream(stream)
    {
        this.stream = stream;
        var data = JSON.parse(stream);
        this.text = data.text;
        this.playerID = data.playerID;
        this.playerName = data.playerName;
    }

    toStream() {
        var data = {};
        data.messageType = this.messageType;
        data.text = this.text;
        data.playerID = this.playerID;
        data.playerName = this.playerName;
        return JSON.stringify(data);
    }

    getText() {
        return this.text;
    }
}

module.exports = {
    ChatMessage : ChatMessage
}