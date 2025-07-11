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

var wasdInfo = document.getElementById('WASDinfo');
var ijklInfo = document.getElementById('IJKLinfo');

var p1ready = false
var p2ready = false

var gameStarted = false

var p1start = document.getElementById('p1start');
p1start.addEventListener('click', function(ev){

	if (gameStarted === false) {
		
		p1emptyalert.innerText = '';
		p1waitalert.innerText = '';
		p2emptyalert.innerText = '';
		p2waitalert.innerText = '';

		p1.name = document.getElementById('p1').value;

		if (p1.name ==='') {
			p1emptyalert.innerText = 'give name, please';
		}

		else {
			checkp2();
			startcheck();
		};

	};

});

var p2start = document.getElementById('p2start');
p2start.addEventListener('click', function(ev){

	if (gameStarted === false) {
		p1emptyalert.innerText = '';
		p1waitalert.innerText = '';
		p2emptyalert.innerText = '';
		p2waitalert.innerText = '';

		p2.name = document.getElementById('p2').value;

		if (p2.name ==='') {
			p2emptyalert.innerText = 'give name, please';
			//console.log(`checkp1fail`);
		}

		else {
			checkp1();
			startcheck();
			p2start.removeEventListener('click', function(ev){
			//console.log(`p2 button disabled`);
			})	
		};
	};

});

var checkp1 = function() {

	p1.name = document.getElementById('p1').value;
	
	if (p1.name === '') {
		p2waitalert.innerText = 'waiting for player 1';
		//console.log(`checkp1fail`);
	}

	else {
		p2ready = true;
		//console.log(`p2ready, ${p2.name}: ${p2ready}`);
	};

};

var checkp2 = function() {

	p2.name = document.getElementById('p2').value;
	
	if (p2.name === '') {
		p1waitalert.innerText = 'waiting for player 2';
		//console.log(`checkp2fail`);
	}

	else {
		p1ready = true;
		//console.log(`p1ready, ${p1.name}: ${p1ready}`);
	};
};

var startcheck = function() {

	if (p1ready === false && p2ready === true) {
		//console.log(`waiting for p1`);
		p2waitalert.innerText = 'waiting for player 1';
	}

	if (p1ready === true && p2ready === false) {
		//console.log(`waiting for p2`);
		p1waitalert.innerText = 'waiting for player 2';
	}

	if (p1ready === true && p2ready === true) {
		//console.log(`both are ready`);
		
		//insert a generating maze loading page?
		gameStarted = true;
		drawRaphArea();
		drawGrid();
		drawMaze();
		drawCharacters();

		wasdInfo.innerText = 'use the WASD keys to move';
		ijklInfo.innerText = 'use the IJKL keys to move';

	};
}

// on game start
// on game start
// on game start

var paper, paperX, paperY;

//create columns and rows for maze
var cols = 20;
var rows = 18;
var cellw, cellh;
var grid = [];

var drawRaphArea = function() {

	var toBeCleared = document.getElementById('instructions');
	toBeCleared.innerHTML = '';
	toBeCleared = document.getElementById('gamearea');
	toBeCleared.innerHTML = ''

	paper = new Raphael(document.getElementById('gamearea'));
	paperX = paper.width;
	paperY = paper.height; 
	cellw = paperX/cols;
	cellh = paperY/rows;

};


//the var moving around to knock down the walls
var current;

//to keep track of sequence of cells gone thru for backtracking for when stuck
var stack = [];
var visitedCount = 0;

//list of grids where characters can occur
var p1charGridSet1 = [];
var p1charGridSet2 = [];
var p1charGridSet3 = [];

var p2charGridSet1 = [];
var p2charGridSet2 = [];
var p2charGridSet3 = [];

//array to contain the three characters that will be drawn
var p1char = [];
var p2char = [];
var skunk, flyingsq;
var skunkL = [];
var flyingsqL = [];

//finishing lines
var lastCol = [];
var firstCol = [];

var p1charMov;
var p1Mov = true;
var p2charMov;
var p2Mov = true;

//draw grid
var drawGrid = function() {
	//console.log(`in drawMaze func`);

	//for every row, go through each column 
	for (y = 0; y < rows; y++ ) {
		for (x = 0; x < cols; x++) {
			//to create cell: draw lines around
			var cell = drawCell(x, y);
			grid.push(cell);
		};
	};
	//where i want the maze to start
	current = grid[0]; 
	
	//3 sets of grids where p1char can be allocated = grid[cols*y]
	for (y = 0/3*rows; y < 1/3*rows; y++) {
		p1charGridSet1.push(grid[cols*y]);
	};
	for (y = 1/3*rows; y < 2/3*rows; y++) {
		p1charGridSet2.push(grid[cols*y]);
	};
	for (y = 2/3*rows; y < 3/3*rows; y++) {
		p1charGridSet3.push(grid[cols*y]);
	};
	
	//grids where p2char can be allocated = grid[(cols-1)*(cols*y)]
	for (y = 0/3*rows; y < 1/3*rows; y++) {
		p2charGridSet1.push(grid[(cols-1)+(cols*y)]);	
	};
	for (y = 1/3*rows; y < 2/3*rows; y++) {
		p2charGridSet2.push(grid[(cols-1)+(cols*y)]);
	};
	for (y = 2/3*rows; y < 3/3*rows; y++) {
		p2charGridSet3.push(grid[(cols-1)+(cols*y)]);
	};

	//finishing lines
	for (y = 0; y < rows; y++) {
		lastCol.push(grid[(cols-1)+(cols*y)]);
	};
	for (y = 0; y < rows; y++) {
		firstCol.push(grid[cols*y]);
	};

};

//draw maze
var drawMaze = function() {
	//if current is in the cell, cell visited = true, highlight cell purple
	//console.log(`in drawMaze func ${current.x}, ${current.y}`);
	current.visited = true;
	visitedCount ++;
	current.visitedRect.attr({'fill': '#706E55'});

	//move current to one random unvisited neighbour if there are
	while (visitedCount < rows*cols) {
		//console.log(`loop works, here is current ${current}`)
	
	 	var next = current.checkNb();
		if (next) {
			next.visited = true;
			visitedCount ++;
			//console.log(`visited count is ${visitedCount}`);
			next.visitedRect.attr({'fill': '#706E55'});
			
			stack.push(current);
			removeWalls(current, next);
			current = next;
			//console.log(`this is new current from n ${current.x}, ${current.y}`);
		}
		else if (stack.length > 0) {
			current = stack.pop();
			//console.log(`next is undefined, backtracking now; in ${current}`);
		};
	}
}

//draw cell object
var drawCell = function (x, y) {
	//console.log(`in drawCell func`);

	var celldrawn = {};
	celldrawn.x = x;
	celldrawn.y = y;
	celldrawn.walls = [];
	celldrawn.xy = `${x}, ${y}`;

		celldrawn.cellx = celldrawn.x*cellw;
		celldrawn.celly = celldrawn.y*cellh;
		
		//can make wall strokes to png images to make it look fancier
		//up wall
		celldrawn.walls[0] = paper.path(`M ${celldrawn.cellx} ${celldrawn.celly} L ${celldrawn.cellx + cellw} ${celldrawn.celly}`).attr({'stroke-width': 5, 'stroke': '#B99676'});
		
		//down wall
		celldrawn.walls[1] = paper.path(`M ${celldrawn.cellx} ${celldrawn.celly + cellh} L ${celldrawn.cellx + cellw} ${celldrawn.celly + cellh}`).attr({'stroke-width': 5, 'stroke': '#B99676'});
		//left wall
		celldrawn.walls[2] = paper.path(`M ${celldrawn.cellx} ${celldrawn.celly} L ${celldrawn.cellx} ${celldrawn.celly + cellh}`).attr({'stroke-width': 5, 'stroke': '#B99676'});
		//right wall
		celldrawn.walls[3] = paper.path(`M ${celldrawn.cellx + cellw} ${celldrawn.celly} L ${celldrawn.cellx + cellw} ${celldrawn.celly + cellh}`).attr({'stroke-width': 5, 'stroke': '#B99676'});

	//to indcate that the cell has been visited by the current var
	celldrawn.visited = false;
	//if visited = true, draw rect and fill purple
	celldrawn.visitedRect = paper.rect(celldrawn.cellx, celldrawn.celly, cellw, cellh).attr({'fill': 'yellow',
		'stroke-width': 0 
	});

	celldrawn.skunkF = function() {
	 	skunk = paper.image("resources/skunk.svg", celldrawn.cellx, celldrawn.celly, cellw, cellh);
	};

	celldrawn.flyingsqF = function() {
		flyingsq = paper.image("resources/flyingsq.svg", celldrawn.cellx, celldrawn.celly, cellw, cellh);
	};

	celldrawn.checkNb = function() {
		//console.log(`in check neighbours function`);

		var neighbours = [];
		
		var top = grid[index(x, y-1)];
	    var down = grid[index(x, y+1)];
	    var left = grid[index(x-1, y)];
	    var right = grid[index(x+1, y)];

	    if (top && (top.visited === false)) {
	    	neighbours.push(top);
	    	//console.log(neighbours);
	    }
	    if (down && (down.visited === false)) {
	    	neighbours.push(down);
	    	//console.log(neighbours);
	    }
	    if (left && (left.visited === false)) {
	    	neighbours.push(left);
	    	//console.log(neighbours);
	    }
	    if (right && (right.visited === false)) {
	    	neighbours.push(right);
	    	//console.log(neighbours);
	    }

	    //pick a random neighbour for current to go to 
	    if (neighbours.length > 0) {
	    	var r = Math.floor(Math.random()*neighbours.length);
	    	//console.log(`random neighbour: ${neighbours[r].x}, ${neighbours[r].y}`);
	    	return neighbours[r];
	    	
	    }
	    else {
	    	//console.log(`undefined neighbour returned`);
	    	return undefined;
	    }
	};

	return celldrawn;
	
}

var removeWalls = function (c, n) {
	var xdiff = n.x - c.x;
	var ydiff = n.y - c.y;
	//console.log(`in remove wall func and diffs are ${xdiff}, ${ydiff}`);

	//if n is on top of c, remove c.walls[up] and n.walls[down]
	if (ydiff === -1) {
		c.walls[0].attr({'stroke': '#706E55'});
		n.walls[1].attr({'stroke': '#706E55'});
		//console.log(c, n);
	}
	//if n is below c, remove c.walls[down] and n.walls[up]
	if (ydiff === 1) {
		c.walls[1].attr({'stroke': '#706E55'});
		n.walls[0].attr({'stroke': '#706E55'});
		//console.log(c, n);
	}
	//if n is left of c, remove c.walls[left] and n.walls[right]
	if (xdiff === -1) {
		c.walls[2].attr({'stroke': '#706E55'});
		n.walls[3].attr({'stroke': '#706E55'});
		//console.log(c, n);
	}
	//if n is right of c, remove c.walls[right] and n.walls[left]
	if (xdiff === 1) {
		c.walls[3].attr({'stroke': '#706E55'});
		n.walls[2].attr({'stroke': '#706E55'});
		//console.log(c, n);
	}
}

//index conversion thing for checking neighbours
var index = function(x, y) {

	//if edge
	if (x < 0 || y < 0 || x > cols-1 || y > cols -1) {
    	return -1;
	}
	else {
		return x + y * cols;
		//console.log(x + y * cols)
	}
	
}


//drawing characters
var drawCharacters = function() {
	//console.log(`in drawCharacters func`);
	
	//allocate random position for p1char
	p1char.push(p1charGridSet1[Math.floor(Math.random()*rows/3)]);
	p1char.push(p1charGridSet2[Math.floor(Math.random()*rows/3)]);
	p1char.push(p1charGridSet3[Math.floor(Math.random()*rows/3)]);

	for (i = 0; i < p1char.length; i++) {
		skunkL.push(paper.image("resources/skunk.svg", p1char[i].cellx, p1char[i].celly, cellw, cellh));
	};

	p1charMov = p1char[0];
	p1char.splice(0, 1);
	skunk = skunkL[0];
	//console.log(skunkL);

	p2char.push(p2charGridSet1[Math.floor(Math.random()*rows/3)]);
	p2char.push(p2charGridSet2[Math.floor(Math.random()*rows/3)]);
	p2char.push(p2charGridSet3[Math.floor(Math.random()*rows/3)]);

	for (i = 0; i < p2char.length; i++) {
		flyingsqL.push(paper.image("resources/flyingsq.svg", p2char[i].cellx, p2char[i].celly, cellw, cellh));
	};

	p2charMov = p2char[0];
	p2char.splice(0, 1);
	flyingsq = flyingsqL[0];

	//event listeners: if no walls then move up down left right
	window.addEventListener('keyup', movep1char);
	window.addEventListener('keyup', movep2char);

};

var p1overlaps = [];
var p2overlaps = [];
var eastDiv = new Raphael(document.getElementById("east"));
var westDiv = new Raphael(document.getElementById("west"));
var eastT = eastDiv.text((eastDiv.width/2), (eastDiv.height/2)-25, 'east').attr({'font-family': 'newFont', 'font-size': '20', 'font-weight': '900', 'fill': '#E1D7CD'});
var westT = westDiv.text((westDiv.width/2), (westDiv.height/2)-25, 'west').attr({'font-family': 'newFont', 'font-size': '20', 'font-weight': '900', 'fill': '#E1D7CD'});
var skunkDone;
var flyingsqDone;

var movep1char = function(ev) {
	//console.log(`in keydown func, ${ev.key}`);

	//if p1char is at end, then turn char blue (and animate character into p2div?)
	var checkp1fin = function() {
		//console.log('in checkp1fin func');
		
		var charEndCheck = false;
		
		for (i = 0; i < lastCol.length && charEndCheck === false; i++) {

			if (lastCol[i].xy === p1charMov.xy) {
				skunk.remove();
				//console.log("hellu");

				if (p1overlaps !== 0){
					for (i = 0; i < p1overlaps.length; i++) {
						p1overlaps[i].remove();
					};

				};

				//if p1char[0] finished, p1charMov = p1char[1], then splice off
				if (p1char.length === 2) {
					p1charMov = p1char[0];
					p1char.splice(0, 1);
					skunk = skunkL[1];
					//pop skunk to the east div (lowest)
					skunkDone = eastDiv.image("resources/skunk.svg", 15, eastDiv.height-cellh, cellw, cellh);
					charEndCheck = true;
					endSound();
					//console.log(`second char activated`);
				}

				else if (p1char.length === 1) {
					p1charMov = p1char[0];
					p1char.splice(0, 1);
					skunk = skunkL[2];
					//pop skunk to the east div (second)
					skunkDone = eastDiv.image("resources/skunk.svg", 15, eastDiv.height-(2*cellh), cellw, cellh);
					charEndCheck = true;
					endSound();
					//console.log(`third char activated`);
				}
				//p1char end
				else if (p1char.length === 0) {
					p1Mov = false;
					p2Mov = false;
					//pop skunk to the east div (highest)
					skunkDone = eastDiv.image("resources/skunk.svg", 15, eastDiv.height-(3*cellh), cellw, cellh);
					charEndCheck = true;
					winSound();

					//draw image: player 1 wins
					paper.image("resources/p1wins.svg", 0, 0, paperX, paperY);
					//play again button -> location.reload()
					var newX = paperX/2-(paperX/4)/2;
					var newY = 1.7*(paperY/2-(paperY/7));
					var playAgain = paper.image("resources/playAgain.png", newX, newY, paperX/4, paperY/7).attr({'cursor': 'pointer'});
					
					p1SPSGStat.innerHTML = '';
					p2SPSGStat.innerHTML = '';
					playAgain.node.addEventListener('click', function() {
						location.reload();
					});
					
					//console.log(`p1 done`);
				};
			};
 
		};

	};

	var checkOverlapP1 = function() {
		//console.log(`in checkoverlap func`);

		//check if p1char is on top of another p1char: turn back to url('skunk.svg')
		if (p1char.length !== 0 && p1char[0].xy === p1charMov.xy) {
			p1overlaps.push(paper.image("resources/skunk.svg", p1charMov.cellx, p1charMov.celly, cellw, cellh));
			skunk.remove();
			//console.log(p1overlaps);
			//console.log(`same p1 check`);
		}
		else if (p1char.length === 2 && p1char[1].xy === p1charMov.xy) {
			p1overlaps.push(paper.image("resources/skunk.svg", p1charMov.cellx, p1charMov.celly, cellw, cellh));
			skunk.remove();
			//console.log(p1overlaps);
			//console.log(`same p1 check`);
		}
		else {
			skunk.remove();
			//console.log(`clear check 2`);
		};

	};

	
	if (p1Mov === true) {

		switch(ev.key){

			//up
			case 'w':
				if (p1charMov.walls[0].attrs['stroke'] === '#706E55') {
					
					checkOverlapP1();
					p1charMov = grid[index(p1charMov.x, p1charMov.y-1)];
					p1charMov.skunkF();
					checkp1fin();
					checkCharMovs();

				};
			break;

			//down
			case 's': 
				if (p1charMov.walls[1].attrs['stroke'] === '#706E55') {
					
					checkOverlapP1();
					p1charMov = grid[index(p1charMov.x, p1charMov.y+1)];
					p1charMov.skunkF();		
					checkp1fin();
					checkCharMovs();

				};
			break;

			//left
			case 'a': 
				if (p1charMov.walls[2].attrs['stroke'] === '#706E55') {
					
					checkOverlapP1();
					p1charMov = grid[index(p1charMov.x-1, p1charMov.y)];
					p1charMov.skunkF();
					checkp1fin();
					checkCharMovs();

				};
			break;

			//right
			case 'd': 
				if (p1charMov.walls[3].attrs['stroke'] === '#706E55') {
					
					checkOverlapP1();
					p1charMov = grid[index(p1charMov.x+1, p1charMov.y)];
					p1charMov.skunkF();
					checkp1fin();
					checkCharMovs();

				};
			break;

		};

	};

};


var movep2char = function(ev) {
	//console.log(`in keydown func, ${ev.key}`);

	//if p2char is at end, then turn char blue (and animate character into p2div?)
	var checkp2fin = function() {
		//console.log('in checkp2fin func');
	
		var charEndCheck = false;

		for (i = 0; i < firstCol.length && charEndCheck === false; i++) {

			if (firstCol[i].xy === p2charMov.xy) {
				flyingsq.remove();
				
				for (i = 0; i < p2overlaps.length; i++) {
					p2overlaps[i].remove();
				};

				//if p1char[0] finished, p1charMov = p1char[1], then splice off
				if (p2char.length === 2) {
					p2charMov = p2char[0];
					p2char.splice(0, 1);
					flyingsq = flyingsqL[1];
					//pop flyingsq to the west div (lowest)
					flyingsqDone = westDiv.image("resources/flyingsq.svg", 15, eastDiv.height-cellh, cellw, cellh);
					charEndCheck = true;
					endSound();
					//console.log(`second char activated`);
				}

				else if (p2char.length === 1) {
					p2charMov = p2char[0];
					p2char.splice(0, 1);
					flyingsq = flyingsqL[2];
					//pop flyingsq to the west div (lowest)
					flyingsqDone = westDiv.image("resources/flyingsq.svg", 15, eastDiv.height-(2*cellh), cellw, cellh);
					charEndCheck = true;
					endSound();
					//console.log(`third char activated`);
				}
				//p1char end
				else if (p2char.length === 0) {
					p2Mov = false;
					p1Mov = false;
					//pop flyingsq to the west div (lowest)
					flyingsqDone = westDiv.image("resources/flyingsq.svg", 15, eastDiv.height-(3*cellh), cellw, cellh);
					charEndCheck = true;
					winSound();

					//draw image: player 1 wins
					paper.image("resources/p2wins.svg", 0, 0, paperX, paperY);
					//play again button -> location.reload()
					var newX = paperX/2-(paperX/4)/2;
					var newY = 1.7*(paperY/2-(paperY/7));
					var playAgain = paper.image("resources/playAgain.png", newX, newY, paperX/4, paperY/7).attr({'cursor': 'pointer'});

					p1SPSGStat.innerHTML = '';
					p2SPSGStat.innerHTML = '';
					playAgain.node.addEventListener('click', function() {
						location.reload();
					});
					
					//console.log(`p2 done`);
				};
			};
 
		};

	};

	var checkOverlapP2 = function() {
		//console.log(`in checkoverlap func`);

		//check if p2char is on top of another p2char: turn back to url('flyingsq.svg')
		if (p2char.length !== 0 && p2char[0].xy === p2charMov.xy) {
			p2overlaps.push(paper.image("resources/flyingsq.svg", p2charMov.cellx, p2charMov.celly, cellw, cellh));
			flyingsq.remove();
			//console.log(`same p2 check`);
		}
		else if (p2char.length === 2 && p2char[1].xy === p2charMov.xy) {
			p2overlaps.push(paper.image("resources/flyingsq.svg", p2charMov.cellx, p2charMov.celly, cellw, cellh));
			flyingsq.remove();
			//console.log(`same p2 check`);
		}
		else {
			flyingsq.remove();
			//console.log(`clear check`);
		};

	};

	
	if (p2Mov === true) {

		switch(ev.key){

			//up
			case 'i':
				if (p2charMov.walls[0].attrs['stroke'] === '#706E55') {
					
					checkOverlapP2();
					p2charMov = grid[index(p2charMov.x, p2charMov.y-1)];
					p2charMov.flyingsqF();
					checkp2fin();
					checkCharMovs();

				};
			break;

			//down
			case 'k': 
				if (p2charMov.walls[1].attrs['stroke'] === '#706E55') {
					
					checkOverlapP2();
					p2charMov = grid[index(p2charMov.x, p2charMov.y+1)];
					p2charMov.flyingsqF();		
					checkp2fin();
					checkCharMovs();

				};
			break;

			//left
			case 'j': 
				if (p2charMov.walls[2].attrs['stroke'] === '#706E55') {
					
					checkOverlapP2();
					p2charMov = grid[index(p2charMov.x-1, p2charMov.y)];
					p2charMov.flyingsqF();
					checkp2fin();
					checkCharMovs();

				};
			break;

			//right
			case 'l': 
				if (p2charMov.walls[3].attrs['stroke'] === '#706E55') {
					
					checkOverlapP2();
					p2charMov = grid[index(p2charMov.x+1, p2charMov.y)];
					p2charMov.flyingsqF();
					checkp2fin();
					checkCharMovs();

				};
			break;

		};

	};

};

var spsgInfoPic
var againPicL = [];
var p1chose, p2chose;
var p1choice, p2choice;


//check if p2charMov and p1charMov is on top of one another
var checkCharMovs = function() {

	if (p1charMov.xy === p2charMov.xy) {
		//console.log(`in same grid`)
		p2Mov = false;
		p1Mov = false;
		p1chose = false;
		p2chose = false;

		collideSound();
		//launch info image for the SPSG
		spsgInfoPic = paper.image("resources/spsgInfoPic.svg", 0, 0, paperX, paperY);
		window.addEventListener('keydown', choosing);	
	};

};

var p1SPSGChoiceStat = document.getElementById('p1SPSGChoiceStat');
var p1SPSGStat = document.getElementById('p1SPSGStat');
var p1divCharStat = document.getElementById('p1divCharStat');

var p2SPSGChoiceStat = document.getElementById('p2SPSGChoiceStat');
var p2SPSGStat = document.getElementById('p2SPSGStat');
var p2divCharStat = document.getElementById('p2divCharStat');

//keydown functions for players to choose scissor/paper/stone
//a or j: scissor
//s or k: paper
//d or l: stone
var choosing = function(ev) {

	if (p1chose === false) {

		switch(ev.key){

			//scissor
			case 'a': 
				p1choice = "scissor";
				p1chose = true;
				chose();
				choseSound();
				console.log(`p1: scissor`);
			break;

			//paper
			case 's': 
				p1choice = "paper";
				p1chose = true;
				chose();
				choseSound();
				console.log(`p1: paper`);
			break;

			//stone
			case 'd': 
				p1choice = "stone";
				p1chose = true;
				chose();
				choseSound();
				console.log(`p1: stone`);
			break;

		};

	};

	if (p2chose === false) {

		switch(ev.key){

			//scissor
			case 'j': 
				p2choice = "scissor";
				p2chose = true;
				chose();
				choseSound();
				console.log(`p2: scissor`);
			break;

			//paper
			case 'k': 
				p2choice = "paper";
				p2chose = true;
				chose();
				choseSound();
				console.log(`p2: paper`);
			break;

			//stone
			case 'l': 
				p2choice = "stone";
				p2chose = true;
				chose();
				choseSound();
				console.log(`p2: stone`);
			break;

		};

	};

};

var chose = function() {

	if (p1chose === true && p2chose === true) {
		console.log(`p1 and p2 chose`);
		console.log(p1choice, p2choice);

		//a and j; s and k; d and l = SPSG restarts
		if (p1choice === p2choice) {
			console.log(`same choice made`);

			//img to ask players to choose again
			againPicL.push(paper.image("resources/againPic.svg", 0, 0, paperX, paperY));

			//spsgame restarts
			p1chose = false;
			p2chose = false;
			againSound();

			window.addEventListener('keydown', choosing);

		}

		//a and k; s and l; d and j = p1 wins and cont where it was at; p2 loses and sent back; remove SPSGInfo 
		else if ((p1choice === "scissor" && p2choice === "paper") ||
			(p1choice === "paper" && p2choice === "stone") ||
			(p1choice === "stone" && p2choice === "scissor")) {
			//console.log(`p1 wins`);

			// change inner html in p1div and p2div to indicate who won
			p1SPSGStat.innerHTML = 'you won the battle! <br> carry on'
			p2SPSGStat.innerHTML = 'you lost the battle and got flunk back to where you started ):'

			//remove spsgIngoPic or againPic
			spsgInfoPic.remove();
			
			for (i = 0; i < againPicL.length; i++) {
				againPicL[i].remove();
			};

			skunk.remove();
			flyingsq.remove();

			//allocate p2 to new random spot
			p2charMov = p2charGridSet1[Math.floor(Math.random()*rows/3)];
			p2charMov.flyingsqF();
			p1charMov.skunkF();

			//let players move again
			p1Mov = true;
			p2Mov = true;
			
		}
			
		//a and l; s and j; d and k = p2 wins cont where it was at; p1 loses and sent back; remove SPSGInfo
		else if ((p1choice === "paper" && p2choice === "scissor") ||
			(p1choice === "stone" && p2choice === "paper") ||
			(p1choice === "scissor" && p2choice === "stone")) {
			//console.log(`p2 wins`);

			// change inner html in p1div and p2div to indicate who won
			p2SPSGStat.innerHTML = 'you won the battle! <br> carry on'
			p1SPSGStat.innerHTML = 'you lost the battle and got flunk back to where you started ):'

			//remove spsgIngoPic or againPic
			spsgInfoPic.remove();
			
			for (i = 0; i < againPicL.length; i++) {
				againPicL[i].remove();
			};

			skunk.remove();
			flyingsq.remove();

			//allocate p1 to new random spot
			p1charMov = p1charGridSet1[Math.floor(Math.random()*rows/3)];
			p1charMov.skunkF();
			p2charMov.flyingsqF();
		
			//let players move again
			p2Mov = true;
			p1Mov = true;

		};		

	};

};


var endSound = function() {
	var endS = new Audio ("resources/chime_up.wav")
    endS.currentTime = 0
    endS.play()
};

var winSound = function() {
	var winS = new Audio ("resources/jingle_bells_x.wav")
    winS.currentTime = 0
    winS.play()
};

var collideSound = function() {
	var collideS = new Audio ("resources/toot_x.wav")
    collideS.currentTime = 0
    collideS.play()
};

var choseSound = function() {
	var choseS = new Audio ("resources/chime_down.wav")
    choseS.currentTime = 0
    choseS.play()
};

var againSound = function() {
	var againS = new Audio ("resources/boing2.wav")
    againS.currentTime = 0
    againS.play()
};

//sound credits: https://www.wavsource.com/sfx/sfx.htm
//character svg credits: https://www.flaticon.com/authors/freepik




















