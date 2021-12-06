const Message = require('../Message')

class GameStopMessage extends Message.Message
{
    constructor(win)
    {
        super(Message.MessageType.GAMESTOP)
        this.win = win;
    }

    fromStream(stream)
    {
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

module.exports = {
    GameStopMessage : GameStopMessage
}