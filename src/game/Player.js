import "phaser";
import Entity from "./Entities"
import PlayerLaser from "./PlayerLaser"
import * as Logic from "../helpers/GameLogic";

export default class Player extends Entity {
    constructor(scene, x, y, key) {
        super(scene, x, y, key, "Player");
        this.setData("health", 100),
            this.setData("score", 0),
            this.setData("speed", 200);
        this.setData("isShooting", false);
        this.setData("timerShootDelay", 10);
        this.setData("timerShootCounter", Logic.setUpCounter(this.data.values));
        this.setData("shootingPower", 1);
        this.setData("isShield", false)
    }

    moveUp() {
        this.body.velocity.y = -this.getData("speed");
    }

    moveDown() {
        this.body.velocity.y = this.getData("speed");
    }

    moveLeft() {
        this.body.velocity.x = -this.getData("speed");
    }

    moveRight() {
        this.body.velocity.x = this.getData("speed");
    }

    update() {
        this.body.setVelocity(0, 0);

        this.x = Phaser.Math.Clamp(this.x, 0, this.scene.game.config.width);
        this.y = Phaser.Math.Clamp(this.y, 0, this.scene.game.config.height);

        this.setShootingTimer()
    }

    onDestroy() {
        this.scene.time.addEvent({
            delay: 1000,
            callback: () => {
                this.scene.scene.start("GameOver", {
                    gameScore: this.getData("score")
                });
            },
            callbackScope: this,
            loop: false
        });
    }

    addLaser(x, y) {
        let laser = new PlayerLaser(this.scene, x, y);
        this.scene.playerLasers.add(laser);
    }

    addExtraLaser() {
        let shootingPower = this.getData("shootingPower")

        if (shootingPower === 2) {
            this.addLaser((this.x + 30), this.y)
        } else if (shootingPower === 3) {
            this.addLaser((this.x + 30), this.y)
            this.addLaser((this.x - 20), this.y)
        }
    }

    setShootingTimer() {
        if (this.getData("isShooting")) {

            if (this.getData("timerShootCounter") < this.getData("timerShootDelay")) {
                Logic.increaseShootCounter(this.data.values)

            } else {
                this.addLaser(this.x + 5, this.y)
                this.addExtraLaser()
                this.scene.sfx.laser.play();
                this.setData("timerShootCounter", 0)
            }
        }
    }
}