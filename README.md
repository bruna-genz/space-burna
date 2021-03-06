</br>   
<div align="center">
    <h1 align="center" width="90">Space Burna</h1>
    <img src="./assets/space-burna-tbnail.jpg" width="300">
    <a href="https://spaceburna.netlify.app/"><p>Play to save the galaxy!</p></a>
</div>

# Table of Contents

- [About](https://github.com/bruna-genz/space-burna#about)
- [About the Game](https://github.com/bruna-genz/space-burna#about-the-game)
  - [How to play](https://github.com/bruna-genz/space-burna#how-to-play)
  - [Characters](https://github.com/bruna-genz/space-burna#characters)
  - [Scenes](https://github.com/bruna-genz/space-burna#scenes)
- [Prerequisites](https://github.com/bruna-genz/space-burna#prerequisites)
- [Installation](https://github.com/bruna-genz/space-burna#installation)
- [Testing](https://github.com/bruna-genz/space-burna#testing)
- [Built with](https://github.com/bruna-genz/space-burna#built-with)
- [Future features](https://github.com/bruna-genz/space-burna#future-features)
- [Author](https://github.com/bruna-genz/space-burna#author)
- [Acknowledgments](https://github.com/bruna-genz/space-burna#acknowledgments)

# About

This is my Capstone project for Microverse's JavaScript course. In this project, the goal was to build a shooter game using JavaScript and the game engine Phaser.

All project requirements can be seen [here](https://www.notion.so/Shooter-game-203e819041c7486bb36f9e65faecba27).

# About the Game

Space Burna is a classic shooting game that happens in the space. The goal is to survive for the longest possible time, while you destroy the enemies and avoid being shot to death. Each enemy destroyed gives you 10 points. Earn enough points to see your name on the scoreboard.

## How to play

The player controls a spaceship. Use the arrow keys on your keyboard to move around. To shoot, press enter.

## Characters

- **Player Spaceship**

![Player spaceship](/assets/player.png)

This is your spaceship. You can move it up, down, left, and right using the arrow keys. You can also shoot by pressing enter.
It starts the game with 100% of health. If you got shot, the health decreases by 25%, so watch out!

- **GunShip**

![Gunship](/assets/enemy0.png)

This enemy has guns, and there are lots of them around the space. Luckily, they are very predictable and easy to destroy.

- **ChaserShip**

![Chasership](/assets/enemy1.png)

This little ship looks nice, but it will chase you down until they hit you.

- **Meteors**

![Chasership](/assets/meteor1.png)

Watch out for the meteors. They are big and hard to destroy.

- **Bonus items**

![Bonus](/assets/bonusShoot.png)
![Bonus](/assets/bonusShield.png)

Finally something good! There are two kinds of bonus items: 

1) Extra shooting power: it adds multiple shots. You can have up to three at the same time.
Very handy when there are a lot of enemies to destroy. However, if you got shot, your shooting power decreases.

2) Shield: this bonus will give your spaceship a temporary shield. During this time, enemies' lasers won't hit you.
Also, if you collide with an enemy, it will explode.

## Scenes

This game has five scenes:

- **Main menu**

This is the initial scene. It allows the player to start the game, go to the instructions or the scoreboard.

<img src='./assets/scene-shots/main-menu.png' width='300'>

- **Instructions**

This scene presents the main rules of the game.

<img src='./assets/scene-shots/instructions-scene.png' width='300'>

- **Main game**

This is the main scene of the game, where all the action happens.

<img src='./assets/scene-shots/game-scene.png' width='300'>

- **Game Over**

This scene appears when the player collides with an enemy or if the health got to 0. It displays the score for that game and allows the player to enter their name and submit the score. It also allows them to replay.

<img src='./assets/scene-shots/game-over-scene.png' width='300'>

- **Score board**

This scene displays the name and score of the 15 players who had the highest score on the game. Of course, you will want to be the first one on that list!
It also allows the player to play again.

<img src='./assets/scene-shots/score-scene.png' width='300'>

# Prerequisites

- Desktop computer and browser. 

# Installation

**To play online**
- Just access [this link](https://spaceburna.netlify.app/) for the live version.

**To install the game locally**
- Download or clone the [game repository](https://github.com/bruna-genz/space-burna).
- Navigate to the game root directory from your terminal.
- Install the required packages with the following command:
```
npm i
```
- Run the following command to start the game in your browser.
```
npm run start
```

# Testing

This project has unit tests for the logic components. To run the test, use the following command:
```
npm run test
```

# Built with
- Phaser3.
- HTML5.
- JavaScript.
- SASS.
- Webpack.
- Babel.

# Future features

- Set up energy level for the player's ship to limit consecutive shots.
- Add levels.
- Have 'boss' enemy to defeat before advance levels.

# Author
:woman: **Bruna Genz**

- Github: [@bruna-genz](https://github.com/bruna-genz)
- Twitter: [@Bruna_GK](https://twitter.com/Bruna_GK)
- Linkedin: [Bruna Genz](https://www.linkedin.com/in/brunagenz/)
- Email: brunagenz92@gmail.com

# Acknowledgments
- Jared, for this simple and complete [tutorial](https://learn.yorkcs.com/category/tutorials/gamedev/phaser-3/build-a-space-shooter-with-phaser-3/).
- [Kenney](https://kenney.nl/), for the beautiful assets.

# 🤝 Contributing

Contributions, issues, and feature requests are welcome!

# Show your support

Give a ⭐️ if you like this project!
