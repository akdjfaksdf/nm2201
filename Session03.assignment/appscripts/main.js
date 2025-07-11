// main.js

console.log(`yo`);


article.style.fontFamily = "Times";
header.style.textAlign = "Center";

//part two
var artEl = document.getElementById("article");
console.log(artEl);


var sighs = "sadness";

// artEl.innerHTML = "some new text sighs"; //literal
// artEl.innerHTML = sighs; // variable

artEl.innerHTML = artEl.innerHTML + sighs; //append

artEl.style.textAlign = "Center"; //literal
var newstyle = "#93AAAA"; 
artEl.style.background = newstyle; //variable







