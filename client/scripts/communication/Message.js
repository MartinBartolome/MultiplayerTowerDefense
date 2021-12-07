class Message {
    /**
     * Hauptklasse für Messages, mit dem Message Typ als Parametern.
     * @param messageType
     */
    constructor(messageType) {
        this.messageType = messageType;
    }
    fromStream(stream) {
        const data = JSON.parse(stream);
        this.messageType = data.messageType;
    }

    toStream() {
        return this.stream;
    }
}

window.Message = Message;
