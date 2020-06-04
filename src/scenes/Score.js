import "phaser";
import Constants from "../misc/constants";
import { getGameScores } from "../misc/ApiCalls";
import * as Helper from "../misc/Helpers";

export default class Score extends Phaser.Scene {
    constructor() {
        super("Score")
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

        Helper.addButtonFunctionality(this, this.btnPlay, () => this.scene.start("Game"))
        Helper.addButtonText(this, 660, "Play again")

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
}
