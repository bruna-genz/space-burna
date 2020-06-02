import "phaser";

export default class GameOver extends Phaser.Scene {
    constructor() {
        super({
            key: "GameOver"
        });
    }

    create() {
        console.log("game over")
        this.title = this.add.text(this.game.config.width * 0.5, 128, "GAME OVER", {
            fontFamily: 'monospace',
            fontSize: 48,
            fontStyle: 'bold',
            color: '#ffffff',
            align: 'center'
        }).setOrigin(0.5);

        this.sfx = {
            btnOver: this.sound.add("sndBtnOver"),
            btnDown: this.sound.add("sndBtnDown")
        };

        this.btnRestart = this.add.sprite(
            this.game.config.width * 0.5,
            this.game.config.height * 0.5,
            "sprBtnRestart"
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
}