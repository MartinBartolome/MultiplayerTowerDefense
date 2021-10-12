/**
 * <h1>MessageType</h1>
 * The enumeration defining the type of message.
 */
const MessageType = Object.freeze({
    Undefined: '0',
    Information: '1',
    Warning: '2',
    Exception: '3'
});

/**
 * <h1>ObjectType</h1>
 * The enumeration defining the unique message identifier.
 */
const ObjectType =  Object.freeze({
    Undefined: '0',
    StartGame: '1',
    WaitStateInvoke: '2'
});

/**
 * <h1>ObjectTypes</h1>
 * The array defining the object types in plain text.
 */
const ObjectTypes = Object.freeze([
    "Undefined",
    "StartGame",
    "WaitStateInvoke"
]);

/**
 * <h1>TextKey</h1>
 * The enumeration defining the text keys for the text being visualized.
 */
const TextKey =  Object.freeze({
    Undefined: '?',
    NewGame: '1',
    NextGameLevel: '2',
    WaitForPlayers: '3',
    ConnectionLost:	'4',
    GameAborted: '5',
    Exception: '6'
});

/**
 * <h1>Message</h1>
 * The base message class.
 */
class Message {
    /**
     * The specialized constructor.
     * @param objectType The unique message identifier
     */
    constructor(objectType) {
        this.objectType = objectType;
    }

    /**
     * Serialize the data in a steam to class attribute members.
     * @param stream The stream containing the date to be serialized
     */
    fromStream(stream) {
        var data = JSON.parse(stream);
        this.objectType = data.objecttype;
    }

    /**
     * Get the unique message identifier.
     * @return The unique message identifier.
     */
    getObjectType() {
        return this.objectType;
    }

    /**
     * Serialize the member attributes to the stream for communication with client.
     * @return The communication stream
     */
    toStream() {
        alert("Not implemented");
    }

    /**
     * Serialize the member attributes to the stream for logging.
     * @return The log stream
     */
    toLogStream() {
        return "ObjectType[" + ObjectTypes[this.objectType] + "]";
    }
}

module.exports = {
    Message : Message,
    MessageType : MessageType,
    ObjectType : ObjectType,
    TextKey : TextKey
}
