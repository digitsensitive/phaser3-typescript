## Phaser.GameObjects.GameObjectCreator

In case of doubt, the [official source code](https://github.com/photonstorm/phaser) should be accessed.

### Introduction

The Game Object Creator is one of the [seven core plugins](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/scene/systems.md#core-plugins) from a scene. It allows you to quickly create many common types of
game objects and return them.
It is installed into every scene and you can access it with `this.make`.

> Unlike the Game Object Factory, they are not automatically added to the Scene.

### Example

```
let mySprite = this.make.sprite({ x: 0, y: 0, key: "mySprite" });
```
