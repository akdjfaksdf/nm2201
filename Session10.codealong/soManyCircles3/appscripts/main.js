
//console.log("yo, I'm alive!");
let paper = new Raphael(document.getElementById("mySVGCanvas"));
// Find get paper dimensions
let dimX = paper.width;
let dimY = paper.height;


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

//scale RGB using the coordinates
var scalingRGB = function(coordValue){
    rMax = 255;
    rMin = 0;

    //range is the range of x and y values
    var dimMax = 350;
    var dimMin = 50;

    var percent = (coordValue - dimMin) / (dimMax - dimMin);
    scaleV = percent * (rMax - rMin) + rMin;
    //return a value between 0 and 255
    //console.log(scaleV);
    return scaleV;
};

//console.log(map(5,1,10,1,100));

//--------------------------------

var imaginCircleList = [];
for(i = 0;i<5;i++)
{
    imaginCircleList[i]= { 
    xCoord: scaling(Math.random()),
    yCoord: scaling(Math.random()),
    radius: Math.floor(50*Math.random()),
    colour: 'red'};
}
//create an object with all the properties of the dot.
//create real circles using a for loop on a list
//repetition, can use for loops
var clickCount = 0;


var circleList = [];
for(i=0;i<5;i++)
{
       circleList[i] = paper.circle(imaginCircleList[i].xCoord,imaginCircleList[i].yCoord,imaginCircleList[i].radius);
   colorString= "rgb("+scalingRGB(imaginCircleList[i].xCoord)+","+ scalingRGB(imaginCircleList[i].yCoord)+",50"+")";
   console.log(colorString);
   circleList[i].attr({
            fill: colorString,
            stroke: "blue",
            "stroke-width": 3
    });
   circleList[i].node.oddClick =0; //based on what we discussed last week
   circleList[i].xRate = 10; 
   circleList[i].yRate = 5;
   circleList[i].node.addEventListener("click",function(ev){
        clickCount ++;
   });
}

// var endX = dimX-circleList[i].getBBox().cx;
// var endY = dimY-circleList[i].getBBox().cy;

//circle mover
var circleMover = function(){
    for(i =0;i<5;i++)
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
// start the animation and stop when want
var timer;
var timeStart = 0;

//how many milliseconds since the page was loaded
// var time = 0;
// var frameRate = 5;



//start button should be pressed to start animation
var startButt = document.getElementById('startGame');
startButt.addEventListener('click', function(ev){
    timer = setInterval(circleMover, 100);
    timeStart = Date.now();
    console.log();
});



//start button
//dot
//timer for animation
//alert window

//variables for the game
var gameDuration = 10*1000;
var timeStart = 0;
var numClicks = 0;

//eventlisteners
var startButt = document.getElementById("startGame");
startButt.addEventListener("click",function(ev){
    //start animation when button is clicked
  circleMover();

});

//add eventlistener to track clicks
//dot.node.addEventListener("click",function(){

//numClicks+=1;

//})