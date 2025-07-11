// main.js

console.log('yo');

var p1 = {
	name: 'player1',
	//character blobs
	//movements
};


var p2 = {
	name: 'player2',

};


//to start game checks
//to start game checks
//to start game checks

var p1emptyalert = document.getElementById('p1emptyalert');
var p2emptyalert = document.getElementById('p2emptyalert');

var p1waitalert = document.getElementById(`p1waitalert`);
var p2waitalert = document.getElementById(`p2waitalert`);

var p1ready = 0
var p2ready = 0

var p1start = document.getElementById('p1start');
p1start.addEventListener('click', function(ev){

	p1emptyalert.innerText = '';
	p1waitalert.innerText = '';
	p2emptyalert.innerText = '';
	p2waitalert.innerText = '';

	p1.name = document.getElementById('p1').value;

	if (p1.name =='') {
		p1emptyalert.innerText = 'Give name, please';
	}

	else {
		checkp2();
		startcheck();
	};

});

var p2start = document.getElementById('p2start');
p2start.addEventListener('click', function(ev){

	p1emptyalert.innerText = '';
	p1waitalert.innerText = '';
	p2emptyalert.innerText = '';
	p2waitalert.innerText = '';

	p2.name = document.getElementById('p2').value;

	if (p2.name =='') {
		p2emptyalert.innerText = 'Give name, please';
		console.log(`checkp1fail`);
	}

	else {
		checkp1();
		startcheck();
	};

});

var checkp1 = function() {

	p1.name = document.getElementById('p1').value;
	
	if (p1.name == '') {
		p2waitalert.innerText = 'waiting for player 1';
		console.log(`checkp1fail`);
		p2ready = 0;
	}

	else {
		p2ready ++;
		console.log(`p2ready, ${p2.name}: ${p2ready}`);
	};
};

var checkp2 = function() {

	p2.name = document.getElementById('p2').value;
	
	if (p2.name == '') {
		p1waitalert.innerText = 'waiting for player 2';
		console.log(`checkp2fail`);
		p1ready = 0;
	}

	else {
		p1ready ++;
		console.log(`p1ready, ${p1.name}: ${p1ready}`);
	};
};

var startcheck = function() {

	if (p1ready == 0 && p2ready > 0) {
		console.log(`waiting for p1`);
		p2waitalert.innerText = 'waiting for player 1';
	}

	if (p1ready > 0 && p2ready == 0) {
		console.log(`waiting for p2`);
		p1waitalert.innerText = 'waiting for player 2';
	}

	if (p1ready > 0 && p2ready > 0) {
		console.log(`both are ready`);
		//drawMaze();
		//drawCharacters();
	};
}


// on game start
// on game start
// on game start

//draw grid function
//draw characters function











