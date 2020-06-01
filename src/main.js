import "phaser";
import Game from './scenes/Game';
import MainMenu from './scenes/MainMenu';
import GameOver from './scenes/GameOver';

var config = { 
  type: Phaser.AUTO,
  width: 480,
  height: 640,
  blackgroundColor: "black",
  physics: {
      default: "arcade",
      arcade: {
          gravity: { x: 0, y: 0 }
      }
    },
    scene: [MainMenu, Game, GameOver],
}

var game = new Phaser.Game(config);
