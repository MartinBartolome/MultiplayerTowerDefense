const Message = require('../Message')

/**
 * Klasse zum Stoppen des Spiels
 */
class GameStopMessage extends Message.Message
{
    /**
     * Konstruktor mit Parameter ob das Spiel gewonnen wurde oder nicht
     * @param win
     */
    constructor(win)
    {
        super(Message.MessageType.GAMESTOP)
        this.win = win;
    }
    /**
     * Laden des Objekts aus einem Json string
     * @param stream
     */
    fromStream(stream)
    {
        this.stream = stream;
        const data = JSON.parse(stream);
        this.win = data.win;
    }
    /**
     * Konvertieren des Objekts in einen JSON String
     * @returns {string}
     */
    toStream() {
        const data = {};
        data.messageType = this.messageType;
        data.win = this.win;
        return JSON.stringify(data);
    }
}

module.exports = {
    GameStopMessage : GameStopMessage
}
