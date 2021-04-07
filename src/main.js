let config = {
    type: Phaser.Canvas,
    width: 640,
    height: 480,
    scene: [Menu, Play],
}

let game = new Phaser.Game();

let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 15;

// python -m http.server