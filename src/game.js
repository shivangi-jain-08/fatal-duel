const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

//score calculation - declaring variables
var scorePlayer1 = 0;
var scorePlayer2 = 0;
localStorage.setItem("player1Score", scorePlayer1)
localStorage.setItem("player2Score", scorePlayer2)

//declaring audio variables
var player1AttackAudio = new Audio("../assets/player1/player1-attack-audio.wav")
var player2AttackAudio = new Audio("../assets/player2/player2-attack-audio.wav")

//setting canvas width and height
canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height);

//using variable gravity to make objects on screen fall
const gravity = 0.7;

//adding background as a sprite object
const background = new Sprite({
    position: {
        x: 0,
        y:0
    },
    imageSrc: "../assets/bg-canvas.png"
})

// const chimney = new Sprite({
//     position: {
//         x: 670,
//         y: 198
//     },
//     imageSrc: "../assets/chimney.png",
//     scale: 1.25,
//     framesMax: 6
// })

//adding player 1 as a fighter
const player1 = new Fighter({
    //setting position for the player
    position: {
        x: 0,
        y: 0
    },
    //setting initial velocity of player1 
    velocity: {
        x: 0,
        y: 10
    },
    offset:{
        x: 0,
        y: 0
    },
    //adding sprite image of player in idle state
    imageSrc: '../assets/player1/player1-idle.png',
    //setting scale of the image
    scale: 3.75,
    //setting number of frames in the image
    framesMax: 4,
    //adding image sprites for different states of the player
    sprites: {
        idle: {
        imageSrc: '../assets/player1/player1-idle.png',
        framesMax: 4
        },
        run: {
            imageSrc: '../assets/player1/player1-run.png',
            framesMax: 6,
            // image: new Image()
            },
        jump: {
            imageSrc: '../assets/player1/player1-jump.png',
            framesMax: 2
            },
        fall: {
            imageSrc: '../assets/player1/player1-fall.png',
            framesMax: 2
            },
        attack: {
            imageSrc: '../assets/player1/player1-attack.png',
            framesMax: 8
            },
        hurt: {
            imageSrc: '../assets/player1/player1-hurt.png',
            framesMax: 2
        },
        death: {
            imageSrc: '../assets/player1/player1-death.png',
            framesMax: 6
        }
        
        },
        //setting details of the attackbox of the player
        attackBox: {
            offset: {
                x: 30,
                y: 100
            },
            width: 120,
            height: 50
        }

})

const player2 = new Fighter({
    position: {
        x: 400,
        y: 100
    },
    velocity: {
        x: 0,
        y: 0
    },
    // color: 'blue',
    offset:{
        x: -50,
        y: 0
    },
    imageSrc: '../assets/player2/player2-idle.png',
    scale: 3.75,
    framesMax: 4,
    sprites: {
        idle: {
        imageSrc: '../assets/player2/player2-idle.png',
        framesMax: 4
        },
        run: {
            imageSrc: '../assets/player2/player2-run.png',
            framesMax: 6,
            },
        jump: {
            imageSrc: '../assets/player2/player2-jump.png',
            framesMax: 2
            },
        fall: {
            imageSrc: '../assets/player2/player2-fall.png',
            framesMax: 2
            },
        attack: {
            imageSrc: '../assets/player2/player2-attack.png',
            framesMax: 8
            },
        hurt: {
            imageSrc: '../assets/player2/player2-hurt.png',
            framesMax: 2
        },
        death:{
            imageSrc: '../assets/player2/player2-death.png',
            framesMax: 6
        }

        },
        attackBox: {
            offset: {
                x: -10,
                y: 100
            },
            width: 150,
            height: 50
        }

})

//adding different keys as objects for controls of players 
const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    }
}

//creating a function to check whether or not there is collision of attack box
function rectangularCollision({rectangle1, rectangle2}){
    return(
        rectangle1.attackBox.position.x + rectangle1.attackBox.width >=rectangle2.position.x &&
        rectangle1.attackBox.position.x<=rectangle2.position.x + rectangle2.width &&
        rectangle1.attackBox.position.y+rectangle1.attackBox.height>=rectangle2.position.y&&
        rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height)
}

//creating the timer
let time = 60;
var timer = setInterval(function () {
    time--;
    document.getElementById("timer").textContent = time;
    if(time == 0) {
        clearInterval(timer);
        location.href = "./result.html";
    }
}, 1000);

//creating a function so that players move
function animate(){
    window.requestAnimationFrame(animate);
    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height);
    background.update();
    // chimney.update()
    player1.update();
    player2.update();

    player1.velocity.x = 0
    player2.velocity.x = 0

    //player1 movement
    if(keys.a.pressed && player1.lastKey==='a'){
        player1.velocity.x = -5
        player1.switchSprite('run')
    }else if(keys.d.pressed && player1.lastKey==='d'){
        player1.velocity.x = 5
        player1.switchSprite('run')
    }else{
        player1.switchSprite('idle');
    }

    if(player1.velocity.y<0){
        player1.switchSprite('jump')
    }else if(player1.velocity.y > 0){
        player1.switchSprite('fall')
    }


    //player2 movement
    if(keys.ArrowRight.pressed && player2.lastKey==='ArrowRight'){
        player2.velocity.x = 5
        player2.switchSprite('run')

    }else if(keys.ArrowLeft.pressed && player2.lastKey==='ArrowLeft'){
        player2.velocity.x = -5
        player2.switchSprite('run')
    }else{
        player2.switchSprite('idle')
    }

    if(player2.velocity.y<0){
        player2.switchSprite('jump')
    }else if(player2.velocity.y > 0){
        player2.switchSprite('fall')
    }

    //detect for collision and player getting hit
    if(
        rectangularCollision({
            rectangle1: player1,
            rectangle2: player2
        }) && player1.isAttacking && player1.frameCurrent === 3){
        player2.hurt()
        scorePlayer1++;
        localStorage.setItem("player1Score", scorePlayer1)
        player1.isAttacking = false
        document.getElementById("player-2-health").style.width=player2.health + "%";
    }

    if(player1.isAttacking && player1.frameCurrent===4){
        player1.isAttacking = false
    }

    if(rectangularCollision({
            rectangle1: player2,
            rectangle2: player1
        }) &&
        player2.isAttacking  && player2.frameCurrent === 3){
        player1.hurt()
        scorePlayer2++;
        localStorage.setItem("player2Score", scorePlayer2)
        player2.isAttacking = false
        document.getElementById("player-1-health").style.width=player1.health + "%";
    }

    if(player2.isAttacking && player2.frameCurrent===4){
        player2.isAttacking = false
    }
}

animate()

//adding event listeners for different controls
window.addEventListener('keydown', (event)=>{
    if(event.key=='d'){
        keys.d.pressed = true
        player1.lastKey = 'd'
    }else if(event.key=='a'){
        keys.a.pressed = true
        player1.lastKey = 'a'
    }else if(event.key=='w'){
        player1.velocity.y= -20;
    }else if(event.key==" "){
        player1.attack()
        setTimeout(()=>{
            player1AttackAudio.pause()
            player1AttackAudio.play()
        },500)

    }
    
    else if(event.key=='ArrowRight'){
        keys.ArrowRight.pressed = true
        player2.lastKey = 'ArrowRight'
    }else if(event.key=='ArrowLeft'){
        keys.ArrowLeft.pressed = true
        player2.lastKey = 'ArrowLeft'
    }
    else if(event.key=='ArrowUp'){
        player2.velocity.y= -20;
    }
    else if(event.key=="ArrowDown"){
        player2.attack();
        player2.isAttacking = true
        // setTimeout(()=>{
            // player2AttackAudio.pause()
            player2AttackAudio.play()
        // },500)
    }
})

window.addEventListener('keyup', (event)=>{
    if(event.key=='d'){
        keys.d.pressed = false
    }else if(event.key=='a'){
        keys.a.pressed = false
    }else if(event.key=='ArrowRight'){
        keys.ArrowRight.pressed = false
    }else if(event.key=='ArrowLeft'){
        keys.ArrowLeft.pressed = false
    }
})

//redirecting to next page incase a player dies
if(player1.dead){
    location.href = "./result.html"
}else if(player2.dead){
    location.href = "./result.html"
}