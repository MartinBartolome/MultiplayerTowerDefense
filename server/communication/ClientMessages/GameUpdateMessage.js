const Message = require('../Message')

class GameUpdateMessage extends Message.Message
{
    constructor(updateType,x,y,objectid)
    {
        super(Message.MessageType.GAMEUPDATE)
        this.updateType = updateType;
        this.x = x;
        this.y = y;
        this.objectid = objectid;
    }

    fromStream(stream)
    {
        this.stream = stream;
        var data = JSON.parse(stream);
        this.updateType = data.updateType;
        this.x = data.x;
        this.y = data.y;
        this.objectid = data.objectid;
    }

    toStream() {
        var data = {};
        data.messageType = this.messageType;
        data.updateType = this.updateType;
        data.x = this.x;
        data.y = this.y;
        data.objectid = this.objectid;
        return JSON.stringify(data);
    }
}

module.exports = {
    GameUpdateMessage : GameUpdateMessage
}