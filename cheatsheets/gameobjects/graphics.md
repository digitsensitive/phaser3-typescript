## Phaser.GameObjects.Graphics

In case of doubt, the [official source code](https://github.com/photonstorm/phaser) should be accessed.

### Introduction

Draw primitive shapes to your game: rectangles, circles, polygons, lines, arcs and curves.
Choose a line or fill style (or both) before you start to create your shapes.

Use predefined methods (f.e. fillRect) to draw your shapes or create shapes free-style with
beginPath, moveTo, lineTo, closePath and strokePath.


> Under WebGL the graphics data is decomposed into polygons.

> If your graphic object doesn't change much (or at all) once you have drawn your shape to it, then you will help performance by calling [generate Texture](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/gameobjects/graphics.md#generatetexture).
> This will 'bake' the graphic object into a texture, and return it. You can then use this Texture for Sprites or other display objects.

### Example

This will draw a white circle with a radius of 10.

```
let myGraphic = this.add
      .graphics({
        x: 20,
        y: 20,
        lineStyle: { width: 1, color: 0xffffff, alpha: 1 }
      })
      .strokeCircle(30, 30, 10);
```

### Public Functions

#### setDefaultStyles

Set the default style settings for this graphics object.

#### save

Save the state of the graphic by pushing the current state onto a stack.

> The most recently saved state can then be restored with [restore](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/gameobjects/graphics.md#restore).

#### restore

Restore the most recently saved state of the graphic by popping from the state stack.

> Use [save](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/gameobjects/graphics.md#save) to save the current state, and call this afterwards to restore that state.
> If there is no saved state, this command does nothing.

#### translateCanvas

Insert a translation command into the graphic objects command buffer.

> All objects drawn after calling this method will be translated by the given amount.

#### scaleCanvas

Insert a scale command into the graphic object command buffer.

> All objects drawn after calling this method will be scaled by the given amount.

#### rotateCanvas

Insert a rotation command into the graphic object command buffer.

> All objects drawn after calling this method will be rotated by the given amount.

#### clear

Clear command buffer and reset the fill and line style to their defaults.

#### generateTexture

Generate a texture out of this graphic object. As the `key` you can pass a string to generate a texture
and add it to the texture manager. You can also pass a canvas, in that case the texture will be drawn to that context.

### Extends

- [GameObject](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/gameobjects/gameobject.md)

### Mixins

- [Components.Alpha](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/gameobjects/components/alpha.md)
- [Components.BlendMode](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/gameobjects/components/blend-mode.md)
- [Components.Depth](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/gameobjects/components/depth.md)
- [Components.Mask](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/gameobjects/components/mask.md)
- [Components.Pipeline](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/gameobjects/components/pipeline.md)
- [Components.ScrollFactor](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/gameobjects/components/scroll-factor.md)
- [Components.Transform](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/gameobjects/components/transform.md)
- [Components.Visible](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/gameobjects/components/visible.md),
- Render