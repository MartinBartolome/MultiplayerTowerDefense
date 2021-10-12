
var websocketGame = {
	socket : {},
	playerID : "",
	activePlayerID : "",
	quit : false
}


// init script when the DOM is ready.
$(function() {
	connect();
	validatePlayerName();
	startGame();
});
/**
 * Validate length (min. 3, max. 10 chars) of playername
 */
function validatePlayerName() {
	$("#input-playername").keyup(function(e) {
	});
}

function waitStateInvoke(socket, data) {
	console.log("Wait State");
}

/**
 * Manage the websocket connection and react to the different messages
 */
function connect() {
	try {
		//websocket is supported by browser
		if (window["WebSocket"]) {
			//create connection
			websocketGame.socket = new WebSocket("ws://localhost:8000");

			//on open event
			websocketGame.socket.onopen = function (e) {
				console.log("[OPEN] Connection established");
				websocketGame.playerID = "1" + Math.floor(Math.random() * 1000000000);
			};

			//on message event
			websocketGame.socket.onmessage = function (event) {
				console.log("[MESSAGE] Data received from server: " + event.data);

				try {
					let data = JSON.parse(event.data);
					switch (data.objecttype) {
						case window.ObjectType.WaitStateInvoke:
							waitStateInvoke(this, event.data);
						default:
							console.log("[MESSAGE.WARNING] Client doesn't expect this message: " + data);
							break;
					}
				}
				catch(e) {
					console.log("[MESSAGE.ERROR] Catch: " + e.toString() + "data: " + event.data);
				}
			};

			//on error event
			websocketGame.socket.onerror = function(error) {
				console.log(`[ERROR] ${error.message}`);
			};

			//on close event
			websocketGame.socket.onclose = function (event) {
				// https://javascript.info/websocket
				if(!websocketGame.quit) {
					console.log(`[CLOSED] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
				}
			};
		}
	}
	catch(exception) {
		console.log("[ERROR] An error occurred: " + exception);
	}
}
/**
 * Submit playername of signin form to server to start a game.
 */
function startGame() {
	$("#form-signin").submit(function(e) {
		console.log("[INFORMATION] start game");

		//alert to avoid that player waits without open socket connection for another player
		//e.g. if server is not running, there's an alert before
		//but we don't deactivate the whole site
		if(websocketGame.socket.readyState != 1) {
			console.log("[ERROR] Socket connection is not open.");
			alert(lang.ALERT_CONNECTIONLOST);
		}
		else {
			let serverName = this.servername.value;
			let playerName = this.playername.value;
			let levelName = this.levelname.value;
			e.preventDefault(); //prevent page reload
			bindPreventPageReload();
			let playerIdentifier = websocketGame.playerID;
			const message = new window.StartGame(serverName,levelName,playerIdentifier, playerName);
			websocketGame.socket.send(message.toStream());
		}
	});
}
/**
 * Bind event to prevent page reload
 */
function bindPreventPageReload() {
	window.addEventListener("beforeunload", preventPageReload);
}
/**
 * Show standard message if user wants to reload browser page
 * https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onbeforeunload
 * @param e
 */
function preventPageReload(e) {
	// Cancel the event
	e.preventDefault(); // If you prevent default behavior in Mozilla Firefox prompt will always be shown
	// Chrome requires returnValue to be set
	e.returnValue = '';
}
