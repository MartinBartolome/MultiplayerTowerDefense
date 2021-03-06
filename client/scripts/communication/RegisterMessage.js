class RegisterMessage extends window.Message
{
    /**
     * Klasse zum registrieren des Spielers am Server
     * @param playerID
     * @param playerName
     */
    constructor(playerID, playerName) {
        super(window.messageType.REGISTER);
        this.playerID = playerID;
        this.playerName = playerName;
    }
    fromStream(stream) {
        this.stream = stream;
        const data = JSON.parse(stream);
        this.playerID = data.playerID;
        this.playerName = data.playerName;
    }
    toStream() {
        const data = {};
        data.messageType = this.messageType;
        data.playerID = this.playerID;
        data.playerName = this.playerName;
        return JSON.stringify(data);
    }
}
window.RegisterMessage = RegisterMessage;
