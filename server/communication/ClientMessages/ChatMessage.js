const Message = require('../Message')

/**
 * Klasse für eine ChatMessage
 */
class ChatMessage extends Message.Message
{
    /**
     * Konstruktor mit enthaltenem Text
     * @param text
     */
    constructor(text)
    {
        super(Message.MessageType.CHAT)
        this.text = text;
    }

    /**
     * Laden des Objekts aus einem Json string
     * @param stream
     */
    fromStream(stream)
    {
        this.stream = stream;
        const data = JSON.parse(stream);
        this.text = data.text;
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
        data.text = this.text;
        data.playerID = this.playerID;
        data.playerName = this.playerName;
        return JSON.stringify(data);
    }

    getText() {
        return this.text;
    }
}

module.exports = {
    ChatMessage : ChatMessage
}
