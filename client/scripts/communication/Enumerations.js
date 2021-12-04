const messageType = Object.freeze({
    REGISTER: 'register',
    CHAT: 'chat',
    GAMEUPDATE: 'gameupdate',
    GAMESTART: 'gamestart',
    GAMESTOP: 'gamestop'
});
window.messageType = messageType;

const UpdateType = Object.freeze({
    Tower: 0,
    Level: 1,
    Player: 2,
    Wave: 3
});

window.UpdateType = UpdateType;