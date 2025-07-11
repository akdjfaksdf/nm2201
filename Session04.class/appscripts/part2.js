
//in var counter2 = 5:
//var = declaring
//counter2  = initialising
//=5 = assigning

//PRE-FUNCTION BLOCK
var counter2; //LINE 1: declaring and initialising a variable. Current value = undefined
counter2 = 5; //LINE 2: assigning a variable. Current value = 0


function foo() {
//FUNCTION BLOCK
	counter2 = counter2 + 1;
   	console.log("Inside the function block: counter2’s value is: " + counter2);
}

//POST-FUNCTION BLOCK
console.log("Post-function block: counter2’s value is: " + counter2);
foo();
		


// part 2

// 1. Line 1 and Line 2 are in current position
// - foo was called after the console log outside the function
// Post-function block: counter2’s value is: 5 (15)
// Inside the function block: counter2’s value is: 6 (11)

// 2. Line 2 is inside function block BEFORE “counter2 = counter2+1” expression
// - undefined because counter2 is only assigned a value within foo and so will only be defined after foo is called
// Post-function block: counter2’s value is: undefined (15)
// Inside the function block: counter2’s value is: 6 (11)

// 3. Line 2 is inside function block AFTER “counter2 = counter2+1” expression
// - counter2 is 5 because counter2 got its value reassigned to 5
// Post-function block: counter2’s value is: undefined (16)
// Inside the function block: counter2’s value is: 5 (12)

// 4. Line 2 is in post-function block, after function call
// - NaN because counter2 was never assigned to a value before it was assinged to undefined + 1 which evaluates to NaN
// Post-function block: counter2’s value is: undefined (15)
// Inside the function block: counter2’s value is: NaN (11)

















