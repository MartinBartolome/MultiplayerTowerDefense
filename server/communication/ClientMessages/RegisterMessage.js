const Message = require('../Message')

class RegisterMessage extends Message.Message
{
    constructor()
    {
        super(Message.MessageType.REGISTER)
    }

    fromStream(stream)
    {
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

module.exports = {
    RegisterMessage : RegisterMessage
}