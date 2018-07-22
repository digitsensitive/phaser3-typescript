# Coin Runner ![Difficulty](https://img.shields.io/badge/Difficulty-Beginner-green.svg)

![Coin Runner](https://github.com/digitsensitive/phaser3-typescript/blob/master/src/games/coin-runner/assets/github/coin-runner-big.png)

## Description

A very simple game to learn the basics of Phaser 3.

## Learning objectives

You will learn how to create and initialize the core class Phaser.Game and
if you have a deeper look into the GameConfig object you will see all the
parameters you can choose when setting-up your Phaser.Game Instance.

Next you will create your first Phaser.Scene and load up your game objects from
separate files. Each object in this game will be of type Phaser.GameObjects.Image,
what will make your life easier, because you do not have to bother about
physics for now. You will learn everything about Phaser.GameObjects.Image and
what variables you can set.

Last but not least you will setup the player input, use a TimerEvent, a Text
and even check for RectangleToRectangle collision.

## How to run it

Adjust the entry path in the `webpack.config.js` file as follows:
```
entry: './src/games/coin-runner/game.ts'
```

## Related topics

* [Phaser.Game](https://github.com/digitsensitive/phaser3-typescript/blob/master/references/phaser-game.md)
* Phaser.Scene
* CursorKeys
* Phaser.Time.TimerEvent
* Phaser.GameObjects.Text
* Phaser.Geom.Intersects.RectangleToRectangle
