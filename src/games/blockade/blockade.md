# Blockade ![Difficulty](https://img.shields.io/badge/Difficulty-Beginner-green.svg)

![Blockade](https://github.com/digitsensitive/phaser3-typescript/blob/master/src/games/blockade/assets/github/blockade.png)

## Description

In October 1976 Gremlin published a 2-player Maze Game called Blockade.
It is the first of what would become known as snake games.

The display was 256 x 224 pixels and the game had only 2 colors.
Using four directional buttons, each player could move his character around
leaving a solid line behind them, turning at 90 degree angles. To win, a player
had to last longer than the opponent before hitting something. The game ended
after one player gained six wins ([Wikipedia](https://en.wikipedia.org/wiki/Blockade_(video_game))).

We are going to create a blockade clone.

## How to run it

Adjust the `webpack.config.js` file as follows:
> `entry: './src/games/blockade/game.ts'`

## Learn to use

* [Phaser.Game](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/boot/game.md)
* [Phaser.Config](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/boot/config.md)
* [Phaser.Scenes.ScenePlugin](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/scene/plugins/scene-plugin.md)
* Learn to use Phaser.Input.Keyboard.Key
* Learn to use Phaser.GameObjects.BitmapText
* Learn to use Phaser.GameObjects.Graphics
* Learn to use Phaser.Geom.Circle
