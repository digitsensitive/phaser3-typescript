## Phaser.Data.DataManager.DataManagerPlugin

In case of doubt, the [official source code](https://github.com/photonstorm/phaser) should be accessed.

### Introduction

The Data Manager Plugin is one of the [seven default plugins](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/scene/systems.md#default-plugins).
It is installed into every scene and you can access it with `this.data`.

> With `this.registry` you can access a game-wide instance of the data manager.
This allows you to exchange data between scenes via a universal and shared point.

### Public Functions

#### destroy
The scene that owns this plugin is being destroyed.
We need to shutdown and then kill off all external references.

### Extends

- [DataManager](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/data/data-manager.md)
