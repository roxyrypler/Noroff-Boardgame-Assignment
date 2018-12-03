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
let nsp = io.of("/myServer");

nsp.on("connection", room);

io.sockets.on('connection', newConnection);


function room(socket) {
	console.log(socket.id);
}


function newConnection(socket) {
	console.log('New connection: ' + socket.id);

	/*
	socket.on('diceFace', diceFace);
	
	function diceFace(data) {
		//Broadcast to all clients excluding the sender
		//socket.broadcast.emit('mouse', data);
		// Broadcast to all clients including the sender
		// io.sockets.emit('mouse', data);
		socket.broadcast.emit("diceFaceInn", data.data);
		
		console.log(data.data);
	}
	*/





}