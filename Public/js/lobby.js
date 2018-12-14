/* --------------------------------------------------- */
//Global vars
let callCount = 0;
let namesArray = [];
let charnames = ["Tyrion Lannister",
				"Daenerys Targaryen",
				"Cersei Lannister",
				"Jon Snow",
				"Sansa Stark",
				"Ramsay Snow",
				"Eddard Stark",
				"Jaime Lannister",
				"Tywin Lannister",
				"Joffrey Baratheon"];

//CharSelect
let playerOneSelect = 0;
let playerTwoSelect = 0;

/* --------------------------------------------------- */
allBooks();

//got main data
function allBooks() {
	for (let i = 1; i < 12; i++) {
		getData(i)
			.then(data => gotData(data))
			.catch(reason => console.log(reason.message));
	}
}

async function getData(i) {
	let apiAdress = "https://anapioficeandfire.com/api/books/" + i;
	let response = await fetch(apiAdress);
	let data = await response.json();
	return data;
}

function gotData(data) {
	//console.log(data);
	for (let i = 0; i < data.characters.length; i++) {
		//get char names and info
		getCharCal(data, i)
			.then(data => gotCharData(data))
			.catch(reason => console.log(reason.message));
	}
	
}

async function getCharCal(chardata, i) {
		let response = await fetch(chardata.characters[i]);
		let data = await response.json();
		return data;
}

function gotCharData(data) {
	//Add unique names to array
	if (namesArray.includes(data.name) == false) {
		namesArray.push({name: data.name,
						 born: data.born,
						 aliases: data.aliases[0]});
	}
	callCount++;
	if (callCount == 4921) {
		settingNames();
	}
}
/* --------------------------------------------------- */

//adding 10 chars for the player
function settingNames() {
	for (let j = 1; j < 11; j++) {
		for (let i = 0; i < namesArray.length; i++) {
			//console.log(namesArray[i].name);
			if (namesArray[i].name == charnames[j-1]) {
				let p1Charname = document.getElementById("p1Char" + j + "Name").innerHTML = namesArray[i].name;
				let p1CharBorn = document.getElementById("p1Char" + j + "Born").innerHTML = "Born " +  namesArray[i].born;
				if (namesArray[i].aliases == "") {
					let p1CharAlias = document.getElementById("p1Char" + j + "Alias").innerHTML = "Alias: Unknown";
					let p2CharAlias = document.getElementById("p2Char" + j + "Alias").innerHTML = "Alias: Unknown";
				}else {
					let p1CharAlias = document.getElementById("p1Char" + j + "Alias").innerHTML = namesArray[i].aliases;
					let p2CharAlias = document.getElementById("p2Char" + j + "Alias").innerHTML = namesArray[i].aliases;
				}
				let p2Charname = document.getElementById("p2Char" + j + "Name").innerHTML = namesArray[i].name;
				let p2CharBorn = document.getElementById("p2Char" + j + "Born").innerHTML = "Born " +  namesArray[i].born;
			}
		}	
	}
}

let startGameHref = document.getElementById("startGame");
	startGameHref.addEventListener("click", () => {
		window.open ("index.html?&playerOne=" + playerOneSelect + "&playerTwo=" + playerTwoSelect,"_self");
	})


function playerOneSelecter(num) {
	applyColorToAllButtons("#808080", "p1");
	switch (num) {
		case 1:
			applySelectionColorToOne("p1Char1SelectBTN", "#964448");
			break;
		case 2:
			applySelectionColorToOne("p1Char2SelectBTN", "#964448");
			break;
		case 3:
			applySelectionColorToOne("p1Char3SelectBTN", "#964448");
			break;
		case 4:
			applySelectionColorToOne("p1Char4SelectBTN", "#964448");
			break;
		case 5:
			applySelectionColorToOne("p1Char5SelectBTN", "#964448");
			break;
		case 6:
			applySelectionColorToOne("p1Char6SelectBTN", "#964448");
			break;
		case 7:
			applySelectionColorToOne("p1Char7SelectBTN", "#964448");
			break;
		case 8:
			applySelectionColorToOne("p1Char8SelectBTN", "#964448");
			break;
		case 9:
			applySelectionColorToOne("p1Char9SelectBTN", "#964448");
			break;
		case 10:
			applySelectionColorToOne("p1Char10SelectBTN", "#964448");
			break;
	}
	playerOneSelect = num;
	console.log(playerOneSelect);
}

function playerTwoSelecter(num) {
	applyColorToAllButtons("#808080", "p2");
	switch (num) {
		case 1:
			applySelectionColorToOne("p2Char1SelectBTN", "#964448");
			break;
		case 2:
			applySelectionColorToOne("p2Char2SelectBTN", "#964448");
			break;
		case 3:
			applySelectionColorToOne("p2Char3SelectBTN", "#964448");
			break;
		case 4:
			applySelectionColorToOne("p2Char4SelectBTN", "#964448");
			break;
		case 5:
			applySelectionColorToOne("p2Char5SelectBTN", "#964448");
			break;
		case 6:
			applySelectionColorToOne("p2Char6SelectBTN", "#964448");
			break;
		case 7:
			applySelectionColorToOne("p2Char7SelectBTN", "#964448");
			break;
		case 8:
			applySelectionColorToOne("p2Char8SelectBTN", "#964448");
			break;
		case 9:
			applySelectionColorToOne("p2Char9SelectBTN", "#964448");
			break;
		case 10:
			applySelectionColorToOne("p2Char10SelectBTN", "#964448");
			break;
	}
	playerTwoSelect = num;
	console.log(playerTwoSelect);
}
//p1Char10SelectBTN 
function applyColorToAllButtons(color, p1Orp2) {

	if (p1Orp2 == "p1") {
		for (let i = 1; i < 10; i++) {
			document.getElementById("p1Char" + i + "SelectBTN").style.backgroundColor = color;
		}
	}else if (p1Orp2 == "p2") {
		for (let i = 1; i < 10; i++) {
			document.getElementById("p2Char" + i + "SelectBTN").style.backgroundColor = color;
		}
	}
}

function applySelectionColorToOne(byId, color) {
	document.getElementById(byId).style.backgroundColor = color;
}




































