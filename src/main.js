let config = {
    type: Phaser.Canvas,
    width: 640,
    height: 480,
    scene: [Menu, Play]
}

let game = new Phaser.Game(config);

//Declare global size variables
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

//Reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT;

//just testing a change
