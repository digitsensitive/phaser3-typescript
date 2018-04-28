# Snake

![Snake](/assets/games/snake/README.gif)

## Description

In October 1976 Gremlin published a 2-player Maze Game called Blockade.
It is the first of what would become known as snake games.

We are going to create a simple 1-player Snake clone.

## How to run it

Adjust the `webpack.config.js` file as follows:
> `entry: './src/games/snake/game.ts'`

## What will you learn

* Setup your own [GameConfig](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/game-config.md)
* Learn to use [Phaser.Scene](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/scene-config.md)
* Create two classes (player and apple) in two separate files
* Learn to use [Phaser.GameObjects.Graphics](https://github.com/photonstorm/phaser/blob/31bf979eb25c70441b8228d5c9643a97746ea7fa/src/gameobjects/graphics/Graphics.js)
* Basic collision detection
* Setup player input (Keyboard)
* Learn to use Phaser.GameObjects.BitmapText
* Learn to use [Phaser.Math.RandomDataGenerator](https://github.com/photonstorm/phaser/blob/31bf979eb25c70441b8228d5c9643a97746ea7fa/src/math/random-data-generator/RandomDataGenerator.js)
