/**
 * Mögliche MessageTypes zum registrieren, Chatten, Updaten des Spiels, Starten des Spiels und zum Stoppen.
 * @type {Readonly<{REGISTER: string, GAMEUPDATE: string, GAMESTOP: string, CHAT: string, GAMESTART: string}>}
 */
let messageType = Object.freeze({
    REGISTER: 'register',
    CHAT: 'chat',
    GAMEUPDATE: 'gameupdate',
    GAMESTART: 'gamestart',
    GAMESTOP: 'gamestop'
});
window.messageType = messageType;

/**
 * Was vom Spiel geupdatet werden kann. Die Position der Türme, das Level, der Spieler und die Welle
 * @type {Readonly<{Wave: number, Player: number, Tower: number, Level: number}>}
 */
let UpdateType = Object.freeze({
    Tower: 0,
    Level: 1,
    Player: 2,
    Wave: 3
});

window.UpdateType = UpdateType;
