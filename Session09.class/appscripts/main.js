

/*----------------------------------------------------------
//MODEL: game area, component, user
------------------------------------------------------------
*/
var paper = new Raphael(document.getElementById("mySVGCanvas"));
//store game info such as how many frames or seconds have passed, clear game at the end and reset it
//note that the start function is also used to reset the game.

// var timer;

var myGameArea = {
	frameNo : undefined,
    start : function() {
        this.frameNo = 0;
        console.log("Page is loaded");
        //set this.interval
        this.timer = setInterval(updateGameArea, 100);
    },
    stop : function() {
        //clear this.interval
        //without clear: updateGameArea will keep going even after game ends. keeps going until clearInterval or window closed
        clearInterval (this.timer); //this.timer = like making timer a variable within the myGameArea variable (which u can't do within a var otherwise) 
    },    
    clear : function() {
        paper.clear();

    }
}
//store component info and component functions to create and update pieces, and listen to events. component is in the global scope.
function component(width, height, color, x, y) {
    var rectangl = {}
    rectangl.width = width;
    rectangl.height = height;
  
    rectangl.x = x;
    rectangl.y = y; 
    rectangl.shape = paper.rect()   
    rectangl.shape.attr({x:rectangl.x, y:rectangl.y, width:rectangl.width, height:rectangl.height,fill: color});
    
    rectangl.update = function() {
        rectangl.shape.attr({x:rectangl.x, y:rectangl.y, width:rectangl.width, height:rectangl.height,fill: color});
    }

    rectangl.shape.node.addEventListener('click', user.updateScore);

    return rectangl;
     
    
}
var green;
var obst

//store user info and user update functions. user variable is the global scope. note that the user name is updated each time the game starts
var user = {
	name: undefined,
	score: 0,
	updateScore : function()
	{
		    user.score +=1;
			console.log("User score is now "+ user.score);
		}

}





/*----------------------------------------------------------
//VIEW: draw a piece, update a piece
------------------------------------------------------------
*/

function drawPiece(){
    //creates a new component of random height, scaled to a given range :)
        x = paper.width;
        minHeight = 20;
        maxHeight = 200;
        height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
        green = component(10, height, "green", x, 0);
        console.log(green);
        }


function updatePiece(){
    //moves the component in the x direction
        green.x -= 10;
        green.update();  

};


/*----------------------------------------------------------
//CONTROLLER: Event listeners, start game, update game check end game
------------------------------------------------------------
*/

var nextButt = document.getElementById("nextButt");
nextButt.addEventListener("click",updateGameArea);

function startGame() {
    //when the page is loaded, what should happen?
    myGameArea.start();
    user.name = window.prompt("Enter your name");

}


function checkEndGame(){
    //at the end of 10 frames (could also be set to 10000 milliseconds), the game ends. 
    if (myGameArea.frameNo === 10) {
        window.alert(`The End. Well played, ${user.name}. your score is ${user.score}`)   
        console.log(`The End. Well played, ${user.name}. your score is ${user.score}`)
        myGameArea.clear();
        myGameArea.stop();
        startGame(); 
    } 
   
	
}


function updateGameArea() {
    
    
    myGameArea.frameNo += 1;
    console.log("frameNo is "+ myGameArea.frameNo);
    //if its the first frame, draw the piece. if it's the second or any other frame, update the piece.

    if (myGameArea.frameNo === 1) {
        drawPiece();
        console.log("in game area frame 1")
        updatePiece();
    }
    else {
        updatePiece();
        checkEndGame();
    };

}




