

let snow = [];
let winnerImg;
let winnerParam;
let winnerToken;
let restartButtonImg;
let playerOneOrTwoImg;


function setup() {
	document.body.style.margin = 0 + "px";
	document.body.style.overflow = "hidden";
	createCanvas(window.innerWidth, window.innerHeight);
	for(let i = 0; i < 150; i++) {
		snow.push(new Snow(5, 5, random(0, window.innerWidth), random(0, window.innerHeight), random(1, 5)));	
	}
	winnerAnim();
	winnerParam = getURLParams();
	//console.log(winnerParam.playerWon + " " + winnerParam.char);
	
	whoWon();
	
	restartButtonImg = loadImage("../imgs/GameAssets/winner/RestartButton.png");
}

function draw() {
	background(0);
	
	let cHeight = window.innerHeight / 2;
	let cWidth = window.innerWidth / 2;
	
	for(let i = 0; i < snow.length; i++) {
	  snow[i].render();
	  snow[i].move();	
	}
	image(winnerImg, cWidth - 300, cHeight + 100, 600, 250);
	image(winnerToken, cWidth - 110, cHeight -200, 200, 250);
	image(playerOneOrTwoImg, cWidth - 300, cHeight + 100, 600, 250);
	image(restartButtonImg, 0, 0, 250, 150,);
}

function mousePressed() {
	//Restart Button
	if( mouseX <=  234 && mouseX >= 11 &&  mouseY <= 118 && mouseY >= 26){
      window.open("lobby.html", "_self");
    }
}

function windowResized() {
	createCanvas(window.innerWidth, window.innerHeight);
}

function winnerAnim() {
	winnerImg = loadImage("../imgs/GameAssets/winner/winnerF1.png");
}

function whoWon() {
	if (winnerParam.char == 1) {
			winnerToken = loadImage("../imgs/GameAssets/Tokens/Tyrion_Lannister_Token.png");
		} else if (winnerParam.char == 2) {
			winnerToken = loadImage("../imgs/GameAssets/Tokens/Daenerys_Targaryen_Token.png");
		} else if (winnerParam.char == 3) {
			winnerToken = loadImage("../imgs/GameAssets/Tokens/Cersei_Lannister_Token.png");
		} else if (winnerParam.char == 4) {
			winnerToken = loadImage("../imgs/GameAssets/Tokens/Jon_Snow_Token.png");
		} else if (winnerParam.char == 5) {
			winnerToken = loadImage("../imgs/GameAssets/Tokens/Sansa_Start_Token.png");
		} else if (winnerParam.char == 6) {
			winnerToken = loadImage("../imgs/GameAssets/Tokens/Ramsay_Snow_Token.png");
		} else if (winnerParam.char == 7) {
			winnerToken = loadImage("../imgs/GameAssets/Tokens/Eddard_Start_Token.png");
		} else if (winnerParam.char == 8) {
			winnerToken = loadImage("../imgs/GameAssets/Tokens/Cersei_Lannister_Token.png");
		} else if (winnerParam.char == 9) {
			winnerToken = loadImage("../imgs/GameAssets/Tokens/Tyrwin_Lannister_Token.png");
		} else if (winnerParam.char == 10) {
			winnerToken = loadImage("../imgs/GameAssets/Tokens/Joffrey_Baratheon_Token.png");
		}
	
	if (winnerParam.playerWon == 1) {
		playerOneOrTwoImg = loadImage("../imgs/GameAssets/winner/playerOne.png");
	}else {
		playerOneOrTwoImg = loadImage("../imgs/GameAssets/winner/playerTwo.png");
	}
}

class Snow {
	constructor(width, height, posx, posy, velocity) {
		this.width = width;
		this.height = height;
		this.posx = posx;
		this.posy = posy;
		this.velocity = velocity;
	}
	
	render() {
		noStroke();
		fill(255);
		
		ellipse(this.posx, this.posy, this.width * this.velocity - 4, this.height * this.velocity - 4);
	}
	
	move() {
		if (this.posy > window.innerHeight) {
			this.posy = window.innerHeight - window.innerHeight;
			this.posx = random(0, window.innerWidth);
			this.velocity = random(1, 5);
		}
		this.posy += this.velocity;
	}
	
}















































