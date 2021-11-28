const messageType = Object.freeze({
    REGISTER: 'register',
    CHAT: 'chat',
    GAMEUPDATE: 'gameupdate',
    GAMESTART: 'gamestart',
    GAMESTOP: 'gamestop',
    SHOT: 'shot'
});
window.messageType = messageType;

const UpdateType = Object.freeze({
    IRGENDWAS: 0,
    NOCHIRGENDWAS: 1,
    AddTower: 2,
});

window.UpdateType = UpdateType;