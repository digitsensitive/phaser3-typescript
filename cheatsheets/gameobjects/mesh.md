## :ballot_box_with_check: Phaser.GameObject.Mesh

In case of doubt, the [official source code](https://github.com/photonstorm/phaser) should be accessed.

#### Example

```
let newMesh = this.add.mesh(
  300,
  300,
  [-250, -250, -250, 250, 250, 250, -250, -250, 250, 250, 250, -250],
  [0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0],
  [0xffffff, 0xffffff, 0xffffff, 0xffffff, 0xffffff, 0xffffff],
  [1, 1, 1, 1, 1, 1],
  "texture"
);
```

> You can access and manipulate the vertices with newMesh.vertices[0], newMesh.vertices[1] etc.

> You can access and manipulate the uvs with newMesh.uv[0], newMesh.uv[1] etc.

#### Parameters

```
x                    : the x position of the mesh
y                    : the y position of the mesh
vertices             : array of x and y positions relative to center of mesh object
uv                   : mapping of the uv coordinates
colors               : array of colors for each uv texture coordinate
alphas               : array of alphas for each uv texture coordinate
texture              : sprite name
frame                : the sprite frame
```

When you render a standard Sprite in WebGL it consists of 2 triangles drawn as a [quad](https://cascade.madmimi.com/promotion_images/1776/7835/original/quad.png?1495210535).
The texture is mapped using the UV coordinates.

> The exact positions in the coordinate system (x and y) are specified under vertices

> The texture coordinates (U and V = UV) are defined in uv

#### Extends

- [GameObject](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/gameobjects/gameobject.md)

#### Mixins

- [Components.Alpha](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/gameobjects/components/alpha.md)
- [Components.BlendMode](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/gameobjects/components/blendMode.md)
- [Components.Depth](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/gameobjects/components/depth.md)
- [Components.Flip](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/gameobjects/components/flip.md)
- [Components.GetBounds](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/gameobjects/components/getBounds.md)
- [Components.Mask](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/gameobjects/components/mask.md)
- [Components.Origin](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/gameobjects/components/origin.md)
- [Components.Pipeline](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/gameobjects/components/pipeline.md)
- [Components.ScaleMode](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/gameobjects/components/scaleMode.md)
- [Components.ScrollFactor](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/gameobjects/components/scrollFactor.md)
- [Components.Size](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/gameobjects/components/size.md)
- [Components.Texture](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/gameobjects/components/texture.md)
- [Components.Transform](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/gameobjects/components/transform.md)
- [Components.Visible](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/gameobjects/components/visible.md)
- MeshRender
