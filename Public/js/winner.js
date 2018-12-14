

let fireworks = [];


function setup() {
	document.body.style.margin = 0 + "px";
	document.body.style.overflow = "hidden";
	createCanvas(window.innerWidth, window.innerHeight);
	for(let i = 0; i < 100; i++) {
		fireworks.push(new Fireworks(10, 10, random(0, window.innerWidth), window.innerHeight));	
	}
}

function draw() {
	background(0);
	for(let i = 0; i < fireworks.length; i++) {
	  fireworks[i].render();
	  fireworks[i].move();	
	}
}

function windowResized() {
	createCanvas(window.innerWidth, window.innerHeight);
}

class Fireworks {
	constructor(width, height, posx, posy) {
		this.width = width;
		this.height = height;
		this.posx = posx;
		this.posy = posy;
		this.velocity = 5;
	}
	
	render() {
		noStroke();
		fill(255);
		ellipse(this.posx, this.posy, this.width, this.height);
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















































