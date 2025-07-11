
//console.log("yo, I'm alive!");
let paper = new Raphael(document.getElementById("centerDiv"));
// Find get paper dimensions
let dimX = paper.width;
let dimY = paper.height;
// Just create a nice black background
var bgRect = paper.rect(0,0,dimX, dimY);
bgRect.attr({"fill": "black"});

///distance calculator
/*where x1y1: coordinate of circle
		y1y2: coordinate of mouse pushed
		within what distance does circle turn white: euquarian distance? Math.sqrt is the formula for it
*/
let distance = function(x1,y1,x2,y2){
    let diffX = x2-x1;
    let diffY = y2-y1;
    return Math.sqrt(diffX*diffX + diffY*diffY)
}
// console.log(distance(2,2,3,4));

var scaling = function(smallValue){
    rMax = 350;
    rMin = 50;

    //y is sin function range
    var yMax = 1;
    var yMin = 0;

    var percent = (smallValue - yMin) / (yMax - yMin);
    scaleV = percent * (rMax - rMin) + rMin;
    //return a value between 0 and 255
    //console.log(scaleV);
    return scaleV;
};

var imaginCircleList = [];
for(i = 0;i<100;i++)
{
    imaginCircleList[i]= { 
    xCoord: dimX/2,
    yCoord: dimY/2,
    radius: 20,
    colour: 'red'};
}

//create an object with all the properties of the dot.
//create real circles using a for loop on a list
//repetition, can use for loops
var clickCount = 0;


var circleList = [];
for(i=0;i<100;i++)
{
       circleList[i] = paper.circle(imaginCircleList[i].xCoord,imaginCircleList[i].yCoord,imaginCircleList[i].radius);
   circleList[i].colorString = `rgb(${Math.floor(256*Math.random())}, ${Math.floor(256*Math.random())}, ${Math.floor(256*Math.random())})`;
   console.log(circleList[i].colorString);
   circleList[i].attr({
            fill: circleList[i].colorString,
    });
   circleList[i].node.oddClick =0; //based on what we discussed last week
   circleList[i].xRate = Math.floor(100*Math.random()-50); 
   circleList[i].yRate = Math.floor(100*Math.random()-50);
   circleList[i].node.addEventListener("click",function(ev){
        clickCount ++;
   });
}

// var endX = dimX-circleList[i].getBBox().cx;
// var endY = dimY-circleList[i].getBBox().cy;

//circle mover
var circleMover = function(){
    for(i =0;i<100;i++)
    {
        var newX = circleList[i].getBBox().cx + circleList[i].xRate;
        var newY = circleList[i].getBBox().cy + circleList[i].yRate;
        //if dot touches the xlimit, change direction
        if(newX>=dimX)
        {
            circleList[i].xRate = -circleList[i].xRate;
            newX = circleList[i].getBBox().cx + circleList[i].xRate;
        }
        if(newY>=dimY)
        {
            circleList[i].yRate = -circleList[i].yRate;
            newY = circleList[i].getBBox().cy + circleList[i].yRate;
        }
        if(newX<=50)
        {
            circleList[i].xRate = -circleList[i].xRate;
            newX = circleList[i].getBBox().cx + circleList[i].xRate;
        }
        if(newY<=50)
        {
            circleList[i].yRate = -circleList[i].yRate;
            newY = circleList[i].getBBox().cy + circleList[i].yRate;
        }
        circleList[i].attr({"cx":newX , "cy":newY})
    }

    //after ten seconds animation should stop

    if(Date.now() - timeStart >=10000)
    {
        clearInterval(timer);
        //during ten seconds, clicks on the dot should be counted
       
        window.alert(`your score is ${clickCount}`);
    }


};
// start the animation
var timer;
var timeStart = 0;

timer = setInterval(circleMover, 30);
timeStart = Date.now();
console.log(`game started at ${timeStart}`);

//part 3 and 4
//part 3 and 4
//part 3 and 4

//mouse state
var mouseState = {};
//check whether mouse is down
mouseState.pushed = 0;
//check where mouse is at any point of time
mouseState.X = 0;
mouseState.Y = 0;

//event listeners
document.getElementById('centerDiv').addEventListener('mousedown', function(ev){
	
	mouseState.pushed = 1;
	console.log(`mouse is down; mouseState.pushed is ${mouseState.pushed}`);

	for(i = 0; i < 100; i++){
		//check distance between centre of cicleList[i] and mouseState X and mouseStateY
		console.log(circleList[i].attrs.cx, circleList[i].attrs.cy);
		console.log(mouseState.X, mouseState.Y);
		var dist = distance(circleList[i].attrs.cx, circleList[i].attrs.cy, mouseState.X, mouseState.Y);

		//if less than 100, then change fill to white using attr, else nothing
		if (dist<100) {
			circleList[i].attr({'fill': 'white'});
		};

	}
});
document.getElementById('centerDiv').addEventListener('mouseup', function(ev){
	mouseState.pushed = 0;
	console.log(`mouse is up; mouseState.pushed is ${mouseState.pushed}`);

	for(i = 0; i < 100; i++){
		if (circleList[i].attrs.fill === 'white') {
			
			circleList[i].attr({'fill': circleList[i].colorString})
		}

	}
});
document.getElementById('centerDiv').addEventListener('mousemove', function(ev){
	mouseState.X = ev.offsetX;
	mouseState.Y = ev.offsetY;
	console.log(mouseState);
});







