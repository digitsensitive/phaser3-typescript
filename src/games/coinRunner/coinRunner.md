# Coin Runner

![Coin Runner](/assets/games/coinRunner/README.gif)


## Description

A very small and simple game to start your Adventure with Phaser 3.
The aim is to collect as many coins as possible (you have unlimited time ;-)).

## How to run it

Adjust the `webpack.config.js` file as follows:
> `entry: './src/games/coinRunner/game.ts'`


## What will you learn

* Learn to use [GameConfig](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/game-config.md)
* Learn to use [Phaser.Scene](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/scene-config.md)
* Create two classes (player and coin) in two separate files
* Learn to use [Phaser.GameObjects.Image](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/gameobjects/image.md)
* Setup player input (Keyboard)
* Learn to use [Phaser.Time.TimerEvent](https://github.com/photonstorm/phaser/blob/7c46cffdbadd56ab12d829519919c54402185642/src/time/TimerEvent.js)
* Learn to use [Phaser.GameObjects.Text](https://github.com/photonstorm/phaser/blob/31bf979eb25c70441b8228d5c9643a97746ea7fa/src/gameobjects/text/TextStyle.js)
* Learn to use [Phaser.Geom.Intersects.RectangleToRectangle](https://github.com/photonstorm/phaser/blob/d1f5f8a82b4a64d2a6a6a269e148232b51661a19/src/geom/intersects/RectangleToRectangle.js)


## Thanks to

[Vecteezy](https://www.vecteezy.com "Vecteezy") for the game assets.


## Fixes of the TypeScript definition file

Awaiting merge of the [Pull request](https://github.com/photonstorm/phaser3-docs/pull/23).
This is a work around I have done in the phaser.d.ts file, so that the Intersects.RectangleToRectangle works for this example.

```
Line 13933:
/**
 * Gets the bounds of this Game Object, regardless of origin.
 * The values are stored and returned in a Rectangle, or Rectangle-like, object.
 * @param output An object to store the values in. If not provided a new Rectangle will be created.
 */
getBounds<O extends Phaser.Math.Vector2>(output?: Phaser.Geom.Rectangle): Phaser.Geom.Rectangle;
```
