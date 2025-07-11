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
			p1emptyalert.innerText = 'Give name, please';
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
			p2emptyalert.innerText = 'Give name, please';
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
		drawGrid();
		drawMaze();
		drawCharacters();
	};
}

// on game start
// on game start
// on game start

var paper = new Raphael(document.getElementById('gamearea'));
var paperX = paper.width;
var paperY = paper.height;


//create columns and rows for maze
var cols = 20;
var rows = 18;
var cellw = paperX/cols;
var cellh = paperY/rows;
var grid = [];

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

//list of 3 grids that characters will be drawn
var p1char = [];
var p2char = [];

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
		p2charGridSet1.push(grid[(cols-1)*(cols*y)]);	
	};
	for (y = 1/3*rows; y < 2/3*rows; y++) {
		p2charGridSet2.push(grid[(cols-1)*(cols*y)]);
	};
	for (y = 2/3*rows; y < 3/3*rows; y++) {
		p2charGridSet3.push(grid[(cols-1)*(cols*y)]);
	};

}

//draw maze
var drawMaze = function() {
	//if current is in the cell, cell visited = true, highlight cell purple
	//console.log(`in drawMaze func ${current.x}, ${current.y}`);
	current.visited = true;
	visitedCount ++;
	current.visitedRect.attr({'fill': 'purple'});

	//move current to one random unvisited neighbour if there are
	while (visitedCount < rows*cols) {
		//console.log(`loop works, here is current ${current}`)
	
	 	var next = current.checkNb();
		if (next) {
			next.visited = true;
			visitedCount ++;
			//console.log(`visited count is ${visitedCount}`);
			next.visitedRect.attr({'fill': 'purple'});
			
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

		celldrawn.cellx = celldrawn.x*cellw;
		celldrawn.celly = celldrawn.y*cellh;
		
		//can make wall strokes to png images to make it look fancier
		//up wall
		celldrawn.walls[0] = paper.path(`M ${celldrawn.cellx} ${celldrawn.celly} L ${celldrawn.cellx + cellw} ${celldrawn.celly}`).attr({'stroke-width': 3});
		
		//down wall
		celldrawn.walls[1] = paper.path(`M ${celldrawn.cellx} ${celldrawn.celly + cellh} L ${celldrawn.cellx + cellw} ${celldrawn.celly + cellh}`).attr({'stroke-width': 3});
		//left wall
		celldrawn.walls[2] = paper.path(`M ${celldrawn.cellx} ${celldrawn.celly} L ${celldrawn.cellx} ${celldrawn.celly + cellh}`).attr({'stroke-width': 3});
		//right wall
		celldrawn.walls[3] = paper.path(`M ${celldrawn.cellx + cellw} ${celldrawn.celly} L ${celldrawn.cellx + cellw} ${celldrawn.celly + cellh}`).attr({'stroke-width': 3});

	//to indcate that the cell has been visited by the current var
	celldrawn.visited = false;
	//if visited = true, draw rect and fill purple
	celldrawn.visitedRect = paper.rect(celldrawn.cellx, celldrawn.celly, cellw, cellh).attr({'fill': 'yellow',
		'stroke-width': 0 	
	});

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
		c.walls[0].attr({'stroke-width': 0});
		n.walls[1].attr({'stroke-width': 0});
		//console.log(c, n);
	}
	//if n is below c, remove c.walls[down] and n.walls[up]
	if (ydiff === 1) {
		c.walls[1].attr({'stroke-width': 0});
		n.walls[0].attr({'stroke-width': 0});
		//console.log(c, n);
	}
	//if n is left of c, remove c.walls[left] and n.walls[right]
	if (xdiff === -1) {
		c.walls[2].attr({'stroke-width': 0});
		n.walls[3].attr({'stroke-width': 0});
		//console.log(c, n);
	}
	//if n is right of c, remove c.walls[right] and n.walls[left]
	if (xdiff === 1) {
		c.walls[3].attr({'stroke-width': 0});
		n.walls[2].attr({'stroke-width': 0});
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
	console.log(`in drawCharacters func`);
	
	for (i = 0; i < 3; i++) {

		//allocate random position for p1char
		p1char.push(p1charGridSet1[Math.floor(Math.random()*rows/3)]);
		p1char.push(p1charGridSet2[Math.floor(Math.random()*rows/3)]);
		p1char.push(p1charGridSet3[Math.floor(Math.random()*rows/3)]);

		p1char[i].visitedRect.attr({'fill': 'red'}); //change fill to char image
		//console.log(p1char);

		//event listeners: if no walls then move up down left right
		//move to cell on top 
		window.addEventListener('keydown', test)

	};

};

// //animation testing
// var aah = paper.circle(100, 100, 50).attr({
//         "stroke": "#444444",
//         "stroke-width": 2,
//         "fill" : "#CCAAFF" 
// });;

// console.log(paper.circle(100, 100, 50));

// ahh.node.addEventListener('click', function(ev){
// 	ahh.animate(150, 150, 10);

// });

//animation here isn't working ):
var test = function(ev) {
	console.log(`in keydown func, ${ev.key}`);

	switch(ev.key){
		//up
		case 'w':
			if (p1char[0].walls[0].attrs['stroke-width'] === 0) {
				console.log(p1char[0].cellx, p1char[0].celly-cellw);
				p1char[0].visitedRect.animate(p1char[0].cellx, p1char[0].celly-cellw, 10);
				console.log(p1char[0].visitedRect);
				p1char[0] = grid[index(p1char[0].x, p1char[0].y-1)];
				console.log(p1char[0].visitedRect);
				console.log(`moved up`);
			};
		break;

		//down
		case 's': 
			if (p1char[0].walls[1].attrs['stroke-width'] === 0) {
				p1char[0] = grid[index(p1char[0].x+1, p1char[0].y+1)];
				p1char[0].visitedRect.animate(p1char[0].cellx, p1char[0].celly+cellw, 10);
				console.log(`moved down`);
			};
		break;
		//left
		case 'a': 
			if (p1char[0].walls[2].attrs['stroke-width'] === 0) {
				p1char[0] = grid[index(p1char[0].x-1, p1char[0].y)];
				p1char[0].visitedRect.animate(p1char[0].cellx-cellw, p1char[0].y, 10);
				console.log(`moved left`);
			};
		break;
		//right
		case 'd': 
			if (p1char[0].walls[3].attrs['stroke-width'] === 0) {
				p1char[0] = grid[index(p1char[0].x+1, p1char[0].y)];
				p1char[0].visitedRect.animate(p1char[0].cellx, p1char[0].cellx+cellw, 10);
				console.log(`moved right`);
			};
		break;

	};

};
























