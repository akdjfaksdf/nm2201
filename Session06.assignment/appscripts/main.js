console.log("Yo, I am alive!");

// Grab the div where we will put our Raphael paper
var centerDiv = document.getElementById("centerDiv");

// Create the Raphael paper that we will use for drawing and creating graphical objects
var paper = new Raphael(centerDiv);
// A "convenience" method for putting graphical objects back on a paper after they have been removed or "cleared"
paper.put=function(gobj){paper.canvas.appendChild(gobj.node)}

// put the width and heigth of the canvas into variables for our own convenience
var pWidth = paper.canvas.clientWidth;
var pHeight = paper.canvas.clientHeight;
console.log("pWidth is " + pWidth + ", and pHeight is " + pHeight);


//  get a rectangle equal to the size of the paper to raw on

// Create rectangle to fill the paper to use as a background 
var prect = paper.rect(0,0, pWidth, pHeight);
prect.attr({"fill": "#F1ECD6"}); 


// Draw circles where mouse is clicked
//----------------------------------------------------------
// CREATE NEW OBJECT ON CLICK
//----------------------------------------------------------

var circleRadius = 12;

prect.node.addEventListener('click', function(ev){
	drawCircle(ev, circleRadius);

});

// Task 2.2 slider on aside panel
//  first add slider to index.html with id="slider1"
// HTML range slider to set size of circles to draw when we click
var radiusSlider = document.getElementById("slider1");

radiusSlider.addEventListener('input', function(ev){
	circleRadius = 2 + 20*slider1.value; 
});

// HTML button to clear canvas of (some) drawings
var clearButton=document.getElementById("clearButton"); 

clearButton.addEventListener('click', function(ev){
	paper.clear();
	paper.put(prect);
	paper.put(circle);
});



//----------------------------------------------------------
// Session06 assignment starts here
//----------------------------------------------------------



// Part 1 
//----------------------------------------------------------
// Add event listeners for the new slider and button 
// (??button??)
//----------------------------------------------------------


var lightnessSlider = document.getElementById('lightSlider');
var lightnessValue = 50

lightnessSlider.addEventListener('change', function(ev){
	lightnessValue = 100*lightnessSlider.value;
	console.log(lightnessValue);
});

var recolourButt = document.getElementById("whiteButton")

recolourButt.addEventListener('click', function(ev){
	changeColor()
	console.log('butt clicked')
});


// Part 2 and 3 
//-------------------------------------------------------------------------
// First, define the circleColor variable we need
// Then, call the map function three times,
// and then finally call the hslString function one time.
// Finally, set the color of the circle using localCircle.attr();
//--------------------------------------------------------------------------

function drawCircle(ev, circleRadius){
	// simply draws a circle using the arguments
	// note that it takes in one object and one number
	var localCircle = paper.circle(ev.offsetX, ev.offsetY, circleRadius); 

	// First, define the circleColor variable we need
	var circleColor = {
		h: ev.offsetX,
		s: ev.offsetY,
		l: lightnessValue
	};

	// Then, call the map function three times,
	circleColor.h = map(circleColor.h, 0, pWidth, 0 , 359)
	circleColor.s = map(circleColor.s, 0, pHeight, 0 , 100)
	circleColor.l = map(circleColor.l, 0, 100, 0, 100)

	// and then finally call the hslString function one time.
	circleColorFin = hslString(circleColor)

	// Finally, set the color of the circle using localCircle.attr();
	localCircle.attr({
		'fill': circleColorFin
	});

	console.log(circleColorFin);

};

// ---the mapping function---
//---------------------------------------------------------------------------
// No changes to the map function, but you will call it in the drawCircle function. 
// Map one number into the correct range according to the provided arguments
// Returns one number
//-----------------------------------------------------------------------------

// maps x in  the interval [a,b] into the interval [m, n]
function map(x, a, b, m, n){
    var range = n-m;
    // x is 'proportion' of the way from a to b
    // e.g. if a=10, b=20, and x=15, x is half (.5) of the way from a to b
    var proportion = (x-a)/(b-a); 
    var finalMappedValue = Math.floor(m + proportion*range);

    return (finalMappedValue);
};

// ---the hsl string function---
//--------------------------------------------------------------------
// Change the HSL function so that it takes in one argument.
// Set h,s, and l according to the hue, saturation, lightness properties of the input argument
// Returns one string
//---------------------------------------------------------------------

// Change the HSL function so that it takes in one argument.
function hslString(thing){
	var h = thing.h
	var s = thing.s
	var l = thing.l
	var input = "hsl(" + h.toString() + "," + s.toString() + "," + l.toString() + ")";
	console.log("hsl(" + h.toString() + "," + s.toString() + "," + l.toString() + ")");
	return input;
	
};



// Part 4 Model and Controller
//----------------------------------------------------------
// changeColor function
// this function will create a list of circles by using document.getElementsByTagName.
//----------------------------------------------------------


function changeColor(){

	//	First, this function will create a list of circles by using document.getElementsByTagName.
	var circleList = document.getElementsByTagName("circle");
	console.log(circleList);

	//	Now, you can access the fill color of each circle
	for (g = 0; g < circleList.length; g++) {
		var filledValue = circleList[g].style.fill; //use this to GET the color 
		console.log(g); //what is i??
		circleList[g].style.fill = '#536768'; // use this to SET a new fill color
	};

	//for() notes
	//Statement 1 sets a variable before the loop starts (var i = 0).
	//Statement 2 defines the condition for the loop to run (i must be less than 5).
	//Statement 3 increases a value (i++) each time the code block in the loop has been executed.



};













