# Asteroid

![Asteroid](/assets/games/asteroid/README.gif)

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

## What will you learn

* Learn to use [GameConfig](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/game-config.md)
* Learn to use [Phaser.Scene](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/scene-config.md)
* Learn to use Phaser.Loader.LoaderPlugin
* Learn to use Phaser.GameObjects.BitmapText
* Learn to use Phaser.Input.Keyboard.Key
* Learn to use Phaser.GameObjects.Graphics
* Learn to use [Phaser.Geom.Intersects.RectangleToRectangle](https://github.com/photonstorm/phaser/blob/d1f5f8a82b4a64d2a6a6a269e148232b51661a19/src/geom/intersects/RectangleToRectangle.js)
* Learn to use [Phaser.Math.RandomDataGenerator](https://github.com/photonstorm/phaser/blob/31bf979eb25c70441b8228d5c9643a97746ea7fa/src/math/random-data-generator/RandomDataGenerator.js)


## Fixes of the TypeScript definition file

Awaiting [issue](https://github.com/photonstorm/phaser3-docs/issues/19) to be fixed.
This is a work around I have done in the phaser.d.ts file:
```
Line 13304:
/**
 * If this Game Object is enabled for physics then this property will contain a reference to a Physics Body.
 */
body: any;
```

Awaiting merge of the [Pull request](https://github.com/photonstorm/phaser3-docs/issues/50).
This is a work around I have done in the phaser.d.ts file:
```
Line 438:
  pixelArt?: boolean;

Line 434:
  antialias?: boolean;
```
