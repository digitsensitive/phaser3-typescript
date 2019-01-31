## Phaser.Cameras.Scene2D

In case of doubt, the [official source code](https://github.com/photonstorm/phaser) should be accessed.

### Introduction

The camera manager is one of the [seven core plugins](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/scene/systems.md#core-plugins).
It is installed into every scene and you can access it with `this.cameras`.
It is responsible for managing all of the scene cameras.

### Public Functions

#### add
Add a new camera into the camera manager.

The camera manager can support `up to 31 different cameras`.
Each camera has its own viewport, which controls the size of the camera and its position within the canvas.

#### addExisting
Add an existing camera into the camera manager.

> If this method returns `null` then the camera already exists in this camera manager.

#### getTotal
Get the total number of cameras in this camera manager.

> If the optional `isVisible` argument is set it will only count cameras that are currently visible.

#### getCamera
Get a camera based on its name.

> Camera names are optional and do not have to be set

#### getCamerasBelowPointer
Returns an array of all cameras below the given pointer.

> The first camera in the array is the top-most camera in the camera list.

#### remove
Remove the given camera, or an array of cameras, from this camera manager.

#### resetAll
Resets this camera manager.

#### resize
Resizes all cameras to the given dimensions.

#### fromJSON
Populate the camera manager based on the given configuration object, or an array of config objects.

```
const cameraObject: InputJSONCameraObject = {
  name: '',
  x: 0,
  y: 0,
  width
  height
  zoom: 1,
  rotation: 0,
  roundPixels: false,
  scrollX: 0,
  scrollY: 0,
  backgroundColor: false,
  bounds: {
    x: 0,
    y: 0,
    width
    height
  }
}
```
