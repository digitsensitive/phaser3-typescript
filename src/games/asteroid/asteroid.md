# Asteroid ![Difficulty](https://img.shields.io/badge/Difficulty-Beginner-green.svg)

![Asteroid](https://github.com/digitsensitive/phaser3-typescript/blob/master/src/games/asteroid/assets/github/asteroid.png)

## Description

Another clone of the famous Asteroid game.

## How to run it

Adjust the `webpack.config.js` file as follows:
> `entry: './src/games/asteroid/game.ts'`

## How to play in fullscreen
Adjust the `index.html` as follows:
> ... href="styles/css/styles`-fullscreen`.css
> Delete this line: `<h1>phaser3-typescript</h1>`

Adjust the `game.ts` as follows:
> width: window.innerWidth
> height: window.innerHeight

## Learn to use

* [Phaser.Game](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/boot/game.md)
* [Phaser.Config](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/boot/config.md)
* [Phaser.Scenes.ScenePlugin](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/scene/plugins/scene-plugin.md)
* [Phaser.Loader](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/loader/loader-plugin.md)
* Phaser.GameObjects.BitmapText
* Phaser.Input.Keyboard.Key
* Phaser.GameObjects.Graphics
* Phaser.Geom.Intersects.RectangleToRectangle
* Phaser.Math.RandomDataGenerator
