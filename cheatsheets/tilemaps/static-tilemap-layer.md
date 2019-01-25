## Phaser.Tilemaps.StaticTilemapLayer

In case of doubt, the [official source code](https://github.com/photonstorm/phaser) should be accessed.

### Introduction

A static tilemap layer is a game object that renders LayerData from a Tilemap when used in combination
with one, or more, Tilesets.

> It is optimized for rendering speed over flexibility
You cannot apply per-tile effects like tint or alpha, or change the tiles or tilesets the layer uses.
Use a Static Tilemap Layer instead of a Dynamic Tilemap Layer when you don't need tile manipulation features.

### Public Functions

#### setCollisionByProperty
Sets collision on the tiles within a layer by checking tile properties.
If a tile has a property that matches the given properties object, its collision flag will be set.

> You can also use an array of values, e.g. `{ types: ["stone", "lava", "sand" ] }`
If a tile has a "types" property that matches any of those values, its collision flag will be updated.

#### renderDebug
Draws a debug representation of the layer to the given graphics.

> Helpful if you want to get a quick idea, which of your tiles are colliding

```
let debugGraphics = this.add.graphics();
this.foregroundLayer.renderDebug(debugGraphics, {
  tileColor: null, // Color of non-colliding tiles
  collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
  faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
});
```

### Extends

- [GameObject](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/gameobjects/gameobject.md)

### Mixins

- [Components.Alpha](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/gameobjects/components/alpha.md)
- [Components.BlendMode](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/gameobjects/components/blend-mode.md)
- [Components.ComputedSize](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/gameobjects/components/computed-size.md)
- [Components.Depth](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/gameobjects/components/depth.md)
- [Components.Flip](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/gameobjects/components/flip.md)
- [Components.GetBounds](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/gameobjects/components/get-bounds.md)
- [Components.Origin](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/gameobjects/components/origin.md)
- [Components.Pipeline](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/gameobjects/components/pipeline.md)
- [Components.ScaleMode](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/gameobjects/components/scaleMode.md)
- [Components.ScrollFactor](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/gameobjects/components/scroll-factor.md)
- StaticTilemapLayerRender
