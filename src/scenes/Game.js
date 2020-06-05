/* eslint-disable no-undef */
import 'phaser';
import Player from '../game/Player';
import GunShip from '../game/GunShip';
import ChaserShip from '../game/ChaserShip';
import Meteore from '../game/Meteore';
import Bonus from '../game/Bonus';
import Constants from '../helpers/constants';
import * as Logic from '../helpers/GameLogic';

export default class Game extends Phaser.Scene {
  constructor() {
    super({
      key: 'Game',
    });
  }

  preload() {
    this.load.image(Constants.background, 'assets/baseBg.png');
    this.load.spritesheet(Constants.explosion, 'assets/explosion.png', {
      frameWidth: 256,
      frameHeight: 256,
    });
    this.load.image(Constants.enemy0, 'assets/enemy0.png');
    this.load.image(Constants.enemy1, 'assets/enemy1.png');
    this.load.image('enemy2_1', 'assets/meteor1.png');
    this.load.image('enemy2_2', 'assets/meteor2.png');
    this.load.image('enemy2_3', 'assets/meteor3.png');
    this.load.image('enemy2_4', 'assets/meteor4.png');
    this.load.image('laserEnemy', 'assets/laserEnemy.png');
    this.load.image('laserPlayer', 'assets/laserPlayer.png');
    this.load.image('player', 'assets/player.png');
    this.load.image('damage1', 'assets/damage1.png');
    this.load.image('damage2', 'assets/damage2.png');
    this.load.image('damage3', 'assets/damage3.png');
    this.load.image(Constants.bonus.shooting, 'assets/bonusShoot.png');
    this.load.image(Constants.bonus.shield, 'assets/bonusShield.png');
    this.load.image(Constants.shield, 'assets/shield.png');

    this.load.audio(Constants.audio.explode0, 'assets/sndExplode0.wav');
    this.load.audio(Constants.audio.explode1, 'assets/sndExplode1.wav');
    this.load.audio(Constants.audio.laser, 'assets/sndLaser.wav');
    this.load.audio(Constants.audio.catchBonus, 'assets/sndBonus.ogg');
  }

  create() {
    this.add.image(260, 440, Constants.background);

    this.scoreText = this.add.text(30, 30, 'Score: 0', { fontSize: 20, fontFamily: 'Orbitron' }).setDepth(5);
    this.healthText = this.add.text(400, 30, 'Health: 100', { fontSize: 20, fontFamily: 'Orbitron' }).setDepth(5);

    this.anims.create({
      key: Constants.explosion,
      frames: this.anims.generateFrameNumbers(Constants.explosion),
      frameRate: 46,
      repeat: 0,
    });

    this.sfx = {
      explosions: [
        this.sound.add(Constants.audio.explode0),
        this.sound.add(Constants.audio.explode1),
      ],
      laser: this.sound.add(Constants.audio.laser),
      bonus: this.sound.add(Constants.audio.catchBonus),
    };

    this.createPlayer();

    this.createPlayerDamageTextures('damage1', Constants.textures.playerDamage1);
    this.createPlayerDamageTextures('damage2', Constants.textures.playerDamage2);
    this.createPlayerDamageTextures('damage3', Constants.textures.playerDamage3);
    this.createShieldTexture();

    this.setUpCursors();

    this.enemies = this.add.group();
    this.enemyLasers = this.add.group();
    this.playerLasers = this.add.group();
    this.bonuses = this.add.group();

    this.createEnemy();

    this.createBonus();

    this.physics.add.collider(
      this.playerLasers,
      this.enemies,
      this.destroyEnemy,
      undefined,
      this,
    );

    this.physics.add.overlap(
      this.player,
      this.enemies,
      this.destroyPlayerAndEnemy,
      undefined,
      this,
    );

    this.physics.add.overlap(
      this.player,
      this.enemyLasers,
      this.damagePlayer,
      undefined,
      this,
    );

    this.physics.add.overlap(
      this.player,
      this.bonuses,
      this.getBonus,
      undefined,
      this,
    );
  }

  update() {
    this.updatePlayer();
    this.updateEnemies();
    this.removeLostEnemyLasers();
    this.removeLostPlayerLasers();
  }

  createPlayer() {
    this.player = new Player(
      this,
      this.game.config.width * 0.5,
      this.game.config.height * 0.9,
      'player',
    );
    this.player.setScale(0.5);
  }

  setUpCursors() {
    this.keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    this.keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    this.keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    this.keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
  }

  createPlayerDamageTextures(secondSprite, textureName) {
    const texture = this.add.renderTexture(0, 0, 112, 75).setVisible(false);
    texture.draw('player');
    texture.draw(secondSprite);
    texture.saveTexture(textureName);
  }

  createShieldTexture() {
    const texture = this.add.renderTexture(0, 0, 144, 137).setVisible(false);
    texture.draw('player', 25, 40);
    texture.draw(Constants.shield, 0, 0).setScale(0.6);
    texture.saveTexture(Constants.textures.playerShield);
  }

  createEnemy() {
    this.time.addEvent({
      delay: 1500,
      callback: () => {
        let enemy;

        if (Phaser.Math.Between(0, 10) >= 3) {
          enemy = new GunShip(
            this,
            Phaser.Math.Between(0, this.game.config.width),
            0,
          );
          enemy.setScale(Phaser.Math.Between(10, 5) * 0.05);
        } else if (Phaser.Math.Between(0, 10) >= 5) {
          if (this.getEnemiesByType('ChaserShip').length < 5) {
            enemy = new ChaserShip(
              this,
              Phaser.Math.Between(0, this.game.config.width),
              0,
            );
            enemy.setScale(Phaser.Math.Between(10, 5) * 0.05);
          }
        } else {
          enemy = new Meteore(
            this,
            Phaser.Math.Between(0, this.game.config.width),
            0,
          );
          enemy.setScale(Phaser.Math.Between(15, 10) * 0.05);
        }

        if (enemy !== null) {
          this.enemies.add(enemy);
        }
      },
      callbackScope: this,
      loop: true,
    });
  }

  createBonus() {
    this.time.addEvent({
      delay: Phaser.Math.Between(5000, 10000),
      callback: () => {
        let bonus;

        if (Phaser.Math.Between(0, 1) === 0) {
          bonus = new Bonus(
            this,
            Phaser.Math.Between(0, this.game.config.width),
            0,
            Constants.bonus.shooting,
          );
        } else {
          bonus = new Bonus(
            this,
            Phaser.Math.Between(0, this.game.config.width),
            0,
            Constants.bonus.shield,
          );
        }

        if (bonus !== null) {
          this.bonuses.add(bonus);
        }
      },
      callbackScope: this,
      loop: true,
    });
  }

  getEnemiesByType(type) {
    const arr = [];
    for (let i = 0; i < this.enemies.getChildren().length; i + 1) {
      const enemy = this.enemies.getChildren()[i];

      if (enemy.getData(type === 'type')) {
        arr.push(enemy);
      }
    }
    return arr;
  }

  updateScoreText() {
    this.scoreText.setText(`Score: ${this.player.getData('score')}`);
  }

  updateHealthText() {
    this.healthText.setText(`Health: ${this.player.getData('health')}`);
  }

  destroyEnemy(playerLaser, enemy) {
    if (enemy) {
      if (enemy.onDestroy !== undefined) {
        enemy.onDestroy();
      }

      if (enemy.onDamage !== undefined) {
        enemy.onDamage();
      } else {
        enemy.explode(true);
      }

      playerLaser.destroy();

      if (Logic.calcIncreaseScore(this.player.data.values)) {
        this.updateScoreText();
      }
    }
  }

  destroyPlayerAndEnemy(player, enemy) {
    if (!player.getData('isDead') && !enemy.getData('isDead')) {
      if (!player.getData('isShield')) {
        player.explode(false);
        player.onDestroy();
      }

      enemy.explode(true);

      if (Logic.calcIncreaseScore(this.player.data.values)) {
        this.updateScoreText();
      }
    }
  }

  setPlayerDamageTexture() {
    const playerHealth = this.player.getData('health');
    let texture;

    if (playerHealth >= 75 && (playerHealth < 100)) {
      texture = Constants.textures.playerDamage1;
    } else if (playerHealth >= 50) {
      texture = Constants.textures.playerDamage2;
    } else if (playerHealth >= 0) {
      texture = Constants.textures.playerDamage3;
    }

    this.player.setData('currentTexture', texture);
    this.player.setTexture(texture);
  }

  // eslint-disable-next-line class-methods-use-this
  killPlayer(player) {
    player.explode(false);
    player.onDestroy();
  }

  damagePlayer(player, laser) {
    if (!player.getData('isDead') && !laser.getData('isDead')) {
      if (!player.getData('isShield')) {
        if (Logic.decreasePlayerHealth(player.data.values) === 0) {
          this.killPlayer(player);
        } else {
          this.setPlayerDamageTexture();
          Logic.decreaseShooting(player.data.values);

          if (Logic.calcDecreaseScore(player.data.values)) {
            this.updateScoreText();
          }
        }

        this.updateHealthText();
      }

      laser.destroy();
    }
  }

  addShield(player) {
    player.setData('isShield', true);
    player.setTexture(Constants.textures.playerShield);

    this.time.addEvent({
      delay: 5000,
      callback: () => {
        player.setData('isShield', false);
        player.setTexture(this.player.getData('currentTexture'));
      },
      callbackScope: this,
      loop: false,
    });
  }

  getBonus(player, bonus) {
    if (bonus.texture.key === Constants.bonus.shooting) {
      Logic.increaseShooting(player.data.values);
    } else if (bonus.texture.key === Constants.bonus.shield) {
      this.addShield(player);
    }

    this.sfx.bonus.play();
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
      this.player.setData('isShooting', true);
    } else {
      Logic.setUpCounter(this.player.data.values);
      this.player.setData('isShooting', false);
    }
  }

  updatePlayer() {
    if (!this.player.getData('isDead')) {
      this.player.update();
      this.setPlayerMovement();
      this.setPlayerShooting();
    }
  }

  removeLost(sprite) {
    if (sprite.x < -sprite.displayWidth
            || sprite.x > this.game.config.width + sprite.displayWidth
            || sprite.y < -sprite.displayHeight * 4
            || sprite.y > this.game.config.height + sprite.displayHeight) {
      if (sprite) {
        if (sprite.onDestroy !== undefined) {
          sprite.onDestroy();
        }

        sprite.destroy();
      }
    }
  }

  updateEnemies() {
    for (let i = 0; i < this.enemies.getChildren().length; i + 1) {
      const enemy = this.enemies.getChildren()[i];
      enemy.update();
      this.removeLost(enemy);
    }
  }

  removeLostEnemyLasers() {
    for (let i = 0; i < this.enemyLasers.getChildren().length; i + 1) {
      const laser = this.enemyLasers.getChildren()[i];
      this.removeLost(laser);
    }
  }

  removeLostBonus() {
    for (let i = 0; i < this.bonuses.getChildren().length; i + 1) {
      const bonus = this.bonuses.getChildren()[i];
      this.removeLost(bonus);
    }
  }

  removeLostPlayerLasers() {
    for (let i = 0; i < this.playerLasers.getChildren().length; i + 1) {
      const laser = this.playerLasers.getChildren()[i];
      laser.setScale(0.5);
      this.removeLost(laser);
    }
  }
}