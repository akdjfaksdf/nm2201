/* Input and Events */

console.log("yo");


//part1; 1

function changeOpac() {
	
	var colSlide = document.getElementById('mySlider'); 
	console.log(colSlide.value);

	// var RgbaString = `rgba(${0},${0},${0},${colSlide.value})`;
	// console.log(RgbaString);

	// colorDisplay.style.borderColor = RgbaString;

	colorDisplay.style.opacity = colSlide.value;
	
};

//part1; 2

function changeByHex() {

	var hexInput = document.getElementById('userColor');
	console.log(hexInput.value);

	colorDisplay.style.backgroundColor = hexInput.value;

};

///////////////////

//part2; 3

function hslString(p1, p2, p3) {

	return `hsl(${p1},${p2}%,${p3}%)`;

};

// //test
// var a = 3
// var b = 5
// var c = 10
 
// var x = hslString(a, b, c)
// console.log(x)

///////////////////

//part3; 5

function changeByHsl() {

	var hueInput = document.getElementById('hueSlider').value;
	var satInput = document.getElementById('satSlider').value;
	var lightInput = document.getElementById('lightSlider').value;

	var hslColor = hslString(hueInput, satInput, lightInput);
	console.log(hslColor);

	colorDisplay.style.backgroundColor = hslColor;

	//part3; 7
	document.getElementById("newbutt").addEventListener(
	"click", function() {

 		 colorDisplay.innerHTML = hslColor;

	});

};









