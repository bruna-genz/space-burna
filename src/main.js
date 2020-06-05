/* eslint-disable no-undef */
import 'phaser';
import './styles/styles.scss';
import Game from './scenes/Game';
import MainMenu from './scenes/MainMenu';
import GameOver from './scenes/GameOver';
import Instructions from './scenes/Instructions';
import Score from './scenes/Score';

const config = {
  type: Phaser.AUTO,
  width: 540,
  height: 760,
  blackgroundColor: 'black',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
    },
  },
  scene: [MainMenu, Instructions, Game, GameOver, Score],
  parent: document.querySelector('#game-container'),
};

// eslint-disable-next-line no-unused-vars
const game = new Phaser.Game(config);
