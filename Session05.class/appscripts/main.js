// Code and Draw (review)

console.log("Yo, I am alive!");

// Grab the div where we will put our Raphael paper
var centerDiv = document.getElementById("centerDiv");

// Create the Raphael paper that we will use for drawing and creating graphical objects
var paper = new Raphael(centerDiv);
// paper.put(raphObj) - puts Raphel elements back ona paper after it has been paper.clear()'ed
paper.put=function(gobj){paper.canvas.appendChild(gobj.node)}


// put the width and heigth of the canvas into variables for our own convenience
var pWidth = paper.canvas.clientWidth;
var pHeight = paper.canvas.clientHeight;
console.log("pWidth is " + pWidth + ", and pHeight is " + pHeight);

//------------------------------------//

//1.1
var rec = paper.rect(0,0, pWidth, pHeight);
rec.attr({
	fill: "#4E6566"
});


//1.2
var dot = paper.circle(pWidth/2, pHeight/2, 50); 
dot.attr({
	fill: "#D66566",
});


//1.3

var mouseIsDown = false;

dot.node.addEventListener("mousedown", function(ev){
	mouseIsDown = true;
	console.log('mouseIsDown', mouseIsDown);
});

rec.node.addEventListener("mousemove", function(ev){
	if (mouseIsDown == true){
		console.log('dragging');
		dot.attr({
			cx: ev.offsetX,
			cy: ev.offsetY
		});  
	};
});

rec.node.addEventListener("mouseup", function(ev){
	mouseIsDown = false;
	console.log('mouseup');
});

dot.node.addEventListener("mouseup", function(ev){
	mouseIsDown = false;
});



//2.1
var circleRadius = 50

//2.2
var newCircle = 0
rec.node.addEventListener('click', function(ev){
	newCircle = paper.circle(ev.offsetX, ev.offsetY, circleRadius); 
	newCircle.attr({
		fill: "#D69966",
	});
});

//2.6
slider.addEventListener('change', function(ev){
	circleRadius = slider.value*100;
	console.log(circleRadius)
});

butt.addEventListener('click', function(ev){
	paper.clear();
	paper.put(rec);
	paper.put(dot);
});




















