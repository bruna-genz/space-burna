import "phaser";
import Constants from "../misc/constants";
import WebFontFile from "../misc/WebFontLoader";
import { getGameScores } from "../misc/ApiCalls";

export default class Score extends Phaser.Scene {
    constructor() {
        super("Score")
    }

    preload() {
        this.load.addFile(new WebFontFile(this.load, 'Orbitron'))
        this.load.image(Constants.background, "assets/baseBg.png");
        this.load.image(Constants.buttons.up, "assets/buttonUp.png");
        this.load.image(Constants.buttons.down, "assets/buttonDown.png");
        this.load.audio(Constants.audio.buttonOver, "assets/sndBtnOver.wav");
        this.load.audio(Constants.audio.buttonDown, "assets/sndBtnDown.wav");
    }

    create() {
        this.sfx = {
            btnOver: this.sound.add(Constants.audio.buttonOver),
            btnDown: this.sound.add(Constants.audio.buttonDown)
        };

        this.add.image(260, 440, "sprBg1")

        this.add.text(
            this.game.config.width * 0.5,
            70,
            "Score Board", {
                fontSize: 28,
                fontFamily: 'Orbitron'
            }
        ).setOrigin(0.5)

        this.btnPlay = this.add.sprite(
            this.game.config.width * 0.5,
            660,
            Constants.buttons.up
        );

        this.btnPlay.setInteractive()
            
        this.btnPlay.on("pointerover", () => {
            this.sfx.btnOver.play(); 
        }, this);
    
        this.btnPlay.on("pointerdown", () => {
            this.btnPlay.setTexture(Constants.buttons.down);
            this.sfx.btnDown.play();
        }, this);

        this.btnPlay.on("pointerup", async () => {
            this.btnPlay.setTexture(Constants.buttons.up);
            this.scene.start("Game"); 
        }, this);

        this.addButtonText(660, "Play again")

        this.setUpScores()
    }

    async setUpScores() {
        const resultObject = await getGameScores()
        this.scores = resultObject.result.sort((a, b) => (a.score > b.score) ? -1 : 1)
        
        for (let i = 0; i < 15; i++) {
            let y = 150 + (30 * i)

            this.addText(150, y, this.scores[i].user)
            this.addText(400, y, this.scores[i].score)
        }
    }
    
    addText(x, y, text) {
        this.add.text(
            x, 
            y, 
            text, 
            {   fontFamily: 'Orbitron',
                fontSize: 15,
                fontStyle: 'bold',
                color: '#ffffff',
                align: 'center'
            }).setOrigin(0.5); 
    }

    addButtonText(y, text) {
        this.add.text( 
            this.game.config.width * 0.5,
            y,
            text,
            { color: "#000", fontSize: 20, fontFamily:'Orbitron' }
        ).setOrigin(0.5)
    }
}
