class Ship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue, name) {
        super(scene, x, y, texture, frame, name);
        scene.add.existing(this);
        this.pointValue = pointValue;

        let virusTextConfig = { fontFamily: 'Courier', fontSize: '10px', backgroundColor: '#000000', color: '#000000', align: 'center', padding: { top: 5, bottom: 5 } };
    }

    update() {

        //Move ships across screen
        this.x -= 3;
        if(this.x < 0 - this.width) {
            this.x = game.config.width;
        }

        this.add.text(this.x, this.y+10, this.name, this.virusTextConfig).setOrigin(0,0);
        
    }

    reset() {
    
        //Reset ships position on reset
        this.x = game.config.width;

    }
}