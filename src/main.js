// (This is all included in REAMDME.md)

// # William Propp
// # Virus Patrol
// # 04/20/2021
// # Project Completion : 20 hours

// a modded remake of the game Rocket Patrol in javascript

// Modifications Implemented:
// (60) Redesign the game's artwork, UI, and sound to change its theme/aesthetic (to something other than sci-fi) 
// (20) Create a new spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points 
// (10) Implement parallax scrolling 
// (10) Create 4 new explosion SFX and randomize which one plays on impact (*Randomized Clicks*)
// (5)  Track a high score that persists across scenes and display it in the UI
// (5)  Add your own (copyright-free) background music to the Play scene (*I made my own music*)
// (5)  Implement the speed increase that happens after 30 seconds in the original game
 
// Total: 115

// Cheat Codes:
// S: skip to 30 seconds to speed up the game
// G: skip to gameOver screen

// Assets Used:
// click sounds: https://freesound.org/people/joebro10/sounds/219318/

// Help:
// Ishaan helped lead me in the right direction on how to implement moving text

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
