class Ship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue, name) {
        super(scene, x, y, texture, frame, name);
        scene.add.existing(this);
        this.pointValue = pointValue;
    }

    update() {

        //Move ships across screen
        this.x -= 3;
        if(this.x < 0 - this.width) {
            this.x = game.config.width;
        }
        
    }

    reset() {
    
        //Reset ships position on reset
        this.x = game.config.width;

    }
}