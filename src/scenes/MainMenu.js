import "phaser";
import Constants from "../misc/constants";
import WebFontFile from "../misc/WebFontLoader";
import * as Helper from "../misc/Helpers";

export default class MainMenu extends Phaser.Scene {
    constructor() {
        super({
            key: "MainMenu"
        });
    }

    preload() {
        this.load.image(Constants.background, "assets/baseBg.png");
        this.load.image(Constants.buttons.up, "assets/buttonUp.png");
        this.load.image(Constants.buttons.down, "assets/buttonDown.png");
        this.load.audio(Constants.audio.buttonOver, "assets/sndBtnOver.wav");
        this.load.audio(Constants.audio.buttonDown, "assets/sndBtnDown.wav");

        this.load.addFile(new WebFontFile(this.load, 'Orbitron'))
    }

    create() {
        this.add.image(260, 440, Constants.background)
        
        this.sfx = {
            btnOver: this.sound.add(Constants.audio.buttonOver),
            btnDown: this.sound.add(Constants.audio.buttonDown)
        };

        this.btnInstructions = this.add.sprite(
            this.game.config.width * 0.5,
            400,
            Constants.buttons.up
        );

        this.btnPlay = this.add.sprite(
            this.game.config.width * 0.5,
            460,
            Constants.buttons.up
        );

        Helper.addButtonFunctionality(this, this.btnInstructions, () => this.scene.start("Instructions"));
        Helper.addButtonFunctionality(this, this.btnPlay, () => this.scene.start("Game"));
        

        Helper.addButtonText(this, 400, "Instructions")
        Helper.addButtonText(this, 460, "Play")

        this.title = this.add.text(this.game.config.width * 0.5, 250, "SPACE BURNA", {
            fontFamily: 'Orbitron',
            fontSize: 45,
            fontStyle: 'bold',
            color: '#ffffff',
            align: 'center'
          }).setOrigin(0.5);        
    }
}