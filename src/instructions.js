// declaring variables-------------------
var pageTitle = document.getElementById("title");
var mainText = document.getElementById("main-text");
var skipButton = document.getElementById("skip-button");
var skipButtonText = document.getElementById("skip") || "placeHolderText";
var backgroundMusic = new Audio("../assets/bgm.mp3");
var clickAudio = new Audio("../assets/click.mp3");

// Pause and play background music on page load, set it to loop
document.addEventListener("DOMContentLoaded", () => {
  backgroundMusic.pause();
  backgroundMusic.play();
  backgroundMusic.loop = true;
});

// Handle clicks on the window
window.addEventListener("click", (e) => {
  // Check if the clicked element's text content matches the skipButtonText
  if (event.target.textContent !== skipButtonText.textContent) {
    // Depending on the page title, navigate to the next page
    if (pageTitle.innerText === "STORY") {
      changeToInstructions();
    } else if (pageTitle.innerText === "INSTRUCTIONS") {
      changeToModesPage();
    } else if (pageTitle.innerText === "CONTROLS") {
      gotoGamePage();
    }
  } else {
    // If the skip button is clicked, go to the game page
    gotoGamePage();
  }
});

// Function to change the page title and main text to "INSTRUCTIONS"
function changeToInstructions() {
  pageTitle.innerText = "INSTRUCTIONS";
  mainText.innerText =
    "The players can choose which mafia group they want. Players will fight for a time of 1 minute. If a player dies within that minute, a winner is declared. If there is no winner for 1 minute, there is a rematch. One hit results in a loss of 1/5 of the health a player has. The representative from the Obsidian Brotherhood is Player 1 in the game and the representative from the Midnight Ravens is Player 2 in the game.";
  skipButton.style.display = "none";
}

// Function to navigate to the "controls.html" page
function changeToControlsPage() {
  location.href = "./controls.html";
  skipButton.style.display = "none";
}

// Function to navigate to the "modes.html" page
function changeToModesPage() {
  location.href = "./modes.html";
  skipButton.style.display = "none";
}

// Function to navigate to the "game.html" page
function gotoGamePage() {
  location.href = "./game.html";
  skipButton.style.display = "none";
}

// Get references to input elements and handle player name submission
var submitButton = document.getElementById("save-button");

submitButton.onclick = () => {
  var player1name = document.getElementById("player1-name");
  var player2name = document.getElementById("player2-name");

  // Check if player names are entered and provide alerts if not
  if (player1name.value == "" && player2name.value == "") {
    alert("Enter name of player1 and player2");
  } else if (player1name.value == "" && player2name.value != "") {
    alert("Enter Player 1 name");
  } else if (player1name.value != "" && player2name.value == "") {
    alert("Enter Player 2 name");
  } else {
    // Store player names in an object and add them to localStorage
    var data = {
      p1name: player1name.value,
      p2Name: player2name.value,
    };
    // adding name to localStorage
    localStorage.setItem("p1name", data.p1name);
    localStorage.setItem("p2name", data.p2Name);
  }
  // Navigate to the "controls.html" page
  changeToControlsPage();
};
