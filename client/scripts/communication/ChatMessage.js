class ChatMessage extends window.Message
{
    /**
     * Erstellen einer Chat Message mit den benötigten Informationen
     * @param text
     * @param playerID
     * @param playerName
     */
    constructor(text, playerID,playerName) {
        super(window.messageType.CHAT);
        this.text = text;
        this.playerID = playerID;
        this.playerName = playerName;
    }

    /**
     * Einlesen einer ChatNachricht von JSON in das Objekt
     * @param stream
     */
    fromStream(stream) {
        this.stream = stream;
        const data = JSON.parse(stream);
        this.playerID = data.playerID;
        this.playerName = data.playerName;
        this.text = data.text;
    }

    /**
     * Parsen einer ChatNachricht in ein JSON
     * @returns {string}
     */
    toStream() {
        const data = {};
        data.messageType = this.messageType;
        data.playerID = this.playerID;
        data.playerName = this.playerName;
        data.text = this.text;
        return JSON.stringify(data);
    }
}
window.ChatMessage = ChatMessage;
