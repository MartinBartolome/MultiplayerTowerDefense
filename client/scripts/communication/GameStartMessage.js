class GameStartMessage extends window.Message
{
    /**
     * Simple Spielstart Message, mit dem zu startenden Level
     */
    constructor() {
        super(window.messageType.GAMESTART);
    }
    fromStream(stream) {
        this.stream = stream;
        const data = JSON.parse(stream);
        this.Level = data.Level;
    }
    toStream() {
        const data = {};
        data.messageType = this.messageType;
        data.level = new window.Level();
        data.Level = this.Level;
        return JSON.stringify(data);
    }
}
window.GameStartMessage = GameStartMessage;
