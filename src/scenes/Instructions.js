import "phaser";
import Constants from "../misc/constants";
import WebFontFile from "../misc/WebFontLoader";

export default class Instructions extends Phaser.Scene {
    constructor() {
        super({
            key: "Instructions"
        });
    }

    preload() {
        this.load.addFile(new WebFontFile(this.load, 'Orbitron'))
        this.load.image(Constants.background, "assets/baseBg.png");
        this.load.image(Constants.player, "assets/player.png")
        this.load.image(Constants.enemy0, "assets/enemy0.png")
        this.load.image(Constants.enemy1, "assets/enemy1.png")
        this.load.image(Constants.meteor1, "assets/meteor1.png")
        this.load.image(Constants.bonus.shooting, "assets/bonusShoot.png")
        this.load.image(Constants.bonus.shield, "assets/bonusShield.png")
        this.load.image(Constants.buttons.up, "assets/buttonUp.png");
        this.load.image(Constants.buttons.down, "assets/buttonDown.png");
        this.load.audio(Constants.audio.buttonOver, "assets/sndBtnOver.wav");
        this.load.audio(Constants.audio.buttonDown, "assets/sndBtnDown.wav");
    }

    create() {
        this.add.image(260, 440, "sprBg1")

        this.add.text(
            this.game.config.width * 0.5,
            70,
            "Instructions", {
                fontSize: 28,
                fontFamily: 'Orbitron'
            }
        ).setOrigin(0.5)

        this.add.image(110, 150, Constants.player).setScale(0.5)

        this.addSmallText(130,
            `This is your ship. 
You can use the arrow keys to move. 
Use space to shoot.`)
   

        this.add.image(110, 235, Constants.enemy0).setScale(0.4)
        this.add.image(110, 285, Constants.enemy1).setScale(0.4)
        this.add.image(110, 335, Constants.meteor1).setScale(0.4)

        this.addSmallText(245,
            `These are your enemies. 
Whatch out for them! 
Avoid their laser shots and collisions.
Shots reduce your ship's health by 25%.`)

        this.add.image(110, 405, Constants.bonus.shooting)
        this.add.image(110, 445, Constants.bonus.shield)

        this.addSmallText(390,
            `These are bonus items. 
Catching one of them will either 
increase your shooting power or 
give you a temporary shield.`)

        this.add.text(70, 520,
            `Kill the enemies and survive for the 
longest possible time.
Good luck!`, {
                fontSize: 20,
                fontFamily: 'Orbitron',
                align: 'center'

            })

            this.btnPlay = this.add.sprite(
                this.game.config.width * 0.5,
                660,
                Constants.buttons.up
            );

            this.btnPlay.setInteractive();

            this.btnPlay.on("pointerover", () => {
                this.sfx.btnOver.play(); 
            }, this);
        
            this.btnPlay.on("pointerdown", () => {
            this.btnPlay.setTexture(Constants.buttons.down);
            this.sfx.btnDown.play();
            }, this);

            this.btnPlay.on("pointerup", () => {
                this.btnPlay.setTexture(Constants.buttons.up);
                this.scene.start("Game");                
            }, this)

            this.add.text( 
                this.game.config.width * 0.5,
                660,
                "Play",
                { color: "#000", fontSize: 20, fontFamily:'Orbitron' }
            ).setOrigin(0.5)        
    }     

    addSmallText(y, text) {
        this.add.text(
            165,
            y,
            text, {
                fontSize: 15,
            }
        )
    }
}