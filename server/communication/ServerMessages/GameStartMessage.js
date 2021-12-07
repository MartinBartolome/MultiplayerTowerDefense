const Message = require('../Message')

/**
 * Klasse um ein Spiel zu starten
 */
class GameStartMessage extends Message.Message
{
    /**
     * Konstruktor mit dem zu startendem Level
     * @param Level
     */
    constructor(Level)
    {
        super(Message.MessageType.GAMESTART)
        this.Level = Level;
    }
    /**
     * Laden des Objekts aus einem Json string
     * @param stream
     */
    fromStream(stream)
    {
        this.stream = stream;
        const data = JSON.parse(stream);
        this.Level = data.Level;
    }
    /**
     * Konvertieren des Objekts in einen JSON String
     * @returns {string}
     */
    toStream() {
        const data = {};
        data.messageType = this.messageType;
        data.Level = this.Level;
        return JSON.stringify(data);
    }
}

module.exports = {
    GameStartMessage : GameStartMessage
}
