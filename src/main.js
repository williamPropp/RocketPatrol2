let config = {
    type: Phaser.Canvas,
    width: 640,
    height: 480,
    scene: [Menu, Play]
}

let game = new Phaser.Game(config);

let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

console.log("hello from main.js");

// python -m http.server