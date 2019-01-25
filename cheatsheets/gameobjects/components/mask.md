## Phaser.Components.Mask

In case of doubt, the [official source code](https://github.com/photonstorm/phaser) should be accessed.

### Public Functions

#### setMask
Set mask of the game object.

> You must create a musk before, either a GeometryMask or a BitmapMask.

| Mask | WebGL | Canvas |
| -------|:------:|:------:|
| BitmapMask | X |  |
| GeometryMask | X | X |

#### clearMask
Clear mask of the game object.

#### createBitmapMask
Creates and returns a bitmap mask.

> Pass a reference to a renderable Game Object (must use a texture):
For example Image, Sprite, Render Texture or BitmapText.

#### createGeometryMask
Creates and returns a geometry mask.

> Pass a reference to a graphics game object.
