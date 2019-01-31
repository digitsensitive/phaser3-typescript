## Phaser.Input.InputManager

In case of doubt, the [official source code](https://github.com/photonstorm/phaser) should be accessed.

### Introduction

The input manager is responsible for `handling the pointer related systems`:
Mouse and Touch.

You rarely need to interact with this manager directly. You better should use the input plugin.

> Keyboard and Gamepad are plugins, handled directly by the [input plugin class](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/input/input-plugin.md).

### Public Functions

#### addPointer
Add new pointer object to the input manager.
The pointers are available via the `InputPlugin.pointerX` properties.

> By default Phaser creates two pointer objects

If you want more pointers, you can:

1. call this method or
2. set the `input.activePointers` property in the game config (maximum 10 pointers)

#### hitTest
Perform a hit test using the given pointer and camera, against an array of interactive game objects.

The game objects are culled against the camera, and then the coordinates are translated into the local camera space
and used to determine if they fall within the remaining Game Objects hit areas or not.

If nothing is matched an empty array is returned.

> This method is called automatically by InputPlugin.hitTestPointer and doesn't usually need to be invoked directly.  

#### pointWithinHitArea
Check if the given x and y coordinate are within the hit area of the game object.

> This method assumes that the coordinate values have already been translated into the space of the Game Object.
> If the coordinates are within the hit area they are set into the Game Objects Input `localX` and `localY` properties.

#### pointWithinInteractiveObject
Check if the given x and y coordinate are within the hit area of the interactive object.

> This method assumes that the coordinate values have already been translated into the space of the Interactive Object.
>If the coordinates are within the hit area they are set into the interactive objects input `localX` and `localY` properties.

#### transformPointer
Transforms the `pageX` and `pageY` values of a pointer
into the scaled coordinate space of the input manager.
