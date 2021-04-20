class Ship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue, name) {
        super(scene, x, y, texture, frame, name);
        scene.add.existing(this);
        this.pointValue = pointValue;
        this.name = name;
        this.virusTextConfig = { fontFamily: 'Courier', fontSize: '10px', backgroundColor: '#FFFFFF00', color: '#000000', align: 'CENTER', padding: { top: 5, bottom: 5 } };
        this.nameText = scene.add.text(this.x, this.y+45, this.genVirusName(), this.virusTextConfig);
    }

    genVirusName() {
        let fileName = ['sus', 'sketchy', 'malware', 'spyware', 'adware', 'secretSHHH', 'coinMiner', 'unAuth', 'evil', 'adminREAL', 'delsys32', 'legit', 'important', 'doNotDelete'];
        let fileExt = ['.pip', '.exe', '.vbs', '.xls', '.rtf', '.zip', '.jar'];
        let nameIndex = Math.floor(Math.random()*fileName.length);
        let extIndex = Math.floor(Math.random()*fileExt.length);
        let virusName = fileName[nameIndex]+fileExt[extIndex];
        console.log('genVirusName() made: '+virusName);
        return virusName;
    }

    update() {

        //Move ships and ships text across screen
        this.x -= 3;
        this.nameText.x -= 3;
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
        this.nameText.setText(this.genVirusName());

    }
}