class GameUpdateMessage extends window.Message
{

    constructor(updateType,x,y,objectid) {
        super(window.messageType.GAMEUPDATE);
        this.updateType = updateType;
        this.x = x;
        this.y = y;
        this.objectid = objectid;
    }
    fromStream(stream) {
        this.stream = stream;
        var data = JSON.parse(stream);
        this.x = data.x;
        this.y = data.y;
        this.objectid = data.objectid;
        this.updateType = data.updateType;
    }
    toStream() {
        var data = {};
        data.messageType = this.messageType;
        data.x = this.x;
        data.y = this.y;
        data.objectid = this.objectid;
        data.updateType = this.updateType;
        return JSON.stringify(data);
    }
    getUpdateType()
    {
        return this.updateType;
    }
}
window.GameUpdateMessage = GameUpdateMessage;