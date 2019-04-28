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

#### fadeIn
Fade camera in to given color over the duration specified.

#### fadeOut
Fade camera out to given color over the duration specified.

#### fadeFrom
Fade camera from given color to transparent over the duration specified.

#### fade
Fade camera from transparent to given color over the duration specified.

#### flash
Flash camera with given color immediately and then fade it again quickly over the duration specified.

#### shake
Shake camera by the given intensity over the duration specified.

#### pan
Effect to scroll camera so that the center of the viewport finishes at the given destionation.

#### zoomTo
Effect to zoom camera to the given scale.

#### setLerp
Set linear interpolation value to use when following a target.

> Default value is 1 = camera instantly snaps to the target coordinates
> A lower value, f.e. 0.1. means a more smooth transition.

#### setFollowOffset
Set horizontal and vertical offset of the camera from its follow target.

#### startFollow
Set the camera to follow a game object.
Use low [lerp](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/cameras/camera.md#setLerp) values (such as 0.1) to automatically smooth the camera motion.

> The camera will automatically adjust its scroll position to keep the target game object in its center.

> If you find you're getting a slight "jitter" effect when following an object it's probably to do with sub-pixel
rendering of the targets position. This can be rounded by setting the `roundPixels` argument to `true` to
force full pixel rounding rendering.

#### stopFollow
Stop camera from following the game object.

#### resetFX
Reset any active FX, such as a fade, flash or shake.

### Extends

- [BaseCamera](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/cameras/base-camera.md)

### Mixins

- [Components.Flip](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/gameobjects/components/flip.md)
- [Components.Tint](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/gameobjects/components/tint.md)

### References

- [Camera Logic in a 2D Platformer](https://www.gamasutra.com/blogs/JochenHeizmann/20171127/310386/Camera_Logic_in_a_2D_Platformer.php)
