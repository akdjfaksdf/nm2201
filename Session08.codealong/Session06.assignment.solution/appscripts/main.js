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
//                CREATE NEW OBJECT ON CLICK
//----------------------------------------------------------

var circleRadius = 12;

prect.node.addEventListener('click', function(ev){
	drawCircle(ev, circleRadius);

});

// Task 2.2 slider on aside panel
//  first add slider to index.html with id="slider1"
// HTML range slider to set size of circles to draw when we click
var slider1 = document.getElementById("slider1");

slider1.addEventListener('input', function(ev){
	circleRadius = 2 + 20*slider1.value; 
});

// HTML button to clear canvas of (some) drawings
var clearButton=document.getElementById("clearButton"); 

clearButton.addEventListener('click', function(ev){
	paper.clear();
	//paper.put(prect);
	//paper.put(circle);
});


// simply draws a circle using the arguments
//note that it takes in one object and one number
function drawCircle(ev, circleRadius)
{
			var colorObject = {};
			circ = paper.circle(ev.offsetX, ev.offsetY, circleRadius);
			var originalHue = ev.offsetX;
			var originalSat = ev.offsetY;
			var originalL = lightSlider.value;
			//console.log(originalHue);

			colorObject.hue = map(originalHue,0,pWidth,0,360);
			colorObject.saturation = map(originalSat,0,pHeight,0,100);
			colorObject.lightness = map(originalL,0,1,0,100);
			hslStringg = hslString(colorObject);
			circ.attr({"fill":hslStringg});
}

//----------------------------------------------------------
//                  Session06 assignment starts here
//----------------------------------------------------------



// Part 1 View
//----------------------------------------------------------
//                Add event listeners for new slider and button
//----------------------------------------------------------

var whiteButton=document.getElementById("whiteButton"); 

whiteButton.addEventListener('click', function(ev){
			changeColor();
	//paper.put(prect);
	//paper.put(circle);
});

lightSlider = document.getElementById("lightSlider");




// Part 2 Model and Controller
//----------------------------------------------------------
//                changeColor function
//                First, define the variables we need
//                Then, it will call the map function three times,
 //               and then finally call the hslString function one time.
//----------------------------------------------------------


function changeColor(){

	var circleList = document.getElementsByTagName("circle");
	//console.log(circleList);
	for(i in circleList){
		
		//if(circleList[i].attributes!=null)
		//{
			
			circleList[i].style.fill= "white";

		//}
	}

}

// Part 3 Controller
//----------------------------------------------------------------------------------------------
//               No changes to the map function, but call it in the changeColor function. 
//               Map values into the correct range according to the provided arguments
//               Returns one number
//----------------------------------------------------------------------------------------------

// maps x in  the interval [a,b] into the interval [m, n]
function map(x, a, b, m, n){
    var range = n-m;
    // x is 'proportion' of the way from a to b
    // e.g. if a=10, b=20, and x=15, x is half (.5) of the way from a to b
    var proportion = (x-a)/(b-a); 
    var finalMappedValue = Math.floor(m + proportion*range);

    return (finalMappedValue);
}



//----------------------------------------------------------------------------------------------------------
//                Change the HSL function so that it takes in one argument.
//                Set h,s, and l according to the hue, saturation, lightness properties of the 
//                input argument
//                Returns one string
//----------------------------------------------------------------------------------------------------------


function hslString(colorValue){
	var h = colorValue.hue;
	var s = colorValue.saturation;
	var l = colorValue.lightness;
	var input = "hsl(" + h.toString() + "," + s.toString()  +"," + l.toString() + ")";
	console.log("hsl(" + h.toString() + "," + s.toString() +"," + l.toString() + ")");
	return input;
	
}



// 














