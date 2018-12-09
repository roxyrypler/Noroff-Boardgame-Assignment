/* --------------------------------------------------- */
//Global vars
let callCount = 0;
let namesArray = [];
let charnames = ["Tyrion Lannister",
				"Daenerys Targaryen",
				"Cersei Lannister",
				"Jon Snow",
				"Sansa Stark",
				"Arya Stark",//?missing from api
				"Eddard Stark",
				"Jaime Lannister",
				"Tywin Lannister",
				"Joffrey Baratheon"];

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
				let p1CharAlias = document.getElementById("p1Char" + j + "Alias").innerHTML = namesArray[i].aliases;
				let p1CharBorn = document.getElementById("p1Char" + j + "Born").innerHTML = "Born " +  namesArray[i].born;

				let p2Charname = document.getElementById("p2Char" + j + "Name").innerHTML = namesArray[i].name;
				let p2CharAlias = document.getElementById("p2Char" + j + "Alias").innerHTML = namesArray[i].aliases;
				let p2CharBorn = document.getElementById("p2Char" + j + "Born").innerHTML = "Born " +  namesArray[i].born;
			}
		}	
	}
}



































