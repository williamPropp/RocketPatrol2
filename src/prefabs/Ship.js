class Ship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue, name) {
        super(scene, x, y, texture, frame, name);
        scene.add.existing(this);
        this.pointValue = pointValue;
        this.name = name;
        this.virusTextConfig = { fontFamily: 'Courier', fontSize: '10px', backgroundColor: '#000000', color: '#FFFFFF', align: 'center', padding: { top: 5, bottom: 5 } };
        this.nameText = scene.add.text(this.x, this.y+35, this.name, this.virusTextConfig);

        console.log(this.name);
    }

    genVirusName() {
        let fileName = ['sus', 'sketchy', 'malware', 'spyware', 'adware', 'secretSHHH', 'coinMiner', 'unAuth', 'evil', 'adminREAL', 'delsys32', 'legit', 'important', 'doNotDelete'];
        let fileExt = ['.pip', '.exe', '.vbs', '.xls', '.rtf', '.zip', '.jar'];
        let nameIndex = Math.floor(Math.random()*fileName.length);
        let extIndex = Math.floor(Math.random()*fileExt.length);
        let virusName = fileName[nameIndex]+fileExt[extIndex];
        return virusName;
    }

    update() {

        //Move ships across screen
        this.x -= 3;
        this.nameText.x -= 3;
        if(this.x < 0 - this.width) {
            this.x = game.config.width;
        }
        if(this.nameText.x < 0 - this.width) {
            this.nameText.x = game.config.width;
        }

        //let virusTextConfig = { fontFamily: 'Courier', fontSize: '10px', backgroundColor: '#000000', color: '#000000', align: 'center', padding: { top: 5, bottom: 5 } };
        //this.add.text(this.x, this.y+10, this.name, virusTextConfig).setOrigin(0,0);
        
    }

    reset() {
    
        //Reset ships and text position on reset
        this.x = game.config.width;
        this.nameText.x = game.config.width;
        this.nameText.setText(this.genVirusName());

    }
}