import "phaser";
import Constants from "../helpers/constants";
import { getGameScores } from "../helpers/ScoreLogic";
import * as buttonHelper from "../helpers/buttonHelpers";

export default class Score extends Phaser.Scene {
    constructor() {
        super("Score")
    }

    create() {
        this.sfx = {
            btnOver: this.sound.add(Constants.audio.buttonOver),
            btnDown: this.sound.add(Constants.audio.buttonDown)
        };

        this.add.image(260, 440, Constants.background)

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
            640,
            Constants.buttons.up
        );

        this.btnMenu = this.add.sprite(
            this.game.config.width * 0.5,
            700,
            Constants.buttons.up
        );

        buttonHelper.addButtonFunctionality(this, this.btnPlay, () => this.scene.start("Game"))
        buttonHelper.addButtonFunctionality(this, this.btnMenu, () => this.scene.start("MainMenu"))
        
        buttonHelper.addButtonText(this, 640, "Play")
        buttonHelper.addButtonText(this, 700, "Menu")

        this.setUpScores()
    }

    async setUpScores() {
        const resultObject = await getGameScores()

        if (Array.isArray(resultObject.result)) {
            this.scores = resultObject.result.sort((a, b) => (a.score > b.score) ? -1 : 1)
        
            for (let i = 0; i < 15; i++) {
                let y = 150 + (30 * i)

                this.addText(150, y, this.scores[i].user)
                this.addText(400, y, this.scores[i].score)
            }
        } else {
            this.addText(150, 160, resultObject)
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
