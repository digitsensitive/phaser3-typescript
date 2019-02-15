## TypeScript definition file Problems

Awaiting [issue](https://github.com/photonstorm/phaser3-docs/issues/19) to be fixed.
This is a work around I have done in the `phaser.d.ts` file:

```
Line 15864:
/**
 * If this Game Object is enabled for physics then this property will contain a reference to a Physics Body.
 */
body: any;
```

---

Awaiting [issue](https://github.com/photonstorm/phaser3-docs/issues/71) to be fixed.
This is a work around I have done in the `phaser.d.ts` file:

```
Line 76652:
declare type ArcadeColliderType =
  Phaser.GameObjects.GameObject |
  Phaser.GameObjects.Group |
  Phaser.Physics.Arcade.Sprite |
  Phaser.Physics.Arcade.Image |
  Phaser.Physics.Arcade.StaticGroup |
  Phaser.Physics.Arcade.Group |
  Phaser.Tilemaps.DynamicTilemapLayer |
  Phaser.Tilemaps.StaticTilemapLayer |
  Phaser.GameObjects.GameObject[] |
  Phaser.Physics.Arcade.Sprite[] |
  Phaser.Physics.Arcade.Image[] |
  Phaser.Physics.Arcade.StaticGroup[] |
  Phaser.Physics.Arcade.Group[] |
  Phaser.Tilemaps.DynamicTilemapLayer[] |
  Phaser.Tilemaps.StaticTilemapLayer[];
```

---

Using `classType` is not working when adding a new group.

```
this.enemies = this.add.group({
  classType: Enemy
});
```

Discussed on [Phaser Discourse](https://phaser.discourse.group/t/changes-to-groupconfig-in-3-16-1/1167/4).
Awaiting [issue](https://github.com/photonstorm/phaser3-docs/issues/26) to be fixed.
Currently I have not done any workaround for this.

---
