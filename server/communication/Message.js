/**
 * Mögliche MessageTypes zum registrieren, Chatten, Updaten des Spiels, Starten des Spiels und zum Stoppen.
 * @type {Readonly<{REGISTER: string, GAMEUPDATE: string, GAMESTOP: string, CHAT: string, GAMESTART: string}>}
 */
const MessageType = Object.freeze({
    REGISTER: 'register',
    CHAT: 'chat',
    GAMEUPDATE: 'gameupdate',
    GAMESTART: 'gamestart',
    GAMESTOP: 'gamestop'
  });
/**
 * Was vom Spiel geupdatet werden kann. Die Position der Türme, das Level, der Spieler und die Welle
 * @type {Readonly<{Wave: number, Player: number, Tower: number, Level: number}>}
 */
const UpdateType = Object.freeze({
    Tower: 0,
    Level: 1,
    Player: 2,
    Wave: 3
});

/**
 * Klasse zum Ableiten für alle Messages
 */
class Message {
    /**
     * Konstruktor mit Message Typ
     * @param messageType
     */
    constructor(messageType)
    {
        this.messageType = messageType;
    }
    /**
     * Laden des Objekts aus einem Json string
     * @param stream
     */
    fromStream(stream) {
        const data = JSON.parse(stream);
        this.messageType = data.messageType;
    }
}

module.exports = {
    Message : Message,
    MessageType : MessageType,
    UpdateType : UpdateType

}
