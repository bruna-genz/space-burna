import Phaser from 'phaser';
import Constants from '../helpers/constants';
import * as Helper from '../helpers/buttonHelpers';
import * as ScoreLogic from '../helpers/ScoreLogic';


export default class GameOver extends Phaser.Scene {
  constructor() {
    super('GameOver');
  }

  init(data) {
    this.gameScore = data.gameScore;
  }

  create() {
    this.sfx = {
      btnOver: this.sound.add(Constants.audio.buttonOver),
      btnDown: this.sound.add(Constants.audio.buttonDown),
    };

    this.add.image(260, 400, Constants.background);

    this.addText(200, 'GAME OVER', 45);

    this.addText(300, `Your score: ${this.gameScore}`, 25);

    ScoreLogic.createNameInput();

    this.btnSubmit = this.add.sprite(
      this.game.config.width * 0.5,
      470,
      Constants.buttons.up,
    );

    this.btnRestart = this.add.sprite(
      this.game.config.width * 0.5,
      540,
      Constants.buttons.up,
    );

    // eslint-disable-next-line max-len
    Helper.addButtonFunctionality(this, this.btnSubmit, () => ScoreLogic.handleScore(this, this.gameScore));
    Helper.addButtonFunctionality(this, this.btnRestart, () => ScoreLogic.restartGame(this));

    Helper.addButtonText(this, 470, 'Submit score');
    Helper.addButtonText(this, 540, 'Play again');
  }

  addText(y, text, size) {
    this.add.text(
      this.game.config.width * 0.5,
      y,
      text,
      {
        fontFamily: 'Orbitron',
        fontSize: size,
        fontStyle: 'bold',
        color: '#ffffff',
        align: 'center',
      },
    ).setOrigin(0.5);
  }
}