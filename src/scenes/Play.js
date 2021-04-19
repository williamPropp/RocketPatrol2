class Play extends Phaser.Scene {
    constructor() {
        super("playScene");


    }

    preload() {
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('starfield', './assets/starfield.png');
        this.load.image('navBar', './assets/navBar.png');
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
        console.log(this.randomClick());

        //Initialize gameOver state, score, and timer
        this.gameOver = false;
        this.p1Score = 0;

        //Create explosion animation
        this.anims.create({ key: 'explode', frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 11, first: 0}), frameRate: 25 });

        this.add.tileSprite(0, 0, 640, 32, 'navBar').setOrigin(0, 0);

        //Starfield
        //this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);

        //Create rocket and ships
        this.p1Rocket = new Rocket(this, game.config.width/2, 420, 'rocket').setOrigin(0.5, 0);

        //Generate ships
        this.ship1 = new Ship(this, 100, 145, 'spaceship', 0, 1).setOrigin(0,0);
        this.ship2 = new Ship(this, 300, 200, 'spaceship', 0, 1).setOrigin(0,0);
        this.ship3 = new Ship(this, 200, 260, 'spaceship', 0, 1).setOrigin(0,0);

        /*//Black UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x111111).setOrigin(0, 0);*/

        /*//Grey Borders
	    this.add.rectangle(0, 0, game.config.width, borderUISize, 0x212121).setOrigin(0 ,0);
	    this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0x212121).setOrigin(0 ,0);
	    this.add.rectangle(0, 0, borderUISize, game.config.height, 0x212121).setOrigin(0 ,0);
	    this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0x212121).setOrigin(0 ,0);*/

        //Display score
        let scoreConfig = { fontFamily: 'Courier', fontSize: '28px', backgroundColor: '#153B00', color: '#8CFF00', align: 'right', padding: { top: 5, bottom: 5 }, fixedWidth: 100 };
        let highScoreConfig = { fontFamily: 'Courier', fontSize: '28px', backgroundColor: '#153B00', color: '#8CFF00', align: 'right', padding: { top: 5, bottom: 5 } };
        this.scoreLeft = this.add.text(borderUISize+borderPadding, borderUISize+borderPadding*2, this.p1Score, scoreConfig);
        this.scoreRight = this.add.text((game.config.width/2)+(borderUISize+borderPadding), borderUISize+borderPadding*2, 'High Score: ' + highScore, highScoreConfig);

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

        //console.log('p1score='+this.p1Score);
        
        if(this.p1Score > highScore) {
            highScore = this.p1Score;
        }
        this.scoreRight.setText('High Score: ' + highScore);

        //Play game, unless gameOver = true
        if(!this.gameOver) {

            //this.starfield.tilePositionX -= 4;
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