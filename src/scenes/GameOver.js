import "phaser";
import Constants from "../misc/constants";
import WebFontFile from "../misc/WebFontLoader";
import { postScore } from "../misc/ApiCalls";

export default class GameOver extends Phaser.Scene {
    constructor() {
        super("GameOver");
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

        this.title = this.add.text(this.game.config.width * 0.5, 250, "GAME OVER", {
            fontFamily: 'Orbitron',
            fontSize: 45,
            fontStyle: 'bold',
            color: '#ffffff',
            align: 'center'
          }).setOrigin(0.5); 

        this.sfx = {
            btnOver: this.sound.add(Constants.audio.buttonOver),
            btnDown: this.sound.add(Constants.audio.buttonDown)
        };

        this.btnRestart = this.add.sprite(
            this.game.config.width * 0.5,
            this.game.config.height * 0.5,
            Constants.buttons.up
        );

        this.btnRestart.setInteractive();

        this.btnRestart.on("pointerover", function () {
            this.btnRestart.setTexture("sprBtnRestartHover"); 
            this.sfx.btnOver.play();
        }, this);

        this.btnRestart.on("pointerout", function () {
            this.setTexture("sprBtnRestart");
        });

        this.btnRestart.on("pointerdown", function () {
            this.btnRestart.setTexture("sprBtnRestartDown");
            this.sfx.btnDown.play();
        }, this);

        this.btnRestart.on("pointerup", function () {
            this.btnRestart.setTexture("sprBtnRestart");
            this.scene.start("Game");
        }, this);
    }


    createNameInput() {
        const nameInput = document.createElement('input')
        nameInput.type = 'text'
        nameInput.style.backgroundColor = 'white'
        nameInput.style.position = 'absolute'
        nameInput.style.top = '25em'
        nameInput.style.right = '15em'
        nameInput.style.border = 'none'
        document.querySelector('body').appendChild(nameInput)
    }
}