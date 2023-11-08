var backgroundMusic = new Audio('../assets/bgm.mp3')
var clickAudio = new Audio("../assets/click.mp3")

document.addEventListener("DOMContentLoaded", ()=>{
backgroundMusic.play()
backgroundMusic.loop = true
})

var player1Score = localStorage.getItem("player1Score")
var player2Score = localStorage.getItem("player2Score")

var player1ScoreDiv = document.getElementById("p1score")
var player2ScoreDiv = document.getElementById("p2score")

var player1Name = localStorage.getItem("p1name")
var player2Name = localStorage.getItem("p2name")

var player1NameDiv = document.getElementById("player1-name")
var player2NameDiv = document.getElementById("player2-name")

var resultMessage = document.getElementById("game-over-message")

player1NameDiv.textContent = player1Name;
player2NameDiv.textContent = player2Name;

player1ScoreDiv.textContent = player1Score
player2ScoreDiv.textContent = player2Score

if(player1Score>player2Score){
    resultMessage.innerHTML = `${player1Name} Wins!`
}else if (player1Score<player2Score){
    resultMessage.innerHTML = `${player2Name} Wins!`
}else{
    resultMessage.innerHTML = "It's a tie!"
}

var playAgainBtn = document.getElementById("play-again-button")
var newGameBtn = document.getElementById("new-game-button")

playAgainBtn.onclick = ()=>{
    location.href = "./game.html"
}

newGameBtn.onclick = ()=>{
    location.href = "./index.html"
}

