// main.js

console.log(`yo`);

/* assign3: font family for article in RJavaScript */
document.getElementById("articleID").style.fontFamily = "cursive,Charcoal,sans-serif";

/* assign3: center header text using javascript */
document.getElementById("headerID").style.textAlign = "center";


//--------------------------------------------------------------

//part 1

var counter 
counter = 0

function warmyup() {
	//console.log("hellu");
	//headerID.innerText = "hellu"; 
	//document.getElementById("headerID").innerHTML = "hellu"
	//headerID.innerText = "counter: " + counter;
	//headerID.innerText = `counter: ${counter} how many times clicked` //use back ticks	

	// Track the number of clicks. It can do this by increasing the value of the counter variable that you set in Step 1e, by 1,
	counter += 1;

	// Changes the text in the header element to read something like "OK, I have now received X clicks" (where X is the click count). So comment out the command for Step 1f and format it like this instead.
	lie = 100*counter;

	// Now make it lie: have it print out 100 times the number of actual clicks it has received.
	headerID.innerText = `you clicked ${lie} times`;

};

//warmyup();


function slide() {
	//console.log("something")
	
	var colSlide = document.getElementById('slider'); 
	console.log(slider.value);

	var colV = Math.floor(colSlide.value * 255);
	console.log(colV);

	var RgbString = `rgb(${colV},${colV},${colV})`;
	console.log(RgbString);

	headerID.style.backgroundColor = RgbString;
}











