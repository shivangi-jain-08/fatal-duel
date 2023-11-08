var playButton = document.getElementById("play-button");
var backgroundMusic = new Audio('../assets/bgm.mp3')
var clickAudio = new Audio("../assets/click.mp3")

document.addEventListener("load", ()=>{
backgroundMusic.pause()
backgroundMusic.play()
backgroundMusic.loop = true
})
playButton.onclick = ()=>{
    clickAudio.play()
    setTimeout(()=>{
        location.href = "./instructions.html";
    }, 500)
    
}