
//console.log("yo, I'm alive!");

var paper = new Raphael(document.getElementById("mySVGCanvas"));
// Find get paper dimensions
var dimX = paper.canvas.clientWidth;
var dimY = paper.canvas.clientHeight;

//set origin
x0 = dimX/2;
y0 = dimY/2;

// set tick and tock locations
x1 = dimX/4;
y1 = dimY/4;

x2 = 3*dimX/4;
y2 = dimY/4;

//Draw tick/tock text
paper.text(x1, y1-25, 'Tick').attr({
    'font-size': '32px'});
paper.text(x2, y2-25, 'Tock').attr({
    'font-size': '32px'});
 // Create the needle
var needle = paper.path("M " + x0 + "," + y0 + "  L " + x1 + "," + y1);

//--------------------------------------------------
// function to draw needle pointing to a location

var drawNeedle=function(a0,b0,a1,b1){
    newLocation =  "M " + a0 + "," + b0 + " L " + a1 + "," + b1;
    console.log(newLocation);
    needle.attr({"path":newLocation});
    
  
}

var tickerFun = function()
{
       // console.log("click on the canvas" );
    if (metState == "tick"){
        metState="tock";
        drawNeedle(x0,y0,x2,y2);
    } else {
        metState="tick";
        drawNeedle(x0,y0,x1,y1);

    }

}
// Create a variable to keep track of the state of the needle
var metState = "tick"; // will be either "tick" or "tock

// switch state on click
// document.getElementById("mySVGCanvas").addEventListener('click', function(ev){
//     tickerFun();
// });

var frameLength = 1000
var tickTimer = setInterval(tickerFun, frameLength);

document.getElementById("stopButt").addEventListener("click", function(ev){
    clearInterval(tickTimer);
});


















