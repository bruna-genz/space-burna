import "phaser";

export default class MainMenu extends Phaser.Scene {
    constructor() {
        super({
            key: "MainMenu"
        });
    }

    preload() {
        this.load.image("sprBg1", "assets/baseBg.png");
        this.load.image("sprBtnPlay", "assets/buttonUp.png");
        this.load.image("sprBtnPlayDown", "assets/buttonDown.png");
        this.load.image("sprBtnRestart", "assets/sprBtnRestart.png");
        this.load.image("sprBtnRestartHover", "assets/sprBtnRestartHover.png");
        this.load.image("sprBtnRestartDown", "assets/sprBtnRestartDown.png");
        this.load.audio("sndBtnOver", "assets/sndBtnOver.wav");
        this.load.audio("sndBtnDown", "assets/sndBtnDown.wav");
    }

    create() {
        this.add.image(260, 440, "sprBg1")
        
        this.sfx = {
            btnOver: this.sound.add("sndBtnOver"),
            btnDown: this.sound.add("sndBtnDown")
        };

        this.btnPlay = this.add.sprite(
            this.game.config.width * 0.5,
            this.game.config.height * 0.5,
            "sprBtnPlay"
        ).setScale(0.8);

        this.btnPlay.setInteractive();

        this.btnPlay.on("pointerover", function () {
            this.sfx.btnOver.play(); 
        }, this);


        this.btnPlay.on("pointerdown", function () {
            this.btnPlay.setTexture("sprBtnPlayDown");
            this.sfx.btnDown.play();
        }, this);

        this.btnPlay.on("pointerup", function () {
            this.btnPlay.setTexture("sprBtnPlay");
            this.scene.start("Game");
        }, this);

        this.add.text( 
            this.game.config.width * 0.5,
            this.game.config.height * 0.5,
            "Play",
            { color: "#000", fontSize: 20 }
        ).setOrigin(0.5)

        this.title = this.add.text(this.game.config.width * 0.5, 128, "SPACE SHOOTER", {
            fontFamily: 'monospace',
            fontSize: 48,
            fontStyle: 'bold',
            color: '#ffffff',
            align: 'center'
          }).setOrigin(0.5);        
    }
}