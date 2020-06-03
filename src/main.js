import "phaser";
import Game from './scenes/Game';
import MainMenu from './scenes/MainMenu';
import GameOver from './scenes/GameOver';
import Instructions from './scenes/Instructions';

var config = { 
  type: Phaser.AUTO,
  width: 540,
  height: 760,
  blackgroundColor: "black",
  physics: {
      default: "arcade",
      arcade: {
          gravity: { x: 0, y: 0 }
      }
    },
    scene: [/*MainMenu, Instructions, Game, */GameOver],
}

var game = new Phaser.Game(config);
