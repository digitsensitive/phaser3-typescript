## Phaser.Tilemaps.Tilemap

In case of doubt, the [official source code](https://github.com/photonstorm/phaser) should be accessed.

### Introduction

A Tilemap is simply a container for tilemap data (tilesets and tilemap layers).
A map can have one or more tilemap layers ([StaticTilemapLayer](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/tilemaps/static-tilemap-layer.md) or DynamicTilemapLayer).
The tilemap layers do actually render tiles.

The Tilemap data be parsed from a Tiled JSON file, a CSV file or a 2D array.

> You can only use the methods that change tiles on a DynamicTilemapLayer.

### Example

To create a tilemap (from given key or data) you can use one of the
core scene plugins: [The Game Object Creator](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/gameobjects/game-object-creator-plugin.md).

```
const TilemapConfig = {
  key: "keyOfYourMap",
  data: [][],
  tileWidth: 32,
  tileHeight: 32,
  width: 10,
  height: 10,
  insertNull: false
}

let myTilemap = this.make.tilemap(TilemapConfig);
```

> When loading from CSV or a 2D array, you should specify the tileWidth and tileHeight.
> When parsing from a map from Tiled, the tileWidth, tileHeight, width and height will be pulled from the map data.
> For an empty map, you should specify tileWidth, tileHeight, width and height.

### Public Functions

#### createStaticLayer
Create a new `StaticTilemapLayer` that renders the LayerData associated with the given `layerID`.
The currently selected layer in the map is set to this new layer.

```
let myLayer = myTilemap.createStaticLayer("nameOfLayer", myTileset, 0, 0);
```

> It is important to remember that a static layer cannot be modified!

### References

- [Phaser World Issue 108](https://phaser.io/phaser3/devlog/108)
- [Modular Game Worlds Tilemaps #1](https://medium.com/@michaelwesthadley/modular-game-worlds-in-phaser-3-tilemaps-1-958fc7e6bbd6)
- [Modular Game Worlds Tilemaps #2](https://itnext.io/modular-game-worlds-in-phaser-3-tilemaps-2-dynamic-platformer-3d68e73d494a)
