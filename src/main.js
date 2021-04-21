'use strict';

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
let shipResetY = 400;

//Declare other global variables
let highScore = 0;

//Reserve keyboard vars
let keyF, keyR, keyG, keyS, keyLEFT, keyRIGHT;

/*
Assets Used:
Sci-fi Texture: https://www.freepik.com/premium-vector/circuit-board-vector-seamless-texture-sci-fi-electronic-background_4080063.htm
click sounds: https://freesound.org/people/joebro10/sounds/219318/
Sountrack: I made it in Ableton
*/
