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


//initialize imaginary circles using a for loop on a list
var imaginCircleList = [];
for(i = 0;i<5;i++)
{
    imaginCircleList[i]= { 
    xCoord: scaling(Math.random()),
    yCoord: scaling(Math.random()),
    radius: Math.floor(50*Math.random()),
    colour: 'red'};
}

var paper = new Raphael("centerDiv", 400, 400);
//create real circles using a for loop on a list
//repetition, can use for loops
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
    circleList[i].oddClick =0;
    circleList[i].node.addEventListener("click",function(ev){colorSwitcher(ev)});
}




//use the HTML Collection variable to add click event listeners to each circle

var colorSwitcher = function(ev){
var txt = "";
    tar = ev.target;
    //on first click, each circle should turn white.
    if(tar.oddClick == 0)
    {
            tar.style.fill = "white";
            tar.oddClick = 1;
    }
    else
    {
    //on second click, it should turn red, and so on.
            tar.style.fill = "red";
            tar.oddClick = 0;
    }


 
};


// Week 7
var divOne = document.getElementById("div1");
var forButton = document.getElementById("forButt");

var divText = "";
//add event listener
forButton.addEventListener("click",function(ev){
    circleMover();
});


//give them properties
//give them different colors
//add event listeners 
//change event listener for for loop button
