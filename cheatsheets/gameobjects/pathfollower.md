## Phaser.GameObject.PathFollower

In case of doubt, the [official source code](https://github.com/photonstorm/phaser) should be accessed.

### Introduction

The PathFollower game object extends all the functionalities from the sprite game object.
In addition it can follow a path (bound to a single path at any one time) automatically.

### Example

```
let myPathFollower = this.add.follower(
  new Phaser.Curves.Path(),
  20,
  30,
  "texture",
  "frame"
);
```

### Extends

- [Sprite](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/gameobjects/sprite.md)

#### Mixins

- [Components.PathFollower](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/gameobjects/components/path-follower.md)
