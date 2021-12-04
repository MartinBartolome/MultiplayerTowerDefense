class Message {
    constructor(messageType) {
        this.messageType = messageType;
    }
    fromStream(stream) {
        var data = JSON.parse(stream);
        this.messageType = data.messageType;
    }

    getObjectType() {
        return this.messageType;
    }

    toStream() {
        return this.stream;
    }
}

window.Message = Message;