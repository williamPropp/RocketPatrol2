class Play extends Phaser.Scene {
    constructor() {
        super("playScene");


    }

    preload() {
        //Load all assets
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('starfield', './assets/starfield.png');
        this.load.image('sky', './assets/sky.png');
        this.load.image('clouds', './assets/clouds.png');
        this.load.image('hillFront', './assets/hillFront.png');
        this.load.image('hillBack', './assets/hillBack.png');
        this.load.image('navBar', './assets/navBar.png');
        this.load.image('hsWindow', './assets/highScoreWindow.png');
        this.load.image('scoreWindow', './assets/scoreWindow.png');
        this.load.audio('sfx_click0', './assets/click0.wav');
        this.load.audio('sfx_click1', './assets/click1.wav');
        this.load.audio('sfx_click2', './assets/click2.wav');
        this.load.audio('sfx_click3', './assets/click3.wav');
        this.load.audio('sfx_click4', './assets/click4.wav');
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 57, frameHeight: 80, startFrame: 0, endFrame: 11});
    }

    randomClick() {
        let clickArray = ['sfx_click0','sfx_click1','sfx_click2','sfx_click3','sfx_click4'];
        let clickIndex = Math.floor(Math.random() * 5);
        return clickArray[clickIndex];
    }

    create() {

        //Initialize gameOver state and score
        this.gameOver = false;
        this.p1Score = 0;

        //UI values
        this.highScoreX = (game.config.width/2)+(3*borderUISize+borderPadding);
        this.highScoreY = (borderUISize+borderPadding*2);
        this.scoreX = (borderUISize+borderPadding);
        this.scoreY = (borderUISize+borderPadding*2);

        //Create explosion animation
        this.anims.create({ key: 'explode', frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 11, first: 0}), frameRate: 25 });

        //Parallax bg
        this.sky = this.add.tileSprite(0, 0, 700, 480, 'sky').setOrigin(0, 0);
        this.clouds = this.add.tileSprite(0, 0, 700, 480, 'clouds').setOrigin(0, 0);
        this.hillBack = this.add.tileSprite(0, 0, 700, 480, 'hillBack').setOrigin(0, 0);
        this.hillFront = this.add.tileSprite(0, 0, 700, 480, 'hillFront').setOrigin(0, 0);
        this.parallaxSpeed = 4;

        //Create navBar, toolBar, and score windows
        this.add.tileSprite(0, 0, 640, 32, 'navBar').setOrigin(0, 0);
        this.add.tileSprite(this.highScoreX-10, this.highScoreY-5, 200, 46, 'hsWindow').setOrigin(0, 0);
        this.add.tileSprite(this.scoreX-10, this.scoreY-5, 100, 46, 'scoreWindow').setOrigin(0, 0);

        //Create rocket and ships
        this.p1Rocket = new Rocket(this, game.config.width/2, 420, 'rocket').setOrigin(0.5, 0);

        //Generate ships
        this.ship1 = new Ship(this, 100, 120, 'spaceship', 0, 1).setOrigin(0,0);
        this.ship2 = new Ship(this, 300, 200, 'spaceship', 0, 1).setOrigin(0,0);
        this.ship3 = new Ship(this, 200, 280, 'spaceship', 0, 1).setOrigin(0,0);

        /*//Black UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x111111).setOrigin(0, 0);*/

        /*//Grey Borders
	    this.add.rectangle(0, 0, game.config.width, borderUISize, 0x212121).setOrigin(0 ,0);
	    this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0x212121).setOrigin(0 ,0);
	    this.add.rectangle(0, 0, borderUISize, game.config.height, 0x212121).setOrigin(0 ,0);
	    this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0x212121).setOrigin(0 ,0);*/

        //Display score
        let scoreConfig = { fontFamily: 'Helvetica', fontSize: '28px', backgroundColor: '#FFFFFF00', color: '#000000', align: 'right', padding: { top: 5, bottom: 5 } };
        this.scoreLeft = this.add.text(this.scoreX, this.scoreY, this.p1Score, scoreConfig);
        this.scoreRight = this.add.text(this.highScoreX, this.highScoreY, 'High Score: ' + highScore, scoreConfig);

        //Define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        //60 seconds to play
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(60000, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, '(R)estart', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);

    }

    update() {
        
        
        if(this.p1Score > highScore) {
            highScore = this.p1Score;
        }
        this.scoreRight.setText('High Score: ' + highScore);

        //Play game, unless gameOver = true
        if(!this.gameOver) {

            this.clouds.tilePositionX -= (this.parallaxSpeed * 0.5);
            this.hillBack.tilePositionX -= (this.parallaxSpeed * 0.75);
            this.hillFront.tilePositionX -= this.parallaxSpeed;

            this.p1Rocket.update();
            this.ship1.update();
            this.ship2.update();
            this.ship3.update();
            
        }

        //Restart game when 'R' is pressed
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }

        //Rocket collision
        let r = this.p1Rocket;
        for(let s of [this.ship1, this.ship2, this.ship3]) {
            if(r.x < s.x + s.width &&
               r.x + r.width > s.x &&
               r.y < s.y + s.height &&
               r.y + r.height > s.y) {
                   r.reset();
                   this.destroyShip(s);
               }
        }
    }

    destroyShip(ship) {
        this.sound.play(this.randomClick());
        ship.alpha = 0;
        ship.nameText.alpha = 0;
        let boom = this.add.sprite(ship.x+40, ship.y+40, 'explosion');
        boom.anims.play('explode');
        boom.on('animationcomplete', () => {
            ship.reset();
            ship.alpha = 1;
            ship.nameText.alpha = 1;
            boom.destroy();
        });

        this.p1Score += ship.pointValue;
        this.scoreLeft.setText(this.p1Score);

    }
}