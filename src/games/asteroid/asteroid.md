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
This is a work around I have done in the phaser.d.ts file, so that the this.body works.
```
Line 12079:
/**
 * If this Game Object is enabled for physics then this property will contain a reference to a Physics Body.
 */
body: any;
```

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
