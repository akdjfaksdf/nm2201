//LEGAL DISCLAIMER adapted from Wikipedia's policy
//This work includes material that may be protected as a trademark in some jurisdictions. 
//If you want to use it, you have to ensure that you have the legal right to do so and that you 
//do not infringe any trademark rights. 
//Any of the trademarks, service marks, collective marks, design rights, personality rights or similar rights 
//that are mentioned, used or cited in this coding assignment are the property of their respective owners. 
//Their use here does not imply that you may use them for any other purpose other than for the same or a 
//similar informational and private use. Unless otherwise stated, the instructor is
// neither endorsed nor affiliated with any of the holders of any such rights and as such the instructor
 // can not grant any rights to use any otherwise protected materials.
 //Your use of any such or similar incorporeal property is at your own risk.


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
//xrate = 0.8;   // ball bounced per second in the x dimension
//yrate = 0.8;   // ball bounces per second in the y dimension

// Create a dot at the center of the paper
// let dot = paper.circle(dimX/2, dimY/2, 20);

// // give it some attributes
// dot.attr({
//         "stroke": "#444444",
//         "stroke-width": 2,
//         "fill" : "#CCAAFF"        // must be filled to get mouse clicks        
// });

var dot0 = paper.image("resources/angry.PNG",dimX/2-25,dimY/2-25,50,50);
var dot1 = paper.image("resources/angry.PNG",dimX/2-25,dimY/2-25,50,50);
var dot2 = paper.image("resources/angry.PNG",dimX/2-25,dimY/2-25,50,50);
var dot3 = paper.image("resources/angry.PNG",dimX/2-25,dimY/2-25,50,50);

var originalSpotDiag = "M "+ dimX/2 + "," + dimY/2;
var originalSpotSine = "M "+ dimX/2 + "," + dimY/2;
console.log(originalSpotSine);
var originalSpotCos = "M "+ dimX/2 + "," + dimY/2;
var originalSpotWave = "M "+ dimX/2 + "," + dimY/2;

console.log(originalSpotDiag);
var lineDiag = paper.path(originalSpotDiag);
var lineSine = paper.path(originalSpotSine);
var lineCos = paper.path(originalSpotCos);
var lineWave = paper.path(originalSpotWave);


lineDiag.attr(
	{
		"stroke": "black",
		"stroke-width": 5

	}	
	);


lineSine.attr(
	{
		"stroke": "red",
		"stroke-width": 5

	}	
	);


lineCos.attr(
	{
		"stroke": "green",
		"stroke-width": 5

	}	
	);

lineWave.attr(
	{
		"stroke": "purple",
		"stroke-width": 5

	}	
	);



//function for diagonal line
let drawDiag = function(){
        time += frameLength;

        //console.log("sa is " + sa);
        let px = dot0.getBBox().x + 5;
        let py = dot0.getBBox().y + 5;

        originalSpotDiag += " L "+dot0.getBBox().x+","+dot0.getBBox().y;
        console.log(originalSpotDiag);
        lineDiag.attr({"path":originalSpotDiag});
        dot0.attr({ x : px,y:py});
        console.log("diagLine: x is" + dot0.getBBox().x + " and y is " + dot0.getBBox().y);
        }

// function that does the for sine, called at the framerate 
let drawSine = function(){
        time += frameLength;
        let a = time*2*Math.PI/(1000);
        let sa = Math.sin(a);
        //console.log("sa is " + sa);
        let px = map(sa, -1, 1, 0, dimX-50);
        originalSpotSine += " L "+dot1.getBBox().x+","+dot1.getBBox().y;
        lineSine.attr({"path":originalSpotSine});
        dot1.attr({ x : px});
        console.log("Sine wave: x is" + dot1.getBBox().x + " and y is " + dot1.getBBox().y);
        }

// function that does the for sine, called at the framerate 

let drawCos = function(){
        time += frameLength;
        let a = time*2*Math.PI/(1000);
        let sa = Math.cos(a);
        //console.log("sa is " + sa);
        let py = map(sa, -1, 1, 0, dimY-50);
        originalSpotCos += " L "+dot2.getBBox().x+","+dot2.getBBox().y;
        lineCos.attr({"path":originalSpotCos});
        dot2.attr({ y : py});
        console.log("Cos wave: x is" +  dot2.getBBox().x + " and y is " + py);
}

//function that does both

let drawWave = function(){
        time += frameLength;
        let a = time*2*Math.PI/(1000);
        let sa = Math.sin(a);
        //console.log("sa is " + sa);
        let newX = dot3.getBBox().x + 5;
        if(newX>=dimX-50)
        {
        	newX = 5;
        }
        let py = map(sa, -1, 1, 0, dimY-50);
        dot3.attr({ x : newX, y : py});
       
       	originalSpotWave += " L "+dot3.getBBox().x+","+dot3.getBBox().y;
        lineWave.attr({"path":originalSpotWave});

        console.log("Full wave: x is" +  dot3.getBBox().x + " and y is " + py);
}



//explore step by step movements
var path0 = document.getElementById("diagLine");
path0.addEventListener("click",function(ev){
	drawDiag();
});

var path1 = document.getElementById("waveSine");
path1.addEventListener("click",function(ev){
	drawSine();
});

var path2 = document.getElementById("waveCos");
path2.addEventListener("click",function(ev){
	drawCos();
});

var path3 = document.getElementById("waveBoth");
path3.addEventListener("click",function(ev){
	drawWave();
	
	// start the animation

	//Comment out drawWave() and Uncomment next line to see the wave
	//setInterval(drawWave,frameLength);

});


