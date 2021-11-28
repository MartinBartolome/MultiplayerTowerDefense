class GameStartMessage extends window.Message
{

    constructor() {
        super(window.messageType.GAMESTART);
    }
    fromStream(stream) {
        this.stream = stream;
        var data = JSON.parse(stream);
        this.Level = data.Level;
    }
    toStream() {
        var data = {};
        data.messageType = this.messageType;
        data.Level = this.Level;
        return JSON.stringify(data);
    }
}
window.GameStartMessage = GameStartMessage;