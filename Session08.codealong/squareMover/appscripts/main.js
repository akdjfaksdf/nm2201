
console.log("yo, I'm alive!");

var paper = new Raphael(document.getElementById("mySVGCanvas"));


var rect1 = paper.rect(100, 100, 100, 100);
rect1.attr({
	"fill" : "hsl(.75, .5, .5)",
	"stroke" : "#345678",
	"stroke-width" : 5,
	"stroke-linejoin" : "round",
	"opacity" : .75
})

console.log(rect1.node);

rect1.node.addEventListener("click", function(ev){
	console.log("rect clicked");
	console.log(ev.target);
});

document.getElementById("mySVGCanvas").addEventListener("click", function(ev){
	console.log("click on the canvas at x = " + ev.offsetX + ", and y = " + ev.offsetY);
	console.log("click on the canvas at x = " + ev.clientX + ", and y = " + ev.clientY);
	rect1.attr({"x":ev.offsetX, "y": ev.offsetY});
	console.log(ev.target);

});

