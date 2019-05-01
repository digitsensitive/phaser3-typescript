## Phaser.GameObjects.Sprite

In case of doubt, the [official source code](https://github.com/photonstorm/phaser) should be accessed.

### Introduction

Useful to display both static and animated images.

> A sprite can be animated. As such, they take a fraction longer to precess than images.

### Example

```
let mySprite = this.add.sprite(20, 30, "spriteTexture", "imageFrame");
```

### Public Functions

#### play
Start playing the given animation.

#### toJSON
Build a JSON representation of this sprite.

### Extends

- [GameObject](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/gameobjects/gameobject.md)

#### Mixins

- [Components.Alpha](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/gameobjects/components/alpha.md)
- [Components.BlendMode](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/gameobjects/components/blend-mode.md)
- [Components.Depth](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/gameobjects/components/depth.md)
- [Components.Flip](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/gameobjects/components/flip.md)
- [Components.GetBounds](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/gameobjects/components/get-bounds.md)
- [Components.Mask](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/gameobjects/components/mask.md)
- [Components.Origin](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/gameobjects/components/origin.md)
- [Components.Pipeline](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/gameobjects/components/pipeline.md)
- [Components.ScaleMode](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/gameobjects/components/scaleMode.md)
- [Components.ScrollFactor](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/gameobjects/components/scroll-factor.md)
- [Components.Size](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/gameobjects/components/size.md)
- [Components.TextureCrop](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/gameobjects/components/texture-crop.md)
- [Components.Tint](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/gameobjects/components/tint.md)
- [Components.Transform](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/gameobjects/components/transform.md)
- [Components.Visible](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/gameobjects/components/visible.md)
- SpriteRender
