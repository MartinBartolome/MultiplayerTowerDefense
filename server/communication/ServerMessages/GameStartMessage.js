const Message = require('../Message')

class GameStartMessage extends Message.Message
{
    constructor()
    {
        super(Message.MessageType.GAMESTART)
    }

    fromStream(stream)
    {
        this.stream = stream;
        var data = JSON.parse(stream);
    }

    toStream() {
        var data = {};
        data.messageType = this.messageType;
        return JSON.stringify(data);
    }
}

module.exports = {
    GameStartMessage : GameStartMessage
}