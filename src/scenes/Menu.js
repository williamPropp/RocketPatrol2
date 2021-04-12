class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");

    }

    create() {

        //Define Keys
        this.keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);

        //White Borders
	    this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0 ,0);
	    this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0 ,0);
	    this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0 ,0);
	    this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0 ,0);

        let menuTextConfig = { fontFamily: 'Courier', fontSize: '28px', backgroundColor: '#00FF00', color: '#000000', align: 'center', padding: { top: 5, bottom: 5 } };

        this.add.text(game.config.width/2, game.config.height/2-25, 'ROCKET PATROL REMAKE', menuTextConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2+25, 'PRESS \'F\' TO START', menuTextConfig).setOrigin(0.5);

    }

    update() {
        if(this.keyF.isDown) {
            this.scene.start("playScene");
        }
    }
}