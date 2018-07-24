# Phaser.Game

In case of doubt, the [official source code](https://github.com/photonstorm/phaser) should be accessed.

## Introduction

In `game.ts` we extend our Game Class with the Phaser Class `Phaser.Game`.
This is the core class of our game, which is responsible for the core systems.
We can specify a number of important [parameters](#parameters) when
initiating the game (using the GameConfig) and access some [functions](#functions).

## Example

```
const config: GameConfig = {
  width: 800,
  height: 600,
  type: Phaser.AUTO,
  parent: "game",
  scene: MainScene,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: false
    }
  }
};
```

## Functions

For more details have a look in the official [game.js](https://github.com/photonstorm/phaser/blob/master/src/boot/Game.js)
file.

### resize

Call this function to update the game width and height.
A possible usage would be to call that function as follows in the `game.ts`:

```
window.onresize = () => {
  game.resize(window.innerWidth, window.innerHeight);
};
```

### runDestroy

Will destroy the Phaser.Game Instance.

## Parameters

There are many parameters you can define and you find them in the official
[config.js](https://github.com/photonstorm/phaser/blob/master/src/boot/Config.js)
file.
