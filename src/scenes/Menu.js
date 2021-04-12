class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
        console.log("menu scene created.");
    }

    create() {
        console.log("hello from Menu.js");
        this.scene.start("playScene");
    }
}