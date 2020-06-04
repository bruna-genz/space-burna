import "phaser";
import Constants from "../misc/constants";
import { postScore } from "../misc/ApiCalls";
import * as Helper from "../misc/Helpers";

export default class GameOver extends Phaser.Scene {
    constructor() {
        super("GameOver");
    }

    init(data) {
        this.gameScore = data.gameScore;
    }

    create() {   
        this.sfx = {
            btnOver: this.sound.add(Constants.audio.buttonOver),
            btnDown: this.sound.add(Constants.audio.buttonDown)
        };

        this.add.image(260, 400, Constants.background)

        this.addText(200, "GAME OVER", 45);

        this.addText(300, `Your score: ${this.gameScore}`, 25)

        this.nameInput = this.createNameInput()

        this.btnSubmit = this.add.sprite(
            this.game.config.width * 0.5,
            470,
            Constants.buttons.up
        );

        this.btnRestart = this.add.sprite(
            this.game.config.width * 0.5,
            540,
            Constants.buttons.up
        );

        Helper.addButtonFunctionality(this, this.btnSubmit, () => this.handleScore(this))
        Helper.addButtonFunctionality(this, this.btnRestart, () => this.restartGame(this))

        Helper.addButtonText(this, 470, "Submit score")
        Helper.addButtonText(this, 540, "Play again")

    }

    addText(y, text, size) {
        this.add.text(
            this.game.config.width * 0.5, 
            y, 
            text, 
            {   fontFamily: 'Orbitron',
                fontSize: size,
                fontStyle: 'bold',
                color: '#ffffff',
                align: 'center'
            }).setOrigin(0.5); 
    }

    async submitScore(scene) {
        scene.playerName = scene.nameInput.value
        if(scene.playerName) {
            let result = await postScore(scene.playerName, scene.gameScore)
            return result
        } else {
            alert("Name required")
            return false
        }
    }

    async handleScore(scene) {
        let result = await scene.submitScore(scene)
        if (result) {
            scene.scene.start("Score")
            scene.deleteNameInput();
        }
    }

    restartGame(scene) {
        scene.scene.start("Game");
        scene.deleteNameInput();
    }

    createNameInput() {
        const nameInput = document.createElement('input')
        nameInput.placeholder = "Your name here"
        nameInput.type = 'text'
        document.querySelector('#game-container').appendChild(nameInput)

        return nameInput;
    }

    deleteNameInput() {
        this.nameInput.parentElement.removeChild(this.nameInput)
    }
}