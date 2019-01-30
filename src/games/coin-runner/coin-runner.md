# Coin Runner ![Difficulty](https://img.shields.io/badge/Difficulty-Beginner-green.svg)

![Coin Runner](https://github.com/digitsensitive/phaser3-typescript/blob/master/src/games/coin-runner/assets/github/coinRunner.png)

## Description

A very simple game to learn the basics of Phaser 3.

## Learning objectives

You will learn how to create and initialize the core class Phaser.Game and
if you have a deeper look into the GameConfig object you will see all the
parameters you can choose when setting-up your Phaser.Game Instance (see further reading).

Next you will create your first Phaser.Scene and load up your game objects from
separate files. Each object in this game will be of type Phaser.GameObjects.Image.
You will learn everything about Phaser.GameObjects.Image and
what variables you can set. We will make your life easier for now and not work
with physic objects.

Last but not least you will setup the player input, use a TimerEvent, a Text
and even check for RectangleToRectangle collision.

## How to run it

Adjust the entry path in the `webpack.config.js` file as follows:
```
entry: './src/games/coin-runner/game.ts'
```

## Further reading

* [Phaser.Game](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/boot/game.md)
