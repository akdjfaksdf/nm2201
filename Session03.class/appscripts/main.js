// main.js

console.log("yo");


// //part one
// //part one
// //part one
// //part one
// //part one

/*
1.1
step 1: start
//variable
step 2: var f = 0
//input
step 3: input c
//formula
step 4: f = 1.8c + 32
//print
step 4: print f

1.2
step 1: start
//variable
step 2: var d = 0
//input
step 3: input s and t
//formula
step 4: d = s * t
//print
step 4: print d

1.2.1
step 1: start
//variable
step 2: var d = 0
//input
step 3: get s from html (var s = document.getElementById("speed"))
		get t from html (var t = document.getElementById("time"))
//formula
step 4: d = s * t
//print
step 4: print d

1.2.2
step 1: start
//variable
step 2: var d = 0
//input
step 3: get s from html (var s = document.getElementById("speed"))
		get t from html (var t = document.getElementById("time"))
//formula and print
step 4: d.innerHTML = s * t
*/


// 1.2.3
speedEl.innerText = "83 m/s"
timeEl.innerText = "100 seconds"

nav.innerText = "83 m/s"
aside.innerText = "100 seconds"


// 1.3
speedEl.style.color = "red"
speedEl.style.backgroundColor = "yellow"
speedEl.style.height = "50px" //this doesn't work

//needs to be in a paragraph or div to work
testingTest.style.backgroundColor = "orange"
testingTest.style.height = "100px"
testingTest.style.overflow = "scroll"
testingTest.style.paddingLeft = "50px"
testingTest.style.paddingRight = "50px"

marginDemo.style.backgroundColor = "green"
marginDemo.style.height = "100px"
marginDemo.style.marginLeft = "100px"
marginDemo.style.overflow = "hidden"



//part two
//part two
//part two
//part two
//part two

// //from firstbox

// //function declaration
// function myFunction(p1, p2) { 
// 	// this function takes in two ARGUMENTS, but any number of arguments are possible
// 	var prod = p1*p2; // this variable is declared inside the function so it does not exist once the function call ends
 
// 	console.log(prod);   // The function prints the product of p1 and p2 to the console

// 	//from part 1

// 	speedEl.innerHTML = "<p>83 m/s</p>"
// 	timeEl.innerHTML = "<p>100 seconds</p>"

// 	//when do we use the document/getElementById("") then??
// 	//when you actually need to get information from the html? 

// 	//changing html style
// 	speedEl.style.color = "red"
// 	speedEl.style.backgroundColor = "yellow"
// 	speedEl.style.height = "50px" //this doesn't work

// 	//needs to be in a paragraph or div to work
// 	testingTest.style.backgroundColor = "orange"
// 	testingTest.style.height = "100px"
// 	testingTest.style.overflow = "scroll"
// 	testingTest.style.paddingLeft = "50px"
// 	testingTest.style.paddingRight = "50px"

// 	marginDemo.style.backgroundColor = "green"
// 	marginDemo.style.height = "100px"
// 	marginDemo.style.marginLeft = "100px"
// 	marginDemo.style.overflow = "hidden"

// }

// //function call
// myFunction(5,6);
// var a = 5;
// var b = 6;
// myFunction(a,b);

// //end of firstbox


// //from secondbox

// //function declaration
// function myFunction(p1, p2) { 
// 	// this function takes in two ARGUMENTS, but any number of arguments are possible
// 	var prod = p1*p2; // this variable is declared inside the function so it does not exist once the function call ends
//  	return prod;   // The function returns the product of p1 and p2
// };
// //function call
// prodValue = myFunction(5,6);
// var a = 5;
// var b = 6;
// alsoValue = myFunction(a,b);
// alsoValue = myFunction(a,b);
// //what will be printed? > prodValue + alsoValue > they were in quatation marks and hence printed as a string
// console.log("prodValue + alsoValue");
// //what will be printed? > 60 > numbers calculated
// console.log(prodValue + alsoValue);
// //what will be printed? > prodValue + alsoValue3030	> numbers were passed as an argument with a message 
// console.log("prodValue + alsoValue" + prodValue + alsoValue); 
// //what will be printed? > prodValue + alsoValue 30 30	> “ “ = space
// console.log("prodValue + alsoValue" + " " + prodValue + " " + alsoValue);

// //end of secondbox



//tutorial thing
//tutorial thing
//tutorial thing
//tutorial thing
//tutorial thing

// function myFunction(p1, p2) {
// 	var prod = p1 * p2
// 	console.log(prod)
// 	return prod //without the return, function will be undefined
// }

// var a = 5
// var b = 10
// myFunction(a, b)

// function myFunction2() {
// 	var speedEl = "<p>83 m/s</p>"
// 	var timeEl = "<p>100 seconds</p>"
// }


//part three
//part three
//part three
//part three
//part three

//3.1
function sumMaker(p1, p2) {
	console.log("output of step 3.1.3 is: I am in the function")
};

sumMaker(x,y);

//3.2
function sumMaker2(p1, p2) {
	return p1-p2 
};

var x = 5;
var y = 3;
var diff = sumMaker2(x,y);

var uhh = "output of step 3.2.2 is: the difference between " + x + " and " + y + " is " + diff

article.innerText = uhh;


//3.3 - 3.6

var point1 = {
	x: 9,
	y: 10
}


var point2 = {
	x: 3,
	y: 7
}

// var results = {
// 		sum: p1 + p2,
// 		difference: p1 - p2,
// 		product: p1 * p2
// 	}

function multi(p1, p2) {
	var results = {
		sum: p1 + p2,
		difference: p1 - p2,
		product: p1 * p2
	}

	return ("output of step 3.6 is: sum: " + results.sum + "; diff is: " + results.difference + "; prod is " + results.product);
}

step3six.innerText = multi (point1.x, point2.x);


//3.7 - 3.8

function pointsum(p1, p2) {
	var newPoint = {
		newx: p1.x + p2.x,
		newy: p1.y+ p2.y
	};
	return ("output of step 3.8 is: " + newPoint.newx +", " + newPoint.newy)
};

step3seven.innerHTML = pointsum (point1, point2);



