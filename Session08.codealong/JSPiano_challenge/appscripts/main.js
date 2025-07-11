// This allows you to print the now playing key to the screen. You will want to call this everytime a key is pressed. 
// Input argument is the piano key corresponding to a keydown event
// There is no return value, but it sets the innerHTML of something. Can you find out what?
function setplayNote(playedKey) {
  console.log("setplayNote is triggered!");
  var note = playedKey.getAttribute('data-note');
  console.log (note);

  var nowPlaying = document.getElementById('nowplayingNote');
  nowPlaying.innerHTML = note;
}
//



//create a variable to check the hint status.
//below


//Part 1: Show hints
//Part 1: Show hints
//Part 1: Show hints
//Part 1: Show hints
//Part 1: Show hints
//The window should listen for any keydown events. Add that eventlistener here. What functions should it call?

// 1.1 Create an eventListener so that the window can listen for a keydown event.
window.addEventListener('keydown', function(ev){
  // 1.2 The keyCode of the spacebar key is 32. If the spacebar is pressed, then the showHints function should be triggered
 if (ev.keyCode == 32) {
    showHints();
  } else {
    // 1.3 Otherwise, the playNote function should be triggered. Pass it the event variable.
    playNote(ev);
  }
});

// 1.4 We want to track the on/off state of showing hints. So create a global variable called
  // hintsOn to track the status, and set it to 0 when the page is loaded.
  // moved down


//Part 2: Show the note that's playing
//Part 2: Show the note that's playing
//Part 2: Show the note that's playing
//Part 2: Show the note that's playing
//Part 2: Show the note that's playing

// This allows you to show hints if the space bar is pressed the first time, and remove the hints when the space bar is pressed the second time.
var hintsOn = 0;

// 2.3 Now, if hintsOn is 0, then we will switch on the hints now. For each element, set its opacity to be 1. You can do this in two ways
// (a) By accessing each element in turn, e.g., allHints[0].style...... (b) By using a loop, e.g.
// for () {
// //code for setting opacity goes here }

// No input argument, but it is called if the keydown is a spacebar.
// There is no return value, but it changes the opacity of all the elements of the hints class
function showHints() {
  console.log("showHints is triggered!");

  //first, create a list of all elements which have the class name "hints"
    // 2.1 Create a list by getting all the elements from the DOM that are called hints.
    allHints = document.getElementsByClassName('hints');

    // 2.2 How many elements do you expect there to be, and how can you check this? Print the size of the list to the console.
    // console.log(allHints)

  //check the status variable in an if-then condition
  if (hintsOn == 0) {
    //next, for each element in the list, set its opacity to 1
    for (i = 0; i <= 16; i++) {
      console.log(i);
      allHints[i].style.opacity = 1;
    }

    //set the status variable
    hintsOn = 1;
  
  // 2.4 If hintsOn is 1, then we will switch off the hints now. the opacity of each element should be set to 0 instead. Again, you can do this in either of the two days provided above.
  } else {

    for (i = 0; i <= 16; i++) {
      console.log(i);
      allHints[i].style.opacity = 0;
    }

    // 2.5 After setting opacities, remember to set the new state of hintsOn.
    hintsOn = 0;

  }     
};


//Part 3: Play Note
//Part 3: Play Note
//Part 3: Play Note
//Part 3: Play Note
//Part 3: Play Note

//This allows you to play the audio. You will want to call this everytime a key is pressed. 
//Input argument is the event variable from the event listener
// There is no output, but it plays audio and calls setplayNote
function playNote(e){
  console.log("playNote is triggered! e.keyCode is "+ e.keyCode);
    
  // 3.1 You will create a new audio object by using new Audio() that takes in a file location, and then you will play that audio.
  // First you need to get the file corresponding to the key that was pressed. You can do this by
    // (a) use document.getElementById to get a pianoKey object (but you could have called this anything you wanted), and then
    //keycode is a number eg 65. but what are the ids of the audio elements in index.html like?
    var audioId = 'k' + e.keyCode;
    var audioElement = document.getElementById(audioId);

    if (audioElement != null) {
      // (b) do a getAttribute(“src”) on that object to get its sound file property value.
      //use getAttribute() to get the attribute of an HTML element, e.g. the note which is being played.
      audioFile = audioElement.getAttribute('src');
      console.log(audioFile);

      // (c) use this inside your Audio() method to create an audio object, following the syntax in Lecture 5’s slides.
        //initialise new audio object
        var aBumpSnd = new Audio(audioFile);
        //set current time
        aBumpSnd.currentTime = 0
        //play
        aBumpSnd.play();
        
      //If the pressed key is on your synthesizer, then call setplayNote
      setplayNote(audioElement);

    };
  
}