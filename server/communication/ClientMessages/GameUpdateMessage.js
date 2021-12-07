const Message = require('../Message')

/**
 * Klasse zum Updaten des Spiels
 */
class GameUpdateMessage extends Message.Message
{
    /**
     * Konstruktor mit dem Update Typ, was geupdatet werden soll und dem zu aktualisierendem Objekt
     * @param updateType
     * @param UpdateObject
     */
    constructor(updateType,UpdateObject)
    {
        super(Message.MessageType.GAMEUPDATE)
        this.updateType = updateType;
        this.UpdateObject = UpdateObject;
    }
    /**
     * Laden des Objekts aus einem Json string
     * @param stream
     */
    fromStream(stream)
    {
        this.stream = stream;
        const data = JSON.parse(stream);
        this.messageType = data.messageType;
        this.updateType = data.updateType;
        this.UpdateObject = data.UpdateObject;
    }
    /**
     * Konvertieren des Objekts in einen JSON String
     * @returns {string}
     */
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
