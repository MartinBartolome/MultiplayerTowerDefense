const Message = require('../Message')

class GameStartMessage extends Message.Message
{
    constructor(Level)
    {
        super(Message.MessageType.GAMESTART)
        this.Level = Level;
    }

    fromStream(stream)
    {
        this.stream = stream;
        var data = JSON.parse(stream);
        this.Level = data.Level;
    }

    toStream() {
        var data = {};
        data.messageType = this.messageType;
        data.Level = this.Level;
        return JSON.stringify(data);
    }
}

module.exports = {
    GameStartMessage : GameStartMessage
}