# Flappy Bird

![FlappyBird](https://github.com/digitsensitive/phaser3-typescript/blob/master/src/games/flappy-bird/assets/readme/README.gif)

## Description

Clone of the famous flappy bird game released in May 24, 2013.

## How to run it

Adjust the `webpack.config.js` file as follows:
> `entry: './src/games/flappy-bird/game.ts'`

## What will you learn

* Learn to use [GameConfig](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/game-config.md)
* Learn to use [Phaser.Scene](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/scene-config.md)
* Learn to use Phaser.Loader.LoaderPlugin
* Learn to use Phaser.GameObjects.Text
* Learn to use Phaser.Input.Keyboard.Key
* Learn to use Phaser.GameObjects.Sprite
* Learn to use Phaser.Time.TimerEvent
* Learn to use Phaser.GameObjects.Group
* Learn to use Phaser.GameObjects.TileSprite
* Learn to use Phaser.Tweens.Tween
* Learn to use Phaser.Actions.Call
* Learn to use Arcade Physics Overlap

## Fixes of the TypeScript definition file

Awaiting [issue](https://github.com/photonstorm/phaser3-docs/issues/19) to be fixed.
This is a work around I have done in the phaser.d.ts file.
```
Line 13304:
/**
 * If this Game Object is enabled for physics then this property will contain a reference to a Physics Body.
 */
body: any;
```

Awaiting [issue](https://github.com/photonstorm/phaser3-docs/issues/27) to be fixed.
This is a work around I have done in the phaser.d.ts file.
```
Line 28958:
overlap(object1: Phaser.GameObjects.GameObject | any[] | Phaser.GameObjects.Group, object2: Phaser.GameObjects.GameObject | any[] | Phaser.GameObjects.Group, overlapCallback?: ArcadePhysicsCallback, processCallback?: ArcadePhysicsCallback, callbackContext?: any): boolean;
```
