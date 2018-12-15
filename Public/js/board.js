/* --------------------------------------------------- */
// global variables
let tile;
let tileArray = [];
let rows = 11;
let cols = 10;
let canvas;
let canvasW = 600;
let canvasH = 660;

// Colors
let purple = '#575fcf';
let grey = '#808e9b';
let green = '#0be881';
let blue = '#0fbcf9';
let black = '#1e272e';
let yellow = '#ffc048';

// Player One Path

let playerOnePath = [];
let playerOne;
let playerOneCount = 0;
let playerOneInterval;

let steps = 1;
let stepsToTake = 0;

// player Two Path
let playerTwoPath = [];
let playerTwo;
let playerTwoCount = 0;
let playerTwoInterval;

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
let playerOneGot6 = false;
let playerTwoGot6 = false;

//Trap
let traps = [];
let abilityChests = [];


// Socket
let socket;

// Graphics
//player One image
let playerOneImg1;
let playerOneImg1X = 0;
let playerOneImg1Y = 0;

//player Two Image
let playerTwoImg1;
let playerTwoImgX = 0;
let playerTwoImgY = 0;

//Level BG
let levelBG;



//URL quaery
let param;

/* --------------------------------------------------- */
// Setups
function setup() { // p5js function

	canvas = createCanvas(canvasW, canvasH);
	let cx = ((windowWidth - width) / 2) + 200;
	let cy = (windowHeight - height) / 2;
	canvas.position(cx, cy);

	param = getURLParams();
	console.log(param.playerOne);
	console.log(param.playerTwo);

	/*----------------------------------------------------------------------------------------*/
	let pathConst = 60;
	playerOnePath = [new WalkingPath(0, 0),
					  new WalkingPath(pathConst, 0),
					  new WalkingPath(pathConst * 2, 0),
					  new WalkingPath(pathConst * 3, 0),
					  new WalkingPath(pathConst * 4, 0),
					  new WalkingPath(pathConst * 5, 0),
					  new WalkingPath(pathConst * 6, 0),
					  new WalkingPath(pathConst * 7, 0),
					  new WalkingPath(pathConst * 8, 0),
					  new WalkingPath(pathConst * 9, 0),
					  new WalkingPath(pathConst * 9, pathConst),
					  new WalkingPath(pathConst * 9, pathConst * 2),
					  new WalkingPath(pathConst * 9, pathConst * 3),
					  new WalkingPath(pathConst * 8, pathConst * 3),
					  new WalkingPath(pathConst * 7, pathConst * 3),
					  new WalkingPath(pathConst * 7, pathConst * 2),
					  new WalkingPath(pathConst * 6, pathConst * 2),
					  new WalkingPath(pathConst * 5, pathConst * 2),
					  new WalkingPath(pathConst * 4, pathConst * 2),
					  new WalkingPath(pathConst * 3, pathConst * 2),
					  new WalkingPath(pathConst * 2, pathConst * 2),
					  new WalkingPath(pathConst * 2, pathConst * 3),
					  new WalkingPath(pathConst * 1, pathConst * 3),
					  new WalkingPath(pathConst * 1, pathConst * 4),
					  new WalkingPath(pathConst * 1, pathConst * 5),
					  new WalkingPath(pathConst * 2, pathConst * 5),
					  new WalkingPath(pathConst * 3, pathConst * 5)];

	playerTwoPath = [new WalkingPath(pathConst * 9, pathConst * 10),
					  new WalkingPath(pathConst * 8, pathConst * 10),
					  new WalkingPath(pathConst * 7, pathConst * 10),
					  new WalkingPath(pathConst * 6, pathConst * 10),
					  new WalkingPath(pathConst * 5, pathConst * 10),
					  new WalkingPath(pathConst * 4, pathConst * 10),
					  new WalkingPath(pathConst * 3, pathConst * 10),
					  new WalkingPath(pathConst * 2, pathConst * 10),
					  new WalkingPath(pathConst * 1, pathConst * 10),
					  new WalkingPath(0, pathConst * 10),
					  new WalkingPath(0, pathConst * 9),
					  new WalkingPath(0, pathConst * 8),
					  new WalkingPath(0, pathConst * 7),
					  new WalkingPath(pathConst * 1, pathConst * 7),
					  new WalkingPath(pathConst * 2, pathConst * 7),
					  new WalkingPath(pathConst * 2, pathConst * 8),
					  new WalkingPath(pathConst * 3, pathConst * 8),
					  new WalkingPath(pathConst * 4, pathConst * 8),
					  new WalkingPath(pathConst * 5, pathConst * 8),
					  new WalkingPath(pathConst * 6, pathConst * 8),
					  new WalkingPath(pathConst * 7, pathConst * 8),
					  new WalkingPath(pathConst * 7, pathConst * 7),
					  new WalkingPath(pathConst * 8, pathConst * 7),
					  new WalkingPath(pathConst * 8, pathConst * 6),
					  new WalkingPath(pathConst * 8, pathConst * 5),
					  new WalkingPath(pathConst * 7, pathConst * 5),
					  new WalkingPath(pathConst * 6, pathConst * 5)];
	/*----------------------------------------------------------------------------------------*/
	traps = [new Trap(playerOnePath[4].x, playerOnePath[4].y, 30, 30),
			          new Trap(playerOnePath[21].x, playerOnePath[21].y, 30, 30),
			          new Trap(playerTwoPath[4].x, playerTwoPath[4].y, 30, 30),
			          new Trap(playerTwoPath[21].x, playerTwoPath[21].y, 30, 30)];

	abilityChests = [new AbilityChest(playerOnePath[6].x, playerOnePath[6].y, 20, 20),
					  new AbilityChest(playerOnePath[15].x, playerOnePath[15].y, 20, 20),
					  new AbilityChest(playerOnePath[26].x, playerOnePath[26].y, 20, 20),
					  new AbilityChest(playerTwoPath[6].x, playerTwoPath[6].y, 20, 20),
					  new AbilityChest(playerTwoPath[15].x, playerTwoPath[15].y, 20, 20),
					  new AbilityChest(playerTwoPath[26].x, playerTwoPath[26].y, 20, 20)];

	/*----------------------------------------------------------------------------------------*/
	levelBG = loadImage("imgs/GameAssets/Level/Level.jpg");


	playerOne = new PlayerOne(0, 0, 10, 10);
	playerTwo = new PlayerTwo(pathConst * 9, pathConst * 10, 10, 10);

	playerOne.setup();
	playerTwo.setup();

	/*----------------------------------------------------------------------------------------*/
	wichPlayersTurn();
	//debugGrid();

}

function createActionDisplayer(player, action) {
	let activity = document.getElementById("activity");

	let wichPlayer = document.createElement("h2");
	wichPlayer.className = "player";
	let actTxt = document.createTextNode(player);
	wichPlayer.appendChild(actTxt);
	activity.appendChild(wichPlayer);

	let actions = document.createElement("p");
	actions.className = "actions";
	let actionsTxt = document.createTextNode(action);
	actions.appendChild(actionsTxt);
	activity.appendChild(actions);

	let separator = document.createElement("div");
	separator.className = "separator";
	activity.appendChild(separator);
}

function take3StepsBack(pathindex) {

	if (playerOneTurn == true) {
		playerOne.x = playerOnePath[pathindex].x;
		playerOne.y = playerOnePath[pathindex].y;
		playerOneCount = playerOneCount - 3;
	} else {
		playerTwo.x = playerTwoPath[pathindex].x;
		playerTwo.y = playerTwoPath[pathindex].y;
		playerTwoCount = playerTwoCount - 3;
	}
	switchPlayer();
}

function abilityDecider(pathindex) {
	let rndNum = floor(random(1, 5));

	switch (rndNum) {
		case 1:
			console.log("Move 2 step forwords");
			//Move 2 step forwords
			if (playerOneTurn == true) {
				playerOne.x = playerOnePath[pathindex + 2].x;
				playerOne.y = playerOnePath[pathindex + 2].y;
				playerOneCount = playerOneCount + 2;
				createActionDisplayer("Player 2", "Move 2 steps forword");
			} else {
				playerTwo.x = playerTwoPath[pathindex + 2].x;
				playerTwo.y = playerTwoPath[pathindex + 2].y;
				playerTwoCount = playerTwoCount + 2;
				createActionDisplayer("Player 1", "Move 2 steps forword");
			}
			break;
		case 2:
			console.log("Take 2 step backwords");
			// Take 2 step backwords
			if (playerOneTurn == true) {
				playerOne.x = playerOnePath[pathindex - 2].x;
				playerOne.y = playerOnePath[pathindex - 2].y;
				playerOneCount = playerOneCount - 2;
				createActionDisplayer("Player 2", "Move 2 steps backwords");
			} else {
				playerTwo.x = playerTwoPath[pathindex - 2].x;
				playerTwo.y = playerTwoPath[pathindex - 2].y;
				playerTwoCount = playerTwoCount - 2;
				createActionDisplayer("Player 1", "Move 2 steps backwords");
			}
			break;
		case 3:
			console.log("Move 4 steps forwords");
			// Move 4 steps forwords
			if (playerOneTurn == true) {
				playerOne.x = playerOnePath[pathindex + 4].x;
				playerOne.y = playerOnePath[pathindex + 4].y;
				playerOneCount = playerOneCount + 4;
				createActionDisplayer("Player 2", "Move 4 steps forword");
			} else {
				playerTwo.x = playerTwoPath[pathindex + 4].x;
				playerTwo.y = playerTwoPath[pathindex + 4].y;
				playerTwoCount = playerTwoCount + 4;
				createActionDisplayer("Player 1", "Move 4 steps forword");
			}
			break;
		case 4:
			console.log("take 4 Steps backwords");
			// take 4 Steps backwords
			if (playerOneTurn == true) {
				playerOne.x = playerOnePath[pathindex - 4].x;
				playerOne.y = playerOnePath[pathindex - 4].y;
				playerOneCount = playerOneCount - 4;
				createActionDisplayer("Player 2", "Move 4 steps backwords");
			} else {
				playerTwo.x = playerTwoPath[pathindex - 4].x;
				playerTwo.y = playerTwoPath[pathindex - 4].y;
				playerTwoCount = playerTwoCount - 4;
				createActionDisplayer("Player 1", "Move 4 steps backwords");
			}
			break;
		default:
			console.log("something went wrong");
			break;
	}
	landedOnSOmething();
}

function landedOnSOmething() {

	if (playerOneTurn == true) {
		if (playerOne.x == playerOnePath[4].x && playerOne.y == playerOnePath[4].y) {
			console.log("Hit a trap");
			createActionDisplayer("Player 2", "Hit a trap, move 3 steps back");
			take3StepsBack(1);
		} else if (playerOne.x == playerOnePath[21].x && playerOne.y == playerOnePath[21].y) {
			console.log("Hit a trap");
			createActionDisplayer("Player 2", "Hit a trap, move 3 steps back");
			take3StepsBack(18);
		} else if (playerOne.x == playerOnePath[6].x && playerOne.y == playerOnePath[6].y) {
			console.log("Hit a chest");
			createActionDisplayer("Player 2", "Hit a chest");
			abilityDecider(6);
		} else if (playerOne.x == playerOnePath[15].x && playerOne.y == playerOnePath[15].y) {
			console.log("Hit a chest");
			createActionDisplayer("Player 2", "Hit a chest");
			abilityDecider(15);
		} else if (playerOne.x == playerOnePath[26].x && playerOne.y == playerOnePath[26].y) {
			console.log("Hit a chset");
			createActionDisplayer("Player 2", "Hit a chest");
			abilityDecider(26);
		} else {
			console.log("Hit nothing");
			switchPlayer();
		}
	} else {
		if (playerTwo.x == playerTwoPath[4].x && playerTwo.y == playerTwoPath[4].y) {
			console.log("Hit a trap");
			createActionDisplayer("Player 1", "Hit a trap, move 3 steps back");
			take3StepsBack(1);
		} else if (playerTwo.x == playerTwoPath[21].x && playerTwo.y == playerTwoPath[21].y) {
			console.log("Hit a trap");
			createActionDisplayer("Player 1", "Hit a trap, move 3 steps back");
			take3StepsBack(18);
		} else if (playerTwo.x == playerTwoPath[6].x && playerTwo.y == playerTwoPath[6].y) {
			console.log("Hit a chest");
			createActionDisplayer("Player 1", "Hit a chest");
			abilityDecider(6);
		} else if (playerTwo.x == playerTwoPath[15].x && playerTwo.y == playerTwoPath[15].y) {
			console.log("Hit a chest");
			createActionDisplayer("Player 1", "Hit a chest");
			abilityDecider(15);
		} else if (playerTwo.x == playerTwoPath[26].x && playerTwo.y == playerTwoPath[26].y) {
			console.log("Hit a chset");
			createActionDisplayer("Player 1", "Hit a chest");
			abilityDecider(26);
		} else {
			console.log("Hit nothing");
			switchPlayer();
		}
	}
}


function wichPlayersTurn() {
	playerStartDecider = floor(random(1, 3));
	if (playerStartDecider == 1) {
		playerTurnDescriptin.innerHTML = "Player 1! You start, this time";
		//wichPlayerAmI.innerHTML = "I am player 1";
		playerOneTurn = false;
		playerTwoTurn = true;
		canRoll = true;
		//console.log("Its player One turn");
	} else if (playerStartDecider == 2) {
		playerTurnDescriptin.innerHTML = "Player 2! You start, this time";
		//wichPlayerAmI.innerHTML = "I am player 2";
		playerOneTurn = true;
		playerTwoTurn = false;
		canRoll = true;
		//console.log("Its player Two turn");
	}
}

function InitializeDiceRolling() {
	canRoll = false;
	diceInterval = setInterval(rollTheDice, 50);
}

function rollTheDice() {
	if (rollTime <= 50) {
		rollTime += 1;
		rndIndex = floor(random(1, 7));
		diceDiv.background = diceFaces[rndIndex];
		diceDiv.backgroundPosition = ("center center");
		diceDiv.backgroundRepeat = ("no-repeat");
		diceDiv.backgroundSize = ("cover");
	} else {
		clearInterval(diceInterval);
		rollTime = 0;
		stepsToTake = rndIndex;
		
		if (rndIndex == 6 && playerOneTurn == true) {
			playerOneGot6 = true;
		} else if (rndIndex == 6 && playerTwoTurn == true) {
			playerTwoGot6 = true;
		}
		
		playerOneInterval = setInterval(movePlayer, 1000);
		//console.log('move with: ' + rndIndex);
	}
}

function oneStep() {
	//console.log(canRoll);
	if (canRoll == true) {
		InitializeDiceRolling();
	}
}

function threeSteps() {
	wichPlayersTurn();
}

function switchPlayer() {
	//console.log("Swithcing player");
	clearInterval(playerOneInterval);
	steps = 1;
	if (playerOneGot6 == true) {
		playerOneGot6 = false;
		canRoll = true;
		playerTurnDescriptin.innerHTML = "Player 2 rolls again!";
	} else if (playerOneTurn == true) {
		playerOneTurn = false;
		playerTwoTurn = true;
		canRoll = true;
		playerTurnDescriptin.innerHTML = "Player 1 your up!";
	} else if (playerTwoGot6 == true) {
		playerTwoGot6 = false;
		canRoll = true;
		playerTurnDescriptin.innerHTML = "Player 1 rolls again!";
	} else if (playerTwoTurn == true) {
		playerOneTurn = true;
		playerTwoTurn = false;
		canRoll = true;
		playerTurnDescriptin.innerHTML = "Player 2 your up!";
	}
}



function movePlayer() {
	//console.log('Starting to move');
	console.log(steps);
	if (playerOneTurn == true) {
		try {
			if (playerOneCount <= playerOnePath.length) {
				if (steps <= stepsToTake) {
					playerOneCount++;
					playerOne.x = playerOnePath[playerOneCount].x;
					playerOne.y = playerOnePath[playerOneCount].y;
					steps++;
					//console.log('Steps: ' + steps);
					//console.log('Steps to take: ' + stepsToTake);
					//console.log('PlayerCount: ' + playerOneCount);
				} else {
					//switchPlayer();
					landedOnSOmething();
				}
			}
		} catch (e) {
			clearInterval(playerOneInterval);
			steps = 1;
			console.log(e);
			window.open("winner.html?playerWon=2&char=" + param.playerTwo, "_self");
		}
	} else if (playerTwoTurn == true) {
		try {
			if (playerTwoCount <= playerTwoPath.length) {
				if (steps <= stepsToTake) {
					playerTwoCount++;
					playerTwo.x = playerTwoPath[playerTwoCount].x;
					playerTwo.y = playerTwoPath[playerTwoCount].y;
					steps++;
					//console.log('Steps: ' + steps);
					//console.log('Steps to take: ' + PlayerTwoStepsToTake);
					//console.log('PlayerCount: ' + playerTwoCount + '\n');
				} else {
					//switchPlayer();
					landedOnSOmething();
				}
			}
		} catch (e) {
			clearInterval(playerOneInterval);
			steps = 1;
			console.log(e);
			window.open("winner.html?playerWon=1&char=" + param.playerOne, "_self");
		}
	}
}

/* setInterval(); clearInterval() */

/* --------------------------------------------------- */
function draw() { // p5js function (runs each fram)
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

	for (let i = 0; i < traps.length; i++) {
		traps[i].renderTrap();
	}

	for (let i = 0; i < abilityChests.length; i++) {
		abilityChests[i].renderChest();
	}

	image(levelBG, 0, 0, canvasW, canvasH);

	playerOne.renderPlayer();
	playerTwo.renderPlayer();
	//console.log("Player One: " + playerOneTurn);
	//console.log("Player Two: " + playerTwoTurn);





}

/* --------------------------------------------------- */
// p5 helper functions

function windowResized() {
	centeringCanvas();
}


/* --------------------------------------------------- */
// Systems

function centeringCanvas() {
	let cx = ((windowWidth - width) / 2) + 200;
	let cy = (windowHeight - height) / 2;
	canvas.position(cx, cy);
}

function debugGrid() {
	for (let i = 0; i < cols; i++) {
		for (let j = 0; j < rows; j++) {
			tileArray.push(new Tiles(60 * i, 60 * j));
		}
	}
}

/* --------------------------------------------------- */
// Game Objects
class Tiles {
	constructor(x, y) {
		this.height = 55;
		this.width = 55;
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
		this.height = 54;
		this.width = 54;
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

	setup() {
		if (param.playerOne == 1) {
			playerOneImg1 = loadImage("imgs/GameAssets/Tokens/Tyrion_Lannister_Token.png");
		} else if (param.playerOne == 2) {
			playerOneImg1 = loadImage("imgs/GameAssets/Tokens/Daenerys_Targaryen_Token.png");
		} else if (param.playerOne == 3) {
			playerOneImg1 = loadImage("imgs/GameAssets/Tokens/Cersei_Lannister_Token.png");
		} else if (param.playerOne == 4) {
			playerOneImg1 = loadImage("imgs/GameAssets/Tokens/Jon_Snow_Token.png");
		} else if (param.playerOne == 5) {
			playerOneImg1 = loadImage("imgs/GameAssets/Tokens/Sansa_Start_Token.png");
		} else if (param.playerOne == 6) {
			playerOneImg1 = loadImage("imgs/GameAssets/Tokens/Ramsay_Snow_Token.png");
		} else if (param.playerOne == 7) {
			playerOneImg1 = loadImage("imgs/GameAssets/Tokens/Eddard_Start_Token.png");
		} else if (param.playerOne == 8) {
			playerOneImg1 = loadImage("imgs/GameAssets/Tokens/Cersei_Lannister_Token.png");
		} else if (param.playerOne == 9) {
			playerOneImg1 = loadImage("imgs/GameAssets/Tokens/Tyrwin_Lannister_Token.png");
		} else if (param.playerOne == 10) {
			playerOneImg1 = loadImage("imgs/GameAssets/Tokens/Joffrey_Baratheon_Token.png");
		}
	}

	renderPlayer() {
		/*noStroke();
		fill(green);
		rect(this.x, this.y, this.width, this.height);*/
		playerOneImg1X = lerp(playerOneImg1X, playerTwo.x, 0.05);
		playerOneImg1Y = lerp(playerOneImg1Y, playerTwo.y, 0.05);
		image(playerOneImg1, playerOneImg1X, playerOneImg1Y, 50, 60);
	}
}

class PlayerTwo {
	constructor(x, y, width, height) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}

	setup() {
		if (param.playerTwo == 1) {
			playerTwoImg1 = loadImage("imgs/GameAssets/Tokens/Tyrion_Lannister_Token.png");
		} else if (param.playerTwo == 2) {
			playerTwoImg1 = loadImage("imgs/GameAssets/Tokens/Daenerys_Targaryen_Token.png");
		} else if (param.playerTwo == 3) {
			playerTwoImg1 = loadImage("imgs/GameAssets/Tokens/Cersei_Lannister_Token.png");
		} else if (param.playerTwo == 4) {
			playerTwoImg1 = loadImage("imgs/GameAssets/Tokens/Jon_Snow_Token.png");
		} else if (param.playerTwo == 5) {
			playerTwoImg1 = loadImage("imgs/GameAssets/Tokens/Sansa_Start_Token.png");
		} else if (param.playerTwo == 6) {
			playerTwoImg1 = loadImage("imgs/GameAssets/Tokens/Ramsay_Snow_Token.png");
		} else if (param.playerTwo == 7) {
			playerTwoImg1 = loadImage("imgs/GameAssets/Tokens/Eddard_Start_Token.png");
		} else if (param.playerTwo == 8) {
			playerTwoImg1 = loadImage("imgs/GameAssets/Tokens/Cersei_Lannister_Token.png");
		} else if (param.playerTwo == 9) {
			playerTwoImg1 = loadImage("imgs/GameAssets/Tokens/Tyrwin_Lannister_Token.png");
		} else if (param.playerTwo == 10) {
			playerTwoImg1 = loadImage("imgs/GameAssets/Tokens/Joffrey_Baratheon_Token.png");
		}
	}

	renderPlayer() {
		/*noStroke();
		fill(blue);
		rect(this.x, this.y, this.width, this.height);*/
		playerTwoImgX = lerp(playerTwoImgX, playerOne.x, 0.05);
		playerTwoImgY = lerp(playerTwoImgY, playerOne.y, 0.05);
		image(playerTwoImg1, playerTwoImgX, playerTwoImgY, 50, 60);
	}
}

class Trap {
	constructor(x, y, width, height) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}

	renderTrap() {
		noStroke();
		fill(black);
		rect(this.x, this.y, this.width, this.height);
	}
}

class AbilityChest {
	constructor(x, y, width, height) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}

	renderChest() {
		noStroke();
		fill(yellow);
		rect(this.x, this.y, this.width, this.height);
	}
}
