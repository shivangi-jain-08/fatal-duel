// Create audio objects for background music and click sound
var backgroundMusic = new Audio('../assets/bgm.mp3');
var clickAudio = new Audio("../assets/click.mp3");

// Play background music on page load and set it to loop
document.addEventListener("DOMContentLoaded", () => {
    backgroundMusic.play();
    backgroundMusic.loop = true;
});

// Retrieve player scores from localStorage
var player1Score = localStorage.getItem("player1Score");
var player2Score = localStorage.getItem("player2Score");

// Get references to HTML elements displaying player scores
var player1ScoreDiv = document.getElementById("p1score");
var player2ScoreDiv = document.getElementById("p2score");

// Retrieve player names from localStorage
var player1Name = localStorage.getItem("p1name");
var player2Name = localStorage.getItem("p2name");

// Get references to HTML elements displaying player names
var player1NameDiv = document.getElementById("player1-name");
var player2NameDiv = document.getElementById("player2-name");

// Get reference to HTML element displaying the game result message
var resultMessage = document.getElementById("game-over-message");

// Set player names in their respective HTML elements
player1NameDiv.textContent = player1Name;
player2NameDiv.textContent = player2Name;

// Set player scores in their respective HTML elements
player1ScoreDiv.textContent = player1Score;
player2ScoreDiv.textContent = player2Score;

// Determine the game result and display the corresponding message
if (player1Score > player2Score) {
    resultMessage.innerHTML = `${player1Name} Wins!`;
} else if (player1Score < player2Score) {
    resultMessage.innerHTML = `${player2Name} Wins!`;
} else {
    resultMessage.innerHTML = "It's a tie!";
}

// Get references to HTML buttons for playing again and starting a new game
var playAgainBtn = document.getElementById("play-again-button");
var newGameBtn = document.getElementById("new-game-button");

// Handle click event for playing again
playAgainBtn.onclick = () => {
    location.href = "./game.html";
};

// Handle click event for starting a new game
newGameBtn.onclick = () => {
    location.href = "./index.html";
};