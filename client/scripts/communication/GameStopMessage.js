class GameStopMessage extends window.Message
{
    /**
     * Simple Spielstop Message, mit der Information, ob das Spiel gewonnen wurde oder nicht.
     */
    constructor() {
        super(window.messageType.GAMESTART);
    }
    fromStream(stream) {
        this.stream = stream;
        const data = JSON.parse(stream);
        this.win = data.win;
    }
    toStream() {
        const data = {};
        data.messageType = this.messageType;
        data.win = this.win;
        return JSON.stringify(data);
    }
}
window.GameStopMessage = GameStopMessage;
