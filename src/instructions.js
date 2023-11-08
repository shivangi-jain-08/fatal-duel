var pageTitle = document.getElementById("title");

var mainText = document.getElementById("main-text");

var skipButton = document.getElementById("skip-button");

var skipButtonText = document.getElementById("skip") || "placeHolderText";
var backgroundMusic = new Audio('../assets/bgm.mp3')
var clickAudio = new Audio("../assets/click.mp3")

document.addEventListener("DOMContentLoaded", ()=>{
backgroundMusic.pause()
backgroundMusic.play()
backgroundMusic.loop = true
})

    window.addEventListener("click", (e) => {
        if (event.target.textContent !== skipButtonText.textContent) {
            if (pageTitle.innerText === "STORY") {
                changeToInstructions();
            } else if (pageTitle.innerText === "INSTRUCTIONS") {
                changeToModesPage();
            // }else if (pageTitle.innerText === "ENTER DETAILS") {
            //     // localStorage.setItem("nameObj", "")
            } else if (pageTitle.innerText === "CONTROLS") {
                gotoGamePage();
            }
        } else {
            gotoGamePage();
        }
    });


function changeToInstructions() {
    pageTitle.innerText = "INSTRUCTIONS";  
    mainText.innerText = "The players can choose which mafia group they want. Players will fight for a time of 1 minute. If a player dies within that minute, a winner is declared. If there is no winner for 1 minute, there is a rematch. One hit results in a loss of 1/5 of the health a player has. The representative from the Obsidian Brotherhood is Player 1 in the game and the representative from the Midnight Ravens is Player 2 in the game.";
    skipButton.style.display = "none"; 
}

function changeToControlsPage(){
    location.href = "./controls.html"
    skipButton.style.display = "none"; 
}

function changeToModesPage(){
    location.href = "./modes.html"
    skipButton.style.display = "none"; 
}

function gotoGamePage(){
    location.href = "./game.html"
    skipButton.style.display = "none"; 
}



//getting the names of players as input
var submitButton = document.getElementById("save-button")

submitButton.onclick = ()=>{
var player1name = document.getElementById("player1-name");
var player2name = document.getElementById("player2-name");

//storing these values in object
if(player1name.value=='' && player2name.value==''){
    alert("Enter name of player1 and player2")
}
else if(player1name.value=='' && player2name.value!=''){
    alert("Enter Player 1 name")
}
else if(player1name.value!='' && player2name.value==''){
    alert("Enter Player 2 name")
}
else{
var data = {
    p1name: player1name.value,
    p2Name: player2name.value,
};
// adding name to localStorage
localStorage.setItem("p1name", data.p1name);
localStorage.setItem("p2name", data.p2Name);
}
changeToControlsPage()
}