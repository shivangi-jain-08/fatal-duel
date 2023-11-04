var pageTitle = document.getElementById("title");
console.log("pageTitle: ", pageTitle);
var mainText = document.getElementById("main-text");
console.log("mainText: ", mainText);
var skipButton = document.getElementById("skip-button");
console.log("skipButton: ", skipButton);
var skipButtonText = document.getElementById("skip")
console.log("skipButtonText: ", skipButtonText);

// if (pageTitle.innerText === "STORY") {
    window.addEventListener("click", (e) => {
        if (event.target.textContent !== skipButtonText.textContent) {
            if (pageTitle.innerText === "STORY") {
                changeToInstructions();
            } else if (pageTitle.innerText === "INSTRUCTIONS") {
                changeToModesPage();
            }else if (pageTitle.innerText === "MODES") {
                changeToControlsPage();
            } else if (pageTitle.innerText === "CONTROLS") {
                gotoGamePage();
            }
        } else {
            gotoGamePage();
        }
    });


function changeToInstructions() {
    pageTitle.innerText = "INSTRUCTIONS";  
    mainText.innerText = "There will be two modes - 2 player and computer vs human. The players can choose which mafia group they want. Players will fight for a time of 1 minute. If a player dies within that minute, a winner is declared. If there is no winner for 1 minute, there is a rematch. One hit results in a loss of 1/5 of the health a player has. If a player doesn’t lose any health for 10 seconds, they gain 1/5 of the total health.";
    skipButton.style.display = "none"; 
}

function changeToControlsPage(){
    location.href = "./controls.html"
}

function changeToModesPage(){
    location.href = "./modes.html"
}

function gotoGamePage(){
    location.href = "./game.html"
}

