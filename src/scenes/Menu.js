class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");

    }

    preload() {
        //Load all assets
        this.load.image('titleScreen', './assets/titleScreen.png');
        this.load.image('sparkles1', './assets/sparkles1.png');
        this.load.image('sparkles2', './assets/sparkles2.png');
        this.load.image('sparkles3', './assets/sparkles3.png');
        this.load.image('pressF', './assets/pressF.png');
    }

    randSparkle(sparkleSprite) {
        //Randomize whether the opacity of a sparkle frame is 0 or 1
        let doSparkle = Math.floor(Math.random() * 2);
        if(doSparkle == 0) {
            sparkleSprite.alpha = 0;
        } else {
            sparkleSprite.alpha = 1;
        }
    }

    create() {

        //Initialize frame tracking variables
        this.frameCount = 0;
        this.frameDelay = 10;

        //Creat title screen
        this.add.tileSprite(0, 0, 640, 480, 'titleScreen').setOrigin(0, 0);
        this.add.tileSprite(0, 0, 640, 480, 'pressF').setOrigin(0, 0);

        //Create sparkling animation frames
        this.sparkle1 = new Sparkle(this, 0, 0, 'sparkles1', 0).setOrigin(0,0);
        this.sparkle2 = new Sparkle(this, 0, 0, 'sparkles2', 0).setOrigin(0,0);
        this.sparkle3 = new Sparkle(this, 0, 0, 'sparkles3', 0).setOrigin(0,0);

        //Define Keys
        this.keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);

    }

    update() {

        //Start game when F is pressed
        if(this.keyF.isDown) {
            this.scene.start("playScene");
        }

        //Randomize sparkle frame opacity every x frames, where x = frameDelay
        this.frameCount++;
        if(this.frameCount % this.frameDelay == 0) {
            this.randSparkle(this.sparkle1);
            this.randSparkle(this.sparkle2);
            this.randSparkle(this.sparkle3);
        }
    }
}