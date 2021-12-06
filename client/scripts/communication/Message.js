class Message {
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