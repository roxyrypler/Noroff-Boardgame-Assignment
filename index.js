console.log("Server is starting");
// Requering modules
const express = require('express');
const socket = require('socket.io');

//Server serving on port
const app = express();
const port = 3000;
const server = app.listen(port);

//serving public files
app.use(express.static('Public'));

let io = socket(server);

io.sockets.on('connection', newConnection);

function newConnection(socket) {
	console.log('New connection: ' + socket.id);
	
	
	socket.on('diceFace', diceFace);
	socket.on("gotStepsTotake", movePlayer);
	socket.on("whoStarts", whoStartsOut);
	
	function whoStartsOut(data) {
		socket.broadcast.emit("assignPlayerInn", data);
	}
	
	function movePlayer(data) {
		socket.broadcast.emit("movePlayerInn", data);
	}
	
	function diceFace(data) {
		//Broadcast to all clients excluding the sender
		//socket.broadcast.emit('mouse', data);
		// Broadcast to all clients including the sender
		// io.sockets.emit('mouse', data);
		socket.broadcast.emit("diceFaceInn", data.data);
		
		console.log(data.data);
	}
	
	function whoGoesNext() {
		// TO DO: Send to all who can throw the dice and not.
		//Update movements and handle can throw the dace again.
	}
}
