import "phaser";
import Player from "../game/Player";
import GunShip from "../game/GunShip";
import ChaserShip from "../game/ChaserShip";
import CarrierShip from "../game/CarrierShip";

export default class Game extends Phaser.Scene {
    constructor() {
        super({
            key: "Game"
        });
    }

    preload() {
        this.load.image("sprBg1", "assets/baseBg.png");
        this.load.image("sprBg0", "assets/BgStars1.png");
        this.load.spritesheet("sprExplosion", "assets/explosion.png", {
            frameWidth: 256,
            frameHeight: 256
        });
        this.load.image("enemy0", "assets/enemy0.png");
        this.load.image("enemy1", "assets/enemy1.png");
        this.load.image("enemy2_1", "assets/meteor1.png");
        this.load.image("enemy2_2", "assets/meteor2.png");
        this.load.image("enemy2_3", "assets/meteor3.png");
        this.load.image("enemy2_4", "assets/meteor4.png");
        this.load.image("laserEnemy", "assets/laserEnemy.png");
        this.load.image("laserPlayer", "assets/laserPlayer.png");
        this.load.image("player", "assets/player.png");
        
        this.load.audio("sndExplode0", "assets/sndExplode0.wav");
        this.load.audio("sndExplode1", "assets/sndExplode1.wav");
        this.load.audio("sndLaser", "assets/sndLaser.wav");
    }

    create() {
        this.add.image(260, 440, "sprBg1")
        
        this.anims.create({
            key: "sprExplosion",
            frames: this.anims.generateFrameNumbers("sprExplosion"),
            frameRate: 15,
            repeat: 0
        });

        this.sfx = {
            explosions: [
                this.sound.add("sndExplode0"),
                this.sound.add("sndExplode1")
            ],
            laser: this.sound.add("sndLaser")
        };

        this.createPlayer();

        this.setUpCursors();

        this.enemies = this.add.group();
        this.enemyLasers = this.add.group();
        this.playerLasers = this.add.group();

        this.createEnemy();
        
        this.physics.add.collider(
            this.playerLasers,
            this.enemies,
            this.destroyEnemy
        )

        this.physics.add.overlap(
            this.player,
            this.enemies,
            this.destroyPlayerAndEnemy
        )

        this.physics.add.overlap(
            this.player,
            this.enemyLasers,
            this.destroyPlayer
        )
    }

    update() {
        this.updatePlayer()
        this.updateEnemies()
        this.removeLostEnemyLasers()
        this.removeLostPlayerLasers()
    }

    createPlayer() {
        this.player = new Player(
            this,
            this.game.config.width * 0.9,
            this.game.config.height * 0.9,
            "player"
        );
        this.player.setScale(0.4)
    }

    setUpCursors() {
        this.keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this.keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    createEnemy() {
        this.time.addEvent({
            delay: 1500,
            callback: () => {
                let enemy

                if (Phaser.Math.Between(0, 10) >= 3) {
                    enemy = new GunShip(
                        this,
                        Phaser.Math.Between(0, this.game.config.width),
                        0
                    );
                } else if (Phaser.Math.Between(0, 10) >= 5) {
                    if (this.getEnemiesByType("ChaserShip").length < 5) {
                        enemy = new ChaserShip(
                            this,
                            Phaser.Math.Between(0, this.game.config.width),
                            0
                        )
                    }
                } else {
                    enemy = new CarrierShip(
                        this,
                        Phaser.Math.Between(0, this.game.config.width),
                        0
                    )
                }

                if (enemy !== null) {
                    enemy.setScale(Phaser.Math.Between(10, 5) * 0.05)
                    this.enemies.add(enemy);
                }

            },
            callbackScope: this,
            loop: true
        });
    }

    getEnemiesByType(type) {
        let arr = []
        for (let i = 0; i < this.enemies.getChildren().length; i++) {
            let enemy = this.enemies.getChildren()[i];

            if (enemy.getData("type" === type)) {
                arr.push(enemy)
            }
        }
        return arr;
    }

    destroyEnemy(playerLaser, enemy) {
        if (enemy) {
            if (enemy.onDestroy !== undefined) {
                enemy.onDestroy();
            }

            enemy.explode(true);
            playerLaser.destroy();
        }
    }

    destroyPlayerAndEnemy(player, enemy) {
        if (!player.getData("isDead") && !enemy.getData("isDead")) {
            player.explode(false);
            player.onDestroy();
            enemy.explode(true);
        }
    } 

    destroyPlayer(player, laser) {
        if (!player.getData("isDead") && !laser.getData("isDead")) {
            player.explode(false);
            player.onDestroy();
            laser.destroy();
        }
    }

    setPlayerMovement() {
        if (this.keyUp.isDown) {
            this.player.moveUp();
        }

        if (this.keyDown.isDown) {
            this.player.moveDown();
        }

        if (this.keyLeft.isDown) {
            this.player.moveLeft();
        }

        if (this.keyRight.isDown) {
            this.player.moveRight();
        }
    }

    setPlayerShooting() {
        if (this.keySpace.isDown) {
            this.player.setData("isShooting", true);
        } else {
            this.player.setData("timerShootTick", this.player.getData("timerShootDelay") - 1);
            this.player.setData("isShooting", false);
        }
    }

    updatePlayer() {
        if (!this.player.getData("isDead")) {
            this.player.update()
            this.setPlayerMovement()
            this.setPlayerShooting()
        }
    }
    
    removerLostEnemies(enemy) {
        if (enemy.x < -enemy.displayWidth ||
            enemy.x > this.game.config.width + enemy.displayWidth ||
            enemy.y < -enemy.displayHeight * 4 ||
            enemy.y > this.game.config.height + enemy.displayHeight) {

            if (enemy) {
                if (enemy.onDestroy !== undefined) {
                    enemy.onDestroy();
                }

                enemy.destroy();
            }

        }
    }

    updateEnemies() {
        for (var i = 0; i < this.enemies.getChildren().length; i++) {
            let enemy = this.enemies.getChildren()[i];
            enemy.update();
            this.removerLostEnemies(enemy);
        }
    }

    removeLostEnemyLasers() {
        for (var i = 0; i < this.enemyLasers.getChildren().length; i++) {
            var laser = this.enemyLasers.getChildren()[i];
            laser.update();

            if (laser.x < -laser.displayWidth ||
                laser.x > this.game.config.width + laser.displayWidth ||
                laser.y < -laser.displayHeight * 4 ||
                laser.y > this.game.config.height + laser.displayHeight) {
                if (laser) {
                    laser.destroy();
                }
            }
        }
    }

    removeLostPlayerLasers() {
        for (var i = 0; i < this.playerLasers.getChildren().length; i++) {
            var laser = this.playerLasers.getChildren()[i];
            laser.setScale(0.5)
            laser.update();

            if (laser.x < -laser.displayWidth ||
                laser.x > this.game.config.width + laser.displayWidth ||
                laser.y < -laser.displayHeight * 4 ||
                laser.y > this.game.config.height + laser.displayHeight) {
                if (laser) {
                    laser.destroy();
                }
            }
        }
    }
}