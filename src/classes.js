class Sprite{
    constructor({position, imageSrc, scale = 1, framesMax = 1}) {
        // initializing properties for the Sprite class   
        this.position = position
        this.width = 50
        this.height = 150
        this.image = new Image()
        this.image.src = imageSrc
        this.scale = scale
        this.framesMax = framesMax
        this.frameCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 5
    }

    draw(){
        // to draw the sprite on the canvas
        c.drawImage(
            this.image,
            this.frameCurrent*(this.image.width/this.framesMax),
            0,
            this.image.width/this.framesMax,
            this.image.height,
            this.position.x, 
            this.position.y, 
            (this.image.width/this.framesMax) * this.scale, 
            this.image.height * this.scale
            )
    }

    animateFrames(){
        // incrementing framesElapsed and update the current frame based on framesHold
        this.framesElapsed++
        if(this.framesElapsed % this.framesHold === 0)
        if(this.frameCurrent < this.framesMax-1){
            this.frameCurrent++
        }else{
            this.frameCurrent = 0
        }
    }

    update(){
        // updating the sprite by drawing it and animating frames
        this.draw()
        this.animateFrames()
    }

}

class Fighter extends Sprite{
    constructor({position, velocity, color = 'red', offset, imageSrc, scale = 1, framesMax = 1, sprites, attackBox = {offset: {}, width: undefined, height: undefined}}) {
        //initializing properties for the Fighter class, extending Sprite
        super({
            position,
            imageSrc,
            scale,
            framesMax
        })
        
        this.velocity = velocity
        this.width = 50
        this.height = 150
        this.lastKey
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset: attackBox.offset,
            width: attackBox.width,
            height: attackBox.height
        }
        this.color = color
        this.isAttacking
        this.health = 100
        this.frameCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 10
        this.sprites = sprites
        this.dead = false

        // loading images for each sprite in the sprites object
        for (const sprite in this.sprites){
            sprites[sprite].image = new Image()
            sprites[sprite].image.src = sprites[sprite].imageSrc
        }
    }

    update(){
        // updating the fighter by drawing, animating frames, updating attackBox, and handling movement
        this.draw()
        if(!this.dead){
            this.animateFrames()
        }
        
        // updating the position of the attackBox
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x
        this.attackBox.position.y = this.position.y + this.attackBox.offset.y

        //draw attackBox
        // c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)

        // updating the position of the attackBox
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if (this.position.y + this.height + this.velocity.y>= canvas.height-90){
            this.velocity.y = 0;
        }else{
            this.velocity.y += gravity
        }
    }

    attack(){
        // starting an attack animation
        this.switchSprite('attack')
        this.isAttacking = true;
    }

    hurt(){
        // the fighter being hurt
        this.health -=20

        if(this.health <=0){
            // If health drops to zero, trigger death animation and redirect to result.html
            this.switchSprite("death")
            setTimeout(()=>{
                location.href = "./result.html"
            }, 1000)
        }else{
            // If health is not zero, trigger hurt animation
            this.switchSprite('hurt')
        }
    }

    switchSprite(sprite){
        //override when player dies
        if(this.image === this.sprites.death.image){
            if(this.frameCurrent===this.sprites.death.framesMax-1){
            this.dead = true
            }
            return
        }

        //override when player attacks
        if(this.image === this.sprites.attack.image && this.frameCurrent<this.sprites.attack.framesMax-1){
            return
        }
        //override when player gets hurt
        if(this.image === this.sprites.hurt.image && this.frameCurrent<this.sprites.hurt.framesMax-1){
            return
        }

        // Switch to the specified sprite and reset frameCurrent
        switch(sprite){
            // Cases for each sprite type
            // (idle, run, jump, fall, attack, hurt, death)
        case 'idle':
            if(this.image !== this.sprites.idle.image){
                this.image = this.sprites.idle.image
                this.framesMax = this.sprites.idle.framesMax
                this.frameCurrent = 0

            }
            break
        case 'run':
            if(this.image !== this.sprites.run.image){
                this.image = this.sprites.run.image
                this.framesMax = this.sprites.run.framesMax
                this.frameCurrent = 0

            }
            break
        case 'jump':
            if(this.image!==this.sprites.jump.image){
                this.image = this.sprites.jump.image
                this.framesMax = this.sprites.jump.framesMax
                this.frameCurrent = 0
            }
            break
        case 'fall':
            if(this.image!==this.sprites.fall.image){
                this.image = this.sprites.fall.image
                this.framesMax = this.sprites.fall.framesMax
                this.frameCurrent = 0
            }
            break
        case 'attack':
            if(this.image!==this.sprites.attack.image){
                this.image = this.sprites.attack.image
                this.framesMax = this.sprites.attack.framesMax
                this.frameCurrent = 0
            }
            break
        case 'hurt':
            if(this.image!==this.sprites.hurt.image){
                this.image = this.sprites.hurt.image
                this.framesMax = this.sprites.hurt.framesMax
                this.frameCurrent = 0
            }
            break
        case 'death':
            if(this.image!==this.sprites.death.image){
                this.image = this.sprites.death.image
                this.framesMax = this.sprites.death.framesMax
                this.frameCurrent = 0
            }
            break
    }
    }
}
