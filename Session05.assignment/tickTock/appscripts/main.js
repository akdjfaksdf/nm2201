
console.log("yo, I'm alive!");

var paper = new Raphael(document.getElementById("mySVGCanvas"));
paper.put=function(gobj){paper.canvas.appendChild(gobj.node)}

// Find get paper dimensions
var dimX = paper.canvas.clientWidth;
var dimY = paper.canvas.clientHeight;


// set tick and tock locations
// Draw tick/tock text

var tick = paper.text(dimX/4, 50, 'tick').attr({
	'font-family': 'avenir',
	'font-size': 20,
	'font-weight': 'bold',
	fill: '#1D2E3E'
});

var tock = paper.text(3*dimX/4, 50, 'tock').attr({
	'font-family': 'avenir',
	'font-size': 20,
	'font-weight': 'bold',
	fill: '#1D2E3E'
});


//--------------------------------------------------
// function to draw needle pointing to a location
// Create the needle

var needle = paper.path(`m ${dimX/2}, ${dimY/2} l -140, -120`).attr({
	"stroke-width": 2
});


// Create a variable to keep track of the state of the needle
needle.atTick = true


// switch state of needle on click
window.addEventListener('click', function(ev){
	paper.clear();
	paper.put(tick);
	paper.put(tock);

	if (needle.atTick == true) {
		needle = paper.path(`m ${dimX/2}, ${dimY/2} l 140, -120`).attr({
			"stroke-width": 2
		});
		needle.atTick = false;

	} else {
		needle = paper.path(`m ${dimX/2}, ${dimY/2} l -140, -120`).attr({
			"stroke-width": 2
		});
		needle.atTick = true;

	};
});












