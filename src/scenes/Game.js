import "phaser";
import Player from "../game/Player";
import GunShip from "../game/GunShip";
import ChaserShip from "../game/ChaserShip";
import Meteore from "../game/Meteore";
import Bonus from "../game/Bonus";
import Constants from "../misc/constants";

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
        this.load.image("damage1", "assets/damage1.png")
        this.load.image("damage2", "assets/damage2.png")
        this.load.image("damage3", "assets/damage3.png")
        this.load.image(Constants.bonus.shooting, "assets/bonusShoot.png")
        this.load.image(Constants.bonus.shield, "assets/bonusShield.png")
        this.load.image(Constants.shield, "assets/shield.png")

        this.load.audio("sndExplode0", "assets/sndExplode0.wav");
        this.load.audio("sndExplode1", "assets/sndExplode1.wav");
        this.load.audio("sndLaser", "assets/sndLaser.wav");
    }

    create() {
        this.add.image(260, 440, "sprBg1")

        this.scoreText = this.add.text(30, 30, "Score: 0", { fontSize: 20, fontFamily: 'Orbitron'}).setDepth(5)

        this.anims.create({
            key: "sprExplosion",
            frames: this.anims.generateFrameNumbers("sprExplosion"),
            frameRate: 46,
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

        this.createPlayerDamageTextures("damage1", Constants.textures.playerDamage1)
        this.createPlayerDamageTextures("damage2", Constants.textures.playerDamage2)
        this.createPlayerDamageTextures("damage3", Constants.textures.playerDamage3)
        this.createShieldTexture()

        this.setUpCursors();

        this.enemies = this.add.group();
        this.enemyLasers = this.add.group();
        this.playerLasers = this.add.group();
        this.bonuses = this.add.group();

        this.createEnemy();

        this.createBonus() 

        this.physics.add.collider(
            this.playerLasers,
            this.enemies,
            this.destroyEnemy,
            undefined,
            this
        )

        this.physics.add.overlap(
            this.player,
            this.enemies,
            this.destroyPlayerAndEnemy,
            undefined,
            this
        )

        this.physics.add.overlap(
            this.player,
            this.enemyLasers,
            this.damagePlayer,
            undefined,
            this
        )

        this.physics.add.overlap(
            this.player,
            this.bonuses,
            this.getBonus,
            undefined,
            this
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
            this.game.config.width * 0.5,
            this.game.config.height * 0.9,
            "player"
        );
        this.player.setScale(0.5)
    }

    setUpCursors() {
        this.keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this.keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    createPlayerDamageTextures(secondSprite, textureName) {
        let texture = this.add.renderTexture(0, 0, 112, 75).setVisible(false);
        texture.draw("player");
        texture.draw(secondSprite)
        texture.saveTexture(textureName)
    }

    createShieldTexture() {
        let texture = this.add.renderTexture(0, 0, 144, 137).setVisible(false);
        texture.draw("player", 25, 40);
        texture.draw(Constants.shield, 0, 0).setScale(0.6)
        texture.saveTexture(Constants.textures.playerShield)
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
                    enemy = new Meteore(
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

    createBonus() {
        this.time.addEvent({
            delay: Phaser.Math.Between(5000, 10000),
            callback: () => {
                let bonus

                if (Phaser.Math.Between(0, 1) === 0) {
                    bonus = new Bonus(
                        this,
                        Phaser.Math.Between(0, this.game.config.width),
                        0,
                        Constants.bonus.shooting
                    );
                } else {
                    bonus = new Bonus(
                        this,
                        Phaser.Math.Between(0, this.game.config.width),
                        0,
                        Constants.bonus.shield
                    )
                }

                if (bonus !== null) {
                    this.bonuses.add(bonus);
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

    updateScoreText() {
        this.scoreText.setText(`Score: ${this.player.getData("score")}`)
    }

    increaseScore() {
        this.player.setData("score", (this.player.getData("score") + 10))
        this.updateScoreText()
    }

    decreaseScore() {
        if(this.player.getData("score") >= 10) {
            this.player.setData("score", (this.player.getData("score") - 10))
            this.updateScoreText()
        }
    }

    destroyEnemy(playerLaser, enemy) {
        if (enemy) {
            if (enemy.onDestroy !== undefined) {
                enemy.onDestroy();
            }

            enemy.explode(true);
            playerLaser.destroy();
            this.increaseScore();           
        }
    }

    destroyPlayerAndEnemy(player, enemy) {
        if (!player.getData("isDead") && !enemy.getData("isDead")) {

            if (!player.getData("isShield")) {
                player.explode(false);
                player.onDestroy();
            }
            
            enemy.explode(true);
            this.increaseScore();
        }
    }

    setPlayerDamageTexture() {
        let playerHealth = this.player.getData("health")

        if (playerHealth >= 75 && (playerHealth < 100)) {
            return this.player.setTexture(Constants.textures.playerDamage1)
        } else if (playerHealth >= 50) {
            return this.player.setTexture(Constants.textures.playerDamage2)
        } if (playerHealth >= 0) {
            return this.player.setTexture(Constants.textures.playerDamage3)
        }
    }

    damagePlayer(player, laser) {
        if (!player.getData("isDead") && !laser.getData("isDead")) {

            if (!player.getData("isShield")) {
                if (player.getData("health") === 25) {
                    player.setData("health", 0)
                    player.explode(false);
                    player.onDestroy();
    
                } else {
                    player.setData("health", (player.getData("health") - 25))
                    this.setPlayerDamageTexture();   
                    this.decreaseScore()    
                    
                    if (player.getData("shootingPower") > 1) {
                        player.setData("shootingPower", (player.getData("shootingPower") - 1))
                    }
                }
            }

            laser.destroy();
        }
    }

    getBonus(player, bonus) {
        if (bonus.texture.key === Constants.bonus.shooting) {
            if (player.getData("shootingPower") < 3) {
                player.setData("shootingPower", (player.getData("shootingPower") + 1))
            }
        } else if (bonus.texture.key === Constants.bonus.shield) {
            player.setData("isShield", true);
            player.setTexture(Constants.textures.playerShield)

            this.time.addEvent({
                delay: 5000,
                callback: () => {
                    player.setData("isShield", false);
                    player.setTexture("player")
                },
                callbackScope: this,
                loop: false
            });
        }

        bonus.destroy();
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

    removeLostEnemies(enemy) {
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
            this.removeLostEnemies(enemy);
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

    removeLostBonus() {
        for (var i = 0; i < this.bonuses.getChildren().length; i++) {
            var bonus = this.bonuses.getChildren()[i];
            bonus.update();

            if (bonus.x < -bonus.displayWidth ||
                bonus.x > this.game.config.width + bonus.displayWidth ||
                bonus.y < -bonus.displayHeight * 4 ||
                bonus.y > this.game.config.height + bonus.displayHeight) {
                if (bonus) {
                    bonus.destroy();
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