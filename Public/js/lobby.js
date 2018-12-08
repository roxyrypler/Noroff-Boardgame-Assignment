


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
	//console.log(data.name);
	if (data.name == "Daenerys Targaryen") {
		console.log(data.name);
	}
}
/* --------------------------------------------------- */