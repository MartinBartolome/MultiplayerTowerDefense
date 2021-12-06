class GameStopMessage extends window.Message
{

    constructor() {
        super(window.messageType.GAMESTART);
    }
    fromStream(stream) {
        this.stream = stream;
        var data = JSON.parse(stream);
        this.win = data.win;
    }
    toStream() {
        var data = {};
        data.messageType = this.messageType;
        data.win = this.win;
        return JSON.stringify(data);
    }
}
window.GameStopMessage = GameStopMessage;