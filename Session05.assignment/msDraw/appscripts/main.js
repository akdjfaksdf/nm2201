
console.log("yo, I'm alive!");

var paper = new Raphael(document.getElementById("mySVGCanvas"));
var pWidth = paper.canvas.clientWidth;
var pHeight = paper.canvas.clientHeight;
console.log("pWidth is " + pWidth + ", and pHeight is " + pHeight);
// var prect = paper.rect(0,0, pWidth, pHeight);

let raphaelPath;
let pathString = "M "+pWidth/2+","+pHeight/2;


// lines drawing
// lines drawing
// lines drawing

var startPoint = 0;
var line = 0

var started = 0

window.addEventListener('click', function(ev){

	//the first point
	if (started == 0) {
		startPoint = `${ev.offsetX}, ${ev.offsetY}`;
		started = 1;
		console.log(`start point ${startPoint}`);
	}

	//following points and lines
	if (started == 1) {
		// line from starting point to click -- start
		// line from last point to click
		line = paper.path(`M ${startPoint} L ${ev.offsetX}, ${ev.offsetY}`).attr({
			'stroke-width': 2,
			'stroke': '#7C3837'
		})

		console.log(`current line path: m ${startPoint} l ${ev.offsetX}, ${ev.offsetY}`)

		// new start point for next click
		startPoint = `${ev.offsetX}, ${ev.offsetY}`
		console.log(`startPoint for next click ${startPoint}`);
	}	

	// more clearing for clear button
	if (started == 2) {
		startPoint = 0;
		line = 0;
		started = 0;
	}

});


// clear button
// clear button
// clear button

butt.addEventListener('click', function(ev){
	paper.clear();
	started = 2
});

























