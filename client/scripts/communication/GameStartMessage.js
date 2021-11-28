class GameStartMessage extends window.Message
{

    constructor() {
        super(window.messageType.GAMESTART);
    }
    fromStream(stream) {
        this.stream = stream;
        var data = JSON.parse(stream);
    }
    toStream() {
        var data = {};
        data.messageType = this.messageType;
        return JSON.stringify(data);
    }
}
window.GameStartMessage = GameStartMessage;