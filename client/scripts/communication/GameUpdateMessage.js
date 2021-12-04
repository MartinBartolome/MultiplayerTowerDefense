class GameUpdateMessage extends window.Message
{

    constructor(updateType, UpdateObject) {
        super(window.messageType.GAMEUPDATE);
        this.updateType = updateType;
        this.UpdateObject = UpdateObject;
    }
    fromStream(stream) {
        this.stream = stream;
        var data = JSON.parse(stream);
        this.messageType = data.messageType;
        this.updateType = data.updateType;
        this.UpdateObject = data.UpdateObject;
    }
    toStream() {
        var data = {};
        data.messageType = this.messageType;
        data.updateType = this.updateType;
        data.UpdateObject = this.UpdateObject;
        return JSON.stringify(data);
    }
}
window.GameUpdateMessage = GameUpdateMessage;