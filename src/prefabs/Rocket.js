class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        //Add object to existing scene
        scene.add.existing(this);
      
        //Rocket move and firing speed
        this.moveSpeed = 2;
        this.firingSpeed = 4;

        //Initialize Boolean Flags
        this.isFiring = false;
        this.isPlayed = false;

        //Add sound to scene
        this.sfxRocket = scene.sound.add('sfx_rocket');
    }

    update() {

        //If F is pressed, then fire
        if(keyF.isDown) {
        	this.isFiring = true;
            if(!this.isPlayed) {
                this.isPlayed = true;
                this.sfxRocket.play();
            }
        }

        if(this.isFiring) {
            this.y -= this.firingSpeed;
            if(this.y < 108) {
                this.isPlayed = false
                this.isFiring = false;
                this.y = game.config.height - borderUISize - borderPadding;
            }

        } else {
            if(keyLEFT.isDown) {
        	    this.x -= this.moveSpeed;
            } else if (keyRIGHT.isDown) {
        	    this.x += this.moveSpeed;
            }

        }

        //Clamp Rocket position to within the game window
        this.x = Phaser.Math.Clamp(this.x, borderUISize+borderPadding, game.config.width - borderUISize - borderPadding);

    }

    reset() {

        //Return rocket to start on reset
        this.y = this.y = game.config.height - borderUISize - borderPadding;
        this.isFiring = false;
        this.isPlayed = false;
    }

}
