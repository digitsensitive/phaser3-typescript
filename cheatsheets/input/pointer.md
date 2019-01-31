## Phaser.Input.Pointer

In case of doubt, the [official source code](https://github.com/photonstorm/phaser) should be accessed.

### Introduction

A Pointer object encapsulates both mouse and touch input within Phaser.

By default, Phaser will create two pointers for your game to use. If you require more, i.e. for a multi-touch
game, then use the `InputPlugin.addPointer` method to do so, rather than instantiating this class directly,
otherwise it won't be managed by the input system.

You can reference the current active pointer via `InputPlugin.activePointer`. You can also use the properties
`InputPlugin.pointer1` through to `pointer10`, for each pointer you have enabled in your game.

The properties of this object are set by the input plugin during processing. This object is then sent in all
input related events that the input plugin emits, so you can reference properties from it directly in your
callbacks.

### Public Functions

#### positionToCamera
Returns a Vector2 with the translated position of the pointer within the camera.

> Use this to convert pointer positions into camera space.

#### noButtonDown
Check if any buttons are being held down by this pointer.

#### leftButtonDown
Check if the left button is held down by this pointer.

#### rightButtonDown
Check if the right button is held down by this pointer.

#### middleButtonDown
Check if the middle button is held down by this pointer.

#### backButtonDown
Check if the back button is held down by this pointer.

#### forwardButtonDown
Check if the forward button is held down by this pointer.

#### getDistance
If the pointer has a button pressed down at the time this method is called, it will return the
distance between the pointer's `downX` and `downY` values and the current position.

> If no button is held down, it will return the last recorded distance, based on where
the pointer was when the button was released.

If you wish to get the distance being travelled currently, based on the velocity of the pointer,
then see the `Pointer.distance` property.

#### getDistanceX
If the pointer has a button pressed down at the time this method is called, it will return the
horizontal distance between the pointer's `downX` and `downY` values and the current position.

If no button is held down, it will return the last recorded horizontal distance, based on where
the pointer was when the button was released.

#### getDistanceY
If the pointer has a button pressed down at the time this method is called, it will return the
vertical distance between the pointer's `downX` and `downY` values and the current position.

If no button is held down, it will return the last recorded vertical distance, based on where
the pointer was when the button was released.

#### getDuration
If the pointer has a button pressed down at the time this method is called, it will return the
duration since the pointer's was pressed down.

If no button is held down, it will return the last recorded duration, based on the time
the pointer button was released.

#### getAngle
If the pointer has a button pressed down at the time this method is called, it will return the
angle between the pointer's `downX` and `downY` values and the current position.

If no button is held down, it will return the last recorded angle, based on where
the pointer was when the button was released.

The angle is based on the old position facing to the current position.

If you wish to get the current angle, based on the velocity of the pointer, then
see the `Pointer.angle` property.

#### getInterpolatedPosition
Takes the previous and current pointer positions and then generates an array of interpolated values between
the two. The array will be populated up to the size of the `steps` argument.

```
var points = pointer.getInterpolatedPosition(4);

// points[0] = { x: 0, y: 0 }
// points[1] = { x: 2, y: 1 }
// points[2] = { x: 3, y: 2 }
// points[3] = { x: 6, y: 3 }
```

Use this if you need to get smoothed values between the previous and current pointer positions. DOM pointer
events can often fire faster than the main browser loop, and this will help you avoid janky movement
especially if you have an object following a pointer.

> If you provide an output array it will only be populated up to the number of steps provided.
It will not clear any previous data that may have existed beyond the range of the steps count.
Internally it uses the Smooth Step interpolation calculation.
