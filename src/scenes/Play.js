class Play extends Phaser.Scene {
    constructor() {
        super("playScene");

    }

    preload() {
        //Load all assets
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('superVirus', './assets/superVirus.png');
        this.load.image('sky', './assets/sky.png');
        this.load.image('clouds', './assets/clouds.png');
        this.load.image('hillFront', './assets/hillFront.png');
        this.load.image('hillBack', './assets/hillBack.png');
        this.load.image('navBar', './assets/navBar.png');
        this.load.image('toolBar', './assets/toolBar.png');
        this.load.image('hsWindow', './assets/highScoreWindow.png');
        this.load.image('scoreWindow', './assets/scoreWindow.png');
        this.load.image('gameOver', './assets/gameOver.png');
        this.load.audio('sfx_click0', './assets/click0.wav');
        this.load.audio('sfx_click1', './assets/click1.wav');
        this.load.audio('sfx_click2', './assets/click2.wav');
        this.load.audio('sfx_click3', './assets/click3.wav');
        this.load.audio('sfx_click4', './assets/click4.wav');
        this.load.audio('chord', './assets/chord.wav');
        this.load.audio('music', './assets/music.wav');
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 57, frameHeight: 80, startFrame: 0, endFrame: 11});
    }

    randomClick() {
        //play random explosion sfx (in this case, it's clicks)
        let clickArray = ['sfx_click0','sfx_click1','sfx_click2','sfx_click3','sfx_click4'];
        let clickIndex = Math.floor(Math.random() * 5);
        return clickArray[clickIndex];
    }

    gameOverGlitchy() {
            //Create glitch effect by stacking gameover boxes on top of eachother in diagonal pattern
            this.xOffset += 5;
            this.yOffset += 5;
            this.add.tileSprite(this.xOffset-5, this.yOffset, 332, 200, 'gameOver').setOrigin(0, 0);

            //Draw toolBar and navBar over glitch effetc
            this.add.tileSprite(0, 0, 640, 32, 'navBar').setOrigin(0, 0);
            this.add.tileSprite(0, game.config.height-40, 640, 40, 'toolBar').setOrigin(0, 0);


            if(this.xOffset >= 640) {
                this.xOffset = 0;
            }
            if(this.yOffset >= 480) {
                this.yOffset = 0;
            } 
    }

    create() {

        //Initialize gameOver state and score
        this.gameOver = false;
        this.glitchFrameCount = 0;
        this.p1Score = 0;
        this.xOffset = 0;
        this.yOffset = 0;

        //UI values
        this.highScoreX = (game.config.width/2)+(3*borderUISize+borderPadding);
        this.highScoreY = (borderUISize+borderPadding*2);
        this.scoreX = (borderUISize+borderPadding);
        this.scoreY = (borderUISize+borderPadding*2);

        //Create explosion animation
        this.anims.create({ key: 'explode', frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 11, first: 0}), frameRate: 25 });

        //Create sound object for error
        this.errorSound = this.sound.add('chord');

        //Initialize and play music
        this.soundtrack = this.sound.add('music', {
            volume: 0.3,
            rate: 0.6,
        });
        this.soundtrack.play();

        //Reset rate when scene resets
        this.soundtrack.setRate(0.6);

        //Parallax bg
        this.sky = this.add.tileSprite(0, 0, 700, 480, 'sky').setOrigin(0, 0);
        this.clouds = this.add.tileSprite(0, 0, 700, 480, 'clouds').setOrigin(0, 0);
        this.hillBack = this.add.tileSprite(0, 0, 700, 480, 'hillBack').setOrigin(0, 0);
        this.hillFront = this.add.tileSprite(0, 0, 700, 480, 'hillFront').setOrigin(0, 0);
        this.parallaxSpeed = 4;

        //Create navBar, toolBar, and score windows
        this.add.tileSprite(0, 0, 640, 32, 'navBar').setOrigin(0, 0);
        this.add.tileSprite(0, game.config.height-40, 640, 40, 'toolBar').setOrigin(0, 0);
        this.add.tileSprite(this.highScoreX-10, this.highScoreY-5, 200, 46, 'hsWindow').setOrigin(0, 0);
        this.add.tileSprite(this.scoreX-10, this.scoreY-5, 100, 46, 'scoreWindow').setOrigin(0, 0);

        //Create rocket and ships
        this.p1Rocket = new Rocket(this, game.config.width/2, shipResetY, 'rocket').setOrigin(0.5, 0);

        //Generate ships
        this.ship1 = new Ship(this, 100, 140, 'spaceship', 0, 1, ' ', 3).setOrigin(0,0);
        this.ship2 = new Ship(this, 300, 220, 'spaceship', 0, 1, ' ', 3).setOrigin(0,0);
        this.ship3 = new Ship(this, 200, 300, 'spaceship', 0, 1, ' ', 3).setOrigin(0,0);

        //Generate superVirus
        this.xXvirusXx = new SuperVirus(this, 350, 100, 'superVirus', 0, 5, ' ', 5).setOrigin(0,0);

        //Display score
        let scoreConfig = { fontFamily: 'Helvetica', fontSize: '28px', backgroundColor: '#FFFFFF00', color: '#000000', align: 'right', padding: { top: 5, bottom: 5 } };
        this.scoreLeft = this.add.text(this.scoreX, this.scoreY, this.p1Score, scoreConfig);
        this.scoreRight = this.add.text(this.highScoreX, this.highScoreY, 'High Score: ' + highScore, scoreConfig);

        //Define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyG = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.G);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        //scoreConfig.fixedWidth = 0;

        //30 seconds until speedUp
        this.clock = this.time.delayedCall(30000, () => {
            this.speedUp = true;
        }, null, this);

        //60 Seconds to play, then gameOver
        this.clock2 = this.time.delayedCall(60000, () => {
            this.gameOver = true;
        }, null, this);
    }

    update() {
        
        //If user surpasses highScore, make their score highScore and apply it to the HighScore box
        if(this.p1Score > highScore) {
            highScore = this.p1Score;
        }
        this.scoreRight.setText('High Score: ' + highScore);

        //SpeedUp increases ship speed, background speed, and music playback rate
        if(this.speedUp) {
            this.soundtrack.setRate(0.9);
            this.parallaxSpeed = 8;
            for(let s of [this.ship1, this.ship2, this.ship3]) {
                s.speed = 6;
            }
            this.xXvirusXx.speed = 9;
            this.speedUp = false;
        }

        //Play glitchy gameOver
        if(this.gameOver) {
            //Slow soundtrack to playback rate of 0.2
            this.soundtrack.setRate(0.2);
            
            this.glitchFrameCount++;
            if(this.glitchFrameCount % 2 == 0) {
                this.gameOverGlitchy();
            }
            if(this.glitchFrameCount % 6 == 0) {
                this.errorSound.play();
            }

        }

        //Play game, unless gameOver = true
        if(!this.gameOver) {

            //Scroll background with paralax
            this.clouds.tilePositionX -= (this.parallaxSpeed * 0.5);
            this.hillBack.tilePositionX -= (this.parallaxSpeed * 0.75);
            this.hillFront.tilePositionX -= this.parallaxSpeed;

            //Update rocket and ships
            this.p1Rocket.update();
            this.ship1.update();
            this.ship2.update();
            this.ship3.update();
            this.xXvirusXx.update();
            
        }

        //Rocket collision
        let r = this.p1Rocket;
        for(let s of [this.ship1, this.ship2, this.ship3, this.xXvirusXx]) {
            if(r.x < s.x + s.width &&
               r.x + r.width > s.x &&
               r.y < s.y + s.height &&
               r.y + r.height > s.y) {
                   //Reset ship
                   r.reset();
                   this.destroyShip(s);
               }
        }

        //Restart game when 'R' is pressed during gameOver screen
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.soundtrack.stop();
            this.scene.restart();
        }

        //CHEAT CODES: S to speed up, G to skip to gameOver screen

        //Press S to skip to fast speed
        if(Phaser.Input.Keyboard.JustDown(keyS)) {
            this.speedUp = true;
        } 

        //Press G to skip to gameOver
        if(Phaser.Input.Keyboard.JustDown(keyG)) {
            this.gameOver = true;
        }
    }

    destroyShip(ship) {

        //Play random click sound
        this.sound.play(this.randomClick());

        //Make ship and text invisible
        ship.alpha = 0;
        ship.nameText.alpha = 0;

        //Play explosion animation
        let boom = this.add.sprite(ship.x+40, ship.y+40, 'explosion');
        boom.anims.play('explode');

        //After animation, reset ship
        boom.on('animationcomplete', () => {
            ship.reset();
            ship.alpha = 1;
            ship.nameText.alpha = 1;
            boom.destroy();
        });

        //Add pointValue of ship destroyed to score, and write it in the score box
        this.p1Score += ship.pointValue;
        this.scoreLeft.setText(this.p1Score);

    }
}