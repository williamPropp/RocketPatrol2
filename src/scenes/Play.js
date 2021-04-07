class Play extends Phaser.Scene {
    constructor() {
        super("playScene");

    }

    create() {
        this.add.text(20,20, "Start playing now");
        this.add.rectangle(
            0, 
            borderUISize + borderPadding, 
            game.config.width, 
            BorderUISize * 2,
            0x00FF00,
            ).setOrigin(0,0);
    }
}