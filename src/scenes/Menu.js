console.log("hello from menu.js");

class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
        console.log("menu scene created.");
    }

    create() {
        this.add.text(20,20, "Rocket Patrol Menu");
        this.scene.start("playScene");
    }
}