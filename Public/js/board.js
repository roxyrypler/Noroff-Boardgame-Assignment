
/* --------------------------------------------------- */
// global variables
let tile;
let tileArray = [];
let rows = 11;
let cols = 10;
let canvas;
let canvasW = 500;
let canvasH = 500;

// Colors
let purple = '#575fcf';
let grey = '#808e9b';
let green = '#0be881';
let blue = '#0fbcf9';

// Player One Path

let playerOnePath = [];
let playerOne;
let playerOneCount = 0;
let playerOneInterval;

let steps = 0;
let stepsToTake = 0;

// player Two Path
let playerTwoPath = [];
let playerTwo;
let playerTwoCount = 0;
let playerTwoInterval;
let PlayerTwoStepsToTake = 0;

// rollTheDice

let diceFaces = ["",
				 "url(DiceFaces/Dice1.jpg)",
				 "url(DiceFaces/Dice2.jpg)",
				 "url(DiceFaces/Dice3.jpg)",
				 "url(DiceFaces/Dice4.jpg)",
				 "url(DiceFaces/Dice5.jpg)",
				 "url(DiceFaces/Dice6.jpg)"];

let diceInterval;
let rollTime = 0;
let rndIndex;
let diceDiv = document.getElementById("dice").style;
let canRoll = true;

// Wich player is it
let playerOneTurn = false;
let playerTwoTurn = false;
let playerTurnDescriptin = document.getElementById('playerState');
let wichPlayerAmI = document.getElementById("wichplayerAmI");
let playerStartDecider;


// Socket
let socket;

/* --------------------------------------------------- */
// Setups
function setup() {
	canvas = createCanvas(canvasW, canvasH);
	let cx = (windowWidth - width) / 2;
    let cy = (windowHeight - height) / 2;
    canvas.position(cx, cy);
	
	socket = io.connect('http://localhost:3000');
	socket.on("diceFaceInn", diceFaceFromServer);
	socket.on("movePlayerInn", movePlayer);
	socket.on("assignPlayerInn", assignPlayer)
	
	playerOnePath = [ new WalkingPath(0, 0),
					  new WalkingPath(50, 0),
					  new WalkingPath(100, 0),
					  new WalkingPath(150, 0),
					  new WalkingPath(200, 0),
					  new WalkingPath(250, 0),
					  new WalkingPath(300, 0),
					  new WalkingPath(350, 0),
					  new WalkingPath(400, 0),
					  new WalkingPath(450, 0),
					  new WalkingPath(450, 45),
					  new WalkingPath(450, 45 * 2),
					  new WalkingPath(450, 45 * 3),
					  new WalkingPath(400, 45 * 3),
					  new WalkingPath(350, 45 * 3),
					  new WalkingPath(350, 45 * 2),
					  new WalkingPath(300, 45 * 2),
					  new WalkingPath(250, 45 * 2),
					  new WalkingPath(200, 45 * 2),
					  new WalkingPath(150, 45 * 2),
					  new WalkingPath(100, 45 * 2),
					  new WalkingPath(100, 45 * 3),
					  new WalkingPath(50, 45 * 3),
					  new WalkingPath(50, 45 * 4),
					  new WalkingPath(50, 45 * 5),
					  new WalkingPath(100, 45 * 5),
					  new WalkingPath(150, 45 * 5)];
	
	playerTwoPath = [ new WalkingPath(450, 45 * 10),
					  new WalkingPath(400, 45 * 10),
					  new WalkingPath(350, 45 * 10),
					  new WalkingPath(300, 45 * 10),
					  new WalkingPath(250, 45 * 10),
					  new WalkingPath(200, 45 * 10),
					  new WalkingPath(150, 45 * 10),
					  new WalkingPath(100, 45 * 10),
					  new WalkingPath(50, 45 * 10),
					  new WalkingPath(0, 45 * 10),
					  new WalkingPath(0, 45 * 9),
					  new WalkingPath(0, 45 * 8),
					  new WalkingPath(0, 45 * 7),
					  new WalkingPath(50, 45 * 7),
					  new WalkingPath(100, 45 * 7),
					  new WalkingPath(100, 45 * 8),
					  new WalkingPath(150, 45 * 8),
					  new WalkingPath(200, 45 * 8),
					  new WalkingPath(250, 45 * 8),
					  new WalkingPath(300, 45 * 8),
					  new WalkingPath(350, 45 * 8),
					  new WalkingPath(350, 45 * 7),
					  new WalkingPath(400, 45 * 7),
					  new WalkingPath(400, 45 * 6),
					  new WalkingPath(400, 45 * 5),
					  new WalkingPath(350, 45 * 5),
					  new WalkingPath(300, 45 * 5)];
	
	
	playerOne = new PlayerOne(0, 0, 10, 10);
	playerTwo = new PlayerTwo(450, 450, 10, 10);
	
	
	debugGrid();
	
}

// From server
function assignPlayer(data) {
	if(data.playerOne == true) {
		playerTurnDescriptin.innerHTML = "Player 2! You start, this time";
		wichPlayerAmI.innerHTML = "I am player 1";
		playerOneTurn = false;
		playerTwoTurn = true;
		canRoll = false;
		console.log("Its player One turn");
	}else if (data.playerTwo == true) {
		playerTurnDescriptin.innerHTML = "Player 1! You start, this time";
		wichPlayerAmI.innerHTML = "I am player 2";
		playerOneTurn = true;
		playerTwoTurn = false;
		canRoll = false;
		console.log("Its player Two turn");
	}
}

function wichPlayersTurn() {
	playerStartDecider = floor(random(1, 3));
	if(playerStartDecider == 1) {
		playerTurnDescriptin.innerHTML = "Player 1! You start, this time";
		wichPlayerAmI.innerHTML = "I am player 1";
		playerOneTurn = false;
		playerTwoTurn = true;
		canRoll = true;
		console.log("Its player One turn");
	}else if (playerStartDecider == 2) {
		playerTurnDescriptin.innerHTML = "Player 2! You start, this time";
		wichPlayerAmI.innerHTML = "I am player 2";
		playerOneTurn = true;
		playerTwoTurn = false;
		canRoll = true;
		console.log("Its player Two turn");
	}
	let whoStarts = {
		playerOne: playerOneTurn,
		playerTwo: playerTwoTurn
	}
	
	socket.emit("whoStarts", whoStarts);
}

function InitializeDiceRolling() {
	canRoll = false;
	diceInterval = setInterval(rollTheDice, 50);
}



//From server
function diceFaceFromServer(data) {
	diceDiv.background = diceFaces[data];
	diceDiv.backgroundPosition = ("center center");
	diceDiv.backgroundRepeat = ("no-repeat");
	diceDiv.backgroundSize = ("cover");
}

function rollTheDice() {
	let diceData;
	if (rollTime <= 50) {
		rollTime += 1;
		rndIndex = floor(random(1, 6));
		diceDiv.background = diceFaces[rndIndex];
		diceDiv.backgroundPosition = ("center center");
		diceDiv.backgroundRepeat = ("no-repeat");
		diceDiv.backgroundSize = ("cover");
		// update Dice faces, sending to server
		diceData = {
			data: rndIndex
		}
		socket.emit("diceFace", diceData);
	}else {
		clearInterval(diceInterval);
		rollTime = 0;
		stepsToTake = rndIndex;
		PlayerTwoStepsToTake = rndIndex;
		playerOneInterval = setInterval(movePlayer(), 1000);
		console.log('move with: ' + rndIndex);
		socket.emit("gotStepsTotake", diceData);
	}
}

function oneStep() {
	console.log(canRoll);
	if (canRoll == true) {
		InitializeDiceRolling();
	}
}

function threeSteps() {
	wichPlayersTurn();
}

function sixSteps() {
	console.log('Clicked Button 6');
}

function switchPlayer() {
	console.log("Swithcing player");
	clearInterval(playerOneInterval);
	steps = 1;
	if (playerOneTurn == true) {
		playerOneTurn = false;
		playerTwoTurn = true;
		canRoll = true;
		playerTurnDescriptin.innerHTML = "Player 1 your up!";
	}else if (playerTwoTurn == true) {
		playerOneTurn = true;
		playerTwoTurn = false;
		canRoll = true;
		playerTurnDescriptin.innerHTML = "Player 2 your up!";
	}
}



function movePlayer(data) {
	console.log('Starting to move');
	if ( playerOneTurn == true) {
		try {
			if (playerOneCount <= playerOnePath.length) {
				if (steps <= stepsToTake) {
					playerOne.x = playerOnePath[playerOneCount].x;
					playerOne.y = playerOnePath[playerOneCount].y;
					playerOneCount++;
					steps++;
					console.log('Steps: ' + steps);
					console.log('Steps to take: ' + stepsToTake);
					console.log('PlayerCount: ' + playerOneCount);
				} else {
					switchPlayer()
				}
			}
		} catch (e) {
			clearInterval(playerOneInterval);
			steps = 1;
			console.log(e);
		}
	} else if (playerTwoTurn == true) {
		try {
			if (playerTwoCount <= playerTwoPath.length) {
				if (steps <= PlayerTwoStepsToTake) {
					playerTwo.x = playerTwoPath[playerTwoCount].x;
					playerTwo.y = playerTwoPath[playerTwoCount].y;
					playerTwoCount++;
					steps++;
					console.log('Steps: ' + steps);
					console.log('Steps to take: ' + PlayerTwoStepsToTake);
					console.log('PlayerCount: ' + playerTwoCount + '\n');
				} else {
					switchPlayer()
				}
			}
		} catch (e) {
			clearInterval(playerOneInterval);
			steps = 1;
			console.log(e);
		}
	}
}

/* setInterval(); clearInterval() */

/* --------------------------------------------------- */
// each frame
function draw() {
	background(0);
	
	for (let i = 0; i < tileArray.length; i++) {
		tileArray[i].renderCube();
	}
	
	for (let i = 0; i < playerOnePath.length; i++) {
		playerOnePath[i].renderPath();
	}
	
	for (let i = 0; i < playerTwoPath.length; i++) {
		playerTwoPath[i].renderPath();
	}
	
	playerOne.renderPlayer();
	playerTwo.renderPlayer();
	
}

/* --------------------------------------------------- */
// p5 helper functions

function windowResized() {
  centeringCanvas();
}


/* --------------------------------------------------- */
// Systems

function centeringCanvas() {
	let cx = (windowWidth - width) / 2;
    let cy = (windowHeight - height) / 2;
    canvas.position(cx, cy);
}

function debugGrid() {
	for (let i = 0; i < cols; i++) {
		for(let j = 0; j < rows; j++) {
			tileArray.push(new Tiles(50 * i, 45 * j));
		}
	}
}

/* --------------------------------------------------- */
// Game Objects
class Tiles {
	constructor(x, y) {
		this.height = 43;
		this.width = 48;
		this.x = x;
		this.y = y;
	}
	
	renderCube() {
		noStroke();
		fill(purple);
		rect(this.x, this.y, this.width, this.height);
	}
}

class WalkingPath {
	constructor(x, y) {
		this.height = 43;
		this.width = 48;
		this.x = x;
		this.y = y;
	}
	
	renderPath() {
		noStroke();
		fill(grey);
		rect(this.x, this.y, this.width, this.height);
	}
}

class PlayerOne {
	constructor(x, y, width, height) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.count = 0;
	}
	
	renderPlayer() {
		noStroke();
		fill(green);
		rect(this.x, this.y, this.width, this.height);
	}
}

class PlayerTwo {
	constructor(x, y, width, height) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}
	
	renderPlayer() {
		noStroke();
		fill(blue);
		rect(this.x, this.y, this.width, this.height);
	}
}
























