## Phaser.Cameras.Scene2D.Camera

In case of doubt, the [official source code](https://github.com/photonstorm/phaser) should be accessed.

### Introduction

The camera is the way in which all games are rendered in Phaser.
They provide a view into your game world and can be positioned, rotated, zoomed and scrolled accordingly.

A camera consists of two elements:

1. The viewport
The viewport is the physical position and size of the camera within your game.
Cameras, by default, are created the same size as your game.
Use methods like `setViewport` and `setSize` to change position and size.

2. The scroll values
If you wish to change where the camera is looking in your game, then you scroll it.
You can do this via the properties `scrollX` and `scrollY` or the method `setScroll`.

> Scrolling has no impact on the viewport, and changing the viewport has no impact on the scrolling.

> By default a camera will render all game objects it can see.
You can change this using the `ignore` method, allowing you to filter game objects out on a per-camera basis.

### Public Functions

#### startFollow
Set the camera to follow a game object.
Use low lerp values (such as 0.1) to automatically smooth the camera motion.

> The camera will automatically adjust its scroll position to keep the target game object in its center.

> If you find you're getting a slight "jitter" effect when following an object it's probably to do with sub-pixel
rendering of the targets position. This can be rounded by setting the `roundPixels` argument to `true` to
force full pixel rounding rendering.

### Extends

- [BaseCamera](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/cameras/base-camera.md)

### Mixins

- [Components.Flip](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/gameobjects/components/flip.md)
- [Components.Tint](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/gameobjects/components/tint.md)

### References

- [Camera Logic in a 2D Platformer](https://www.gamasutra.com/blogs/JochenHeizmann/20171127/310386/Camera_Logic_in_a_2D_Platformer.php)
