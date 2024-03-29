class GameUpdateMessage extends window.Message
{
    /**
     * Message zum Updaten des Spiels, mit übergebenen Update Typ und dem Objekt, was geupdatet werden soll
     * @param updateType
     * @param UpdateObject
     */
    constructor(updateType, UpdateObject) {
        super(window.messageType.GAMEUPDATE);
        this.updateType = updateType;
        this.UpdateObject = UpdateObject;
    }
    fromStream(stream) {
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
window.GameUpdateMessage = GameUpdateMessage;
