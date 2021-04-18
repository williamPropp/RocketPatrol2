class Play extends Phaser.Scene {
    constructor() {
        super("playScene");


    }

    preload() {
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('starfield', './assets/starfield.png');
        this.load.audio('sfx_explosion', './assets/explosion38.wav');
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }

    genVirusName() {
        let fileName = ['sus', 'sketchy', 'malware', 'spyware', 'adware', 'secretSHHH', 'coinMiner', 'unAuth', 'evil', 'adminREAL', 'delsys32', 'legit', 'important', 'doNotDelete'];
        let fileExt = ['.pip', '.exe', '.vbs', '.xls', '.rtf', '.zip', '.jar'];
        let nameIndex = Math.floor(Math.random()*fileName.length);
        let extIndex = Math.floor(Math.random()*fileExt.length);
        let virusName = fileName[nameIndex]+fileExt[extIndex];
        console.log('genVirusName() generated name');
        return virusName;
    }

    create() {

        //Initialize gameOver state, score, and timer
        this.gameOver = false;
        this.p1Score = 0;

        //Create explosion animation
        this.anims.create({ key: 'explode', frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}), frameRate: 30 });

        //Starfield
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);

        //Create rocket and ships
        this.p1Rocket = new Rocket(this, game.config.width/2, 431, 'rocket').setOrigin(0.5, 0);

        //Generate ships
        this.ship1 = new Ship(this, 100, 120, 'spaceship', 0, 1, this.genVirusName()).setOrigin(0,0);
        this.ship2 = new Ship(this, 300, 200, 'spaceship', 0, 1, this.genVirusName()).setOrigin(0,0);
        this.ship3 = new Ship(this, 200, 240, 'spaceship', 0, 1, this.genVirusName()).setOrigin(0,0);
        this.ship4 = new Ship(this, 400, 300, 'spaceship', 0, 1, this.genVirusName()).setOrigin(0,0);

        //Green UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0);

        //White Borders
	    this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0 ,0);
	    this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0 ,0);
	    this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0 ,0);
	    this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0 ,0);

        //Display score
        let scoreConfig = { fontFamily: 'Courier', fontSize: '28px', backgroundColor: '#F3B141', color: '#843605', align: 'right', padding: { top: 5, bottom: 5 }, fixedWidth: 100 };
        this.scoreLeft = this.add.text(borderUISize+borderPadding, borderUISize+borderPadding*2, this.p1Score, scoreConfig);

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

        //Play game, unless gameOver = true
        if(!this.gameOver) {

            this.starfield.tilePositionX -= 4;
            this.p1Rocket.update();

            /*this.ship1text.x -= 3;
            this.ship2text.x -= 3;
            this.ship3text.x -= 3;
            this.ship4text.x -= 3;*/

            /*if(this.ship1text.x - this.ship1text.width) {
                this.ship1text.x = game.config.width;
            }*/
    

            this.ship1.update();
            this.ship2.update();
            this.ship3.update();
            this.ship4.update();
            
        }

        //Restart game when 'R' is pressed
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }

        //Rocket collision
        let r = this.p1Rocket;
        for(let s of [this.ship1, this.ship2, this.ship3, this.ship4]) {
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
        this.sound.play('sfx_explosion');
        ship.alpha = 0;
        ship.nameText.alpha = 0;
        let boom = this.add.sprite(ship.x, ship.y, 'explosion');
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