const MessageType = Object.freeze({
    REGISTER: 'register',
    CHAT: 'chat',
    GAMEUPDATE: 'gameupdate',
    GAMESTART: 'gamestart',
    GAMESTOP: 'gamestop'
  });

const UpdateType = Object.freeze({
    Tower: 0,
    Level: 1,
    Player: 2,
    Wave: 3
});

class Message {
    constructor(messageType)
    {
        this.messageType = messageType;
    }
    fromStream(stream) {
        var data = JSON.parse(stream);
        this.messageType = data.messageType;
    }
    getMessageType() {
        return this.messageType;
    }
}

module.exports = {
    Message : Message,
    MessageType : MessageType,
    UpdateType : UpdateType

}