const Message = require('../Message')

/**
 * Klasse zum Registrieren eines Spielers
 */
class RegisterMessage extends Message.Message
{
    /**
     * Konstruktor
     */
    constructor()
    {
        super(Message.MessageType.REGISTER)
    }
    /**
     * Laden des Objekts aus einem Json string
     * @param stream
     */
    fromStream(stream)
    {
        this.stream = stream;
        const data = JSON.parse(stream);
        this.playerID = data.playerID;
        this.playerName = data.playerName;
    }
    /**
     * Konvertieren des Objekts in einen JSON String
     * @returns {string}
     */
    toStream() {
        const data = {};
        data.messageType = this.messageType;
        data.playerID = this.playerID;
        data.playerName = this.playerName;
        return JSON.stringify(data);
    }
}

module.exports = {
    RegisterMessage : RegisterMessage
}
