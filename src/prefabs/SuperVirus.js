class SuperVirus extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue, name, speed) {
        super(scene, x, y, texture, frame, name, speed);
        scene.add.existing(this);
        this.pointValue = pointValue;
        this.name = name;
        this.speed = speed;
        this.virusTextConfig = { fontFamily: 'Courier', fontSize: '10px', backgroundColor: '#FFFFFF00', color: '#000000', align: 'CENTER', padding: { top: 5, bottom: 5 } };
        this.nameText = scene.add.text(this.x, this.y+20, this.genSuperVirusName(), this.virusTextConfig);
    }

    genSuperVirusName() {
        //Generate a random name for the virus
        let fileName = ['MEGAVIRUS', 'XxXxX', '***', 'D:<', 'SYS32', ';~;'];
        let fileExt = ['.x', '.y', '.z', '.xX', '.pdf', '.evil', '.AAaaa'];
        let nameIndex = Math.floor(Math.random()*fileName.length);
        let extIndex = Math.floor(Math.random()*fileExt.length);
        let virusName = fileName[nameIndex]+fileExt[extIndex];
        console.log('genSuperVirusName() made: '+virusName);
        return virusName;
    }

    update() {

        //Move ships and ships text across screen
        this.x -= this.speed;
        this.nameText.x -= this.speed;

        //Reset Text and Ship when they reach the end of the screen
        if(this.x < 0 - this.width) {
            this.x = game.config.width;
        }
        if(this.nameText.x < 0 - this.width) {
            this.nameText.x = game.config.width;
        }
        
    }

    reset() {
    
        //Reset ships and text position on reset
        this.x = game.config.width;
        this.nameText.x = game.config.width;
        this.nameText.setText(this.genSuperVirusName());

    }
}