## Phaser.Game

In case of doubt, the [official source code](https://github.com/photonstorm/phaser) should be accessed.

### Introduction

The `Phaser.Game` instance controls the entire game.
It parses the [configuration values](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/boot/config.md),
handles the boot process, creates the renderer,
sets up all the global [phaser systems](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/scene/systems.md),
starts the scene manager and begins the main game loop.

> You should generally avoid accessing any of the systems created by Game,
and instead use those made available to you via the Phaser.Scene class

### Public Functions

#### resize
Call this function to update the game width and height.
It will resize renderer and input manager scale.

A possible usage would be to call that function as follows in the `game.ts`:

```
window.addEventListener('resize', () => {
  game.resize(window.innerWidth, window.innerHeight);
});
```


#### getFrame
Get the current frame.

#### getTime
Get the current game timestamp.

#### destroy
Will destroy the game instance on the next frame.

> Set `noReturn` to `true` if you do not want to run Phaser again, so it will free-up
memory being held by the core Phaser plugins.

> Set `removeCanvas` to `true` to remove the parent canvas element from DOM.
