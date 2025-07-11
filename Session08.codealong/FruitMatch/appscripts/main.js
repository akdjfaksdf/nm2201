var paper = new Raphael("canvas",400,800);



//**************************
// Example code from the video
// Comment out the code starting on line 35 and uncomment this code. Examine each line of this nested loop.
// Make sure you understand what's happening
//*****************
// var rowOne = [];
// var sameY = 200;
// var x = 50;

// //for the same y coordinate, I have four x coordinates

// for(j=0; j<7; j++)
// {
// 	for(i=0;i<4;i++)
// 	{
// 		//hardcoding fruit just to test things out
// 		rowOne[i] = paper.image("resources/fruit1-sheet0.png",x,sameY);
// 	}
// }




//

//**************************
// After examining the above code, you can uncomment this code and explore what it does
//*****************

//my list of fruits
var fruit = [];

//my fruit drawing function
var makeF=function(choice,i,j)
{

	 //the ith fruit in the jth row! 
	 //random "choice" variable is linked to the filenames.
	 fruit [j*10+i]= paper.image("resources/fruit"+choice+"-sheet0.png",20+(i*100),60+(j*100),70,70);
	//adding some extra properties to the image object to track its type
	fruit[j*10+i].type=choice;
	//if i know which fruit is clicked, i can find out its neighbors!
	fruit[j*10+i].fruitno=j*10+i;
};



//six fruits, 7 rows, 5 columns
//nested loop to generate fruits
//calling a function each time and adding new fruits to my fruit list.
for(j =0;j<7;j++)
{
    for(i=0;i<5;i++)
    {
	//random choice of fruit. 
        var choice = Math.floor(6*Math.random())+1;
        //console.log(choice);
	//now draw the chosen fruit
        makeF(choice,i,j);
    }
}


//add event listeners!