
console.log("yo, I'm alive!");

let paper = new Raphael(document.getElementById("mySVGCanvas"));
// Find get paper dimensions
let dimX = paper.width;
let dimY = paper.height;

// maps x in  the interval [a,b] into the interval [m, n]
let map =function (x, a, b, m, n){
    let range = n-m;
    // x is 'proportion' of the way from a to b
    // e.g. if a=10, b=20, and x=15, x is half (.5) of the way from a to b
    let proportion = (x-a)/(b-a); 
    return (m + proportion*range);
}

//--------------------------------
// variables for controlling frame rate and speed of animated object
let frameLength=10; // in ms, used for the interval at which we call the draw() function
let time = 0;      // time since the page was loaded into the browser; incremented in draw()
//**^what is this for??????
xrate = 5;   // ball bounced per second in the x dimension
yrate = 5;   // ball bounces per second in the y dimension

// Create a dot at the center of the paper
let dot = paper.circle(dimX/2, dimY/2, 20);

// give it some attributes
dot.attr({
        "stroke": "#444444",
        "stroke-width": 2,
        "fill" : "#CCAAFF"        // must be filled to get mouse clicks        
});


// function that does the animation, called at the framerate 
let draw = function(){
        var newX = dot.getBBox().cx+xrate;
        var newY = dot.getBBox().cy+yrate;
        if(newX>dimX)
        {
            xrate = -xrate;
            newX = dot.getBBox().cx+xrate;
        
        }
        if(newY>dimY)
        {
            yrate = -yrate;
            newY = dot.getBBox().cy+yrate;
        }
        if(newX<0)
        {
            xrate = -xrate
            newX = dot.getBBox().cx+xrate;
        }
        if(newY<0)
        {
            yrate = -yrate;
            newY = dot.getBBox().cy+yrate;
        }
        dot.attr({"cx": newX, "cy": newY});

        if(Date.now() - time > 10000) {
            clearInterval(animatedthing)
            console.log('end')
        }
}

//to store time (she set a new var?? timeStart)
//var timeStart = 0
var timer;

// start the animation
document.getElementById("startButt").addEventListener("click",function(ev){
   // draw();
   time = Date.now();
   console.log(`Time now is ${time}`);
   animatedthing = setInterval(draw,frameLength); //calls the draw function for frameLength ms
   

});























