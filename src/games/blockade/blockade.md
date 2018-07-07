# Blockade

![Blockade](/assets/games/blockade/README.gif)


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


## What will you learn

* Learn to use [GameConfig](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/game-config.md)
* Learn to use [Phaser.Scene](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/scene-config.md)
* Learn to use Phaser.Input.Keyboard.Key
* Learn to use Phaser.GameObjects.BitmapText
* Learn to use Phaser.GameObjects.Graphics
* Learn to use Phaser.Geom.Circle


## Fixes of the TypeScript definition file

Awaiting [issue](https://github.com/photonstorm/phaser3-docs/issues/49) to be fixed.
This is a work around I have done in the phaser.d.ts file:
```
Line 1603:
/**
 * Options for the Graphics game Object.
 */
declare type GraphicsOptions = Partial<GraphicsStyles> & {
    /**
     * The x coordinate of the Graphics.
     */
    x: number;
    /**
     * The y coordinate of the Graphics.
     */
    y: number;
};
```
