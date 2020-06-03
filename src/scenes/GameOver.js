import "phaser";
import Constants from "../misc/constants";
import WebFontFile from "../misc/WebFontLoader";
import { postScore } from "../misc/ApiCalls";

export default class GameOver extends Phaser.Scene {
    constructor() {
        super("GameOver");
    }

    init(data) {
        this.gameScore = data.gameScore;
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

        this.addButtonFunctionality([this.btnSubmit, this.btnRestart])

        this.addButtonText(470, "Submit score")
        this.addButtonText(540, "Play again")

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

    addButtonText(y, text) {
        this.add.text( 
            this.game.config.width * 0.5,
            y,
            text,
            { color: "#000", fontSize: 20, fontFamily:'Orbitron' }
        ).setOrigin(0.5)
    }

    async submitScore() {
        this.playerName = this.nameInput.value
        if(this.playerName) {
            let result = await postScore(this.playerName, this.gameScore)
            return result
        } else {
            alert("Name required")
            return false
        }
    }

    addButtonFunctionality(arr) {
        arr.forEach((btn, i) => {
            btn.setInteractive()
            
            btn.on("pointerover", () => {
                this.sfx.btnOver.play(); 
            }, this);
        
            btn.on("pointerdown", () => {
            btn.setTexture(Constants.buttons.down);
            this.sfx.btnDown.play();
            }, this);

            btn.on("pointerup", async () => {
                btn.setTexture(Constants.buttons.up);
                if (i === 0) {
                    let result = await this.submitScore()
                    if (result) {
                        this.scene.start("Score")
                        this.deleteNameInput();
                    }
                } else {
                    this.scene.start("Game");
                    this.deleteNameInput();
                }
                
            }, this);
        })
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