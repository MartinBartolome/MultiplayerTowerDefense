const Message = require('../Message')

class GameUpdateMessage extends Message.Message
{
    constructor(updateType,UpdateObject)
    {
        super(Message.MessageType.GAMEUPDATE)
        this.updateType = updateType;
        this.UpdateObject = UpdateObject;
    }

    fromStream(stream)
    {
        this.stream = stream;
        const data = JSON.parse(stream);
        this.messageType = data.messageType;
        this.updateType = data.updateType;
        this.UpdateObject = data.UpdateObject;
    }

    toStream() {
        const data = {};
        data.messageType = this.messageType;
        data.updateType = this.updateType;
        data.UpdateObject = this.UpdateObject;
        return JSON.stringify(data);
    }
}

module.exports = {
    GameUpdateMessage : GameUpdateMessage
}