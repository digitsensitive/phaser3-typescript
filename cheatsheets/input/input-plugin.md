## Phaser.Input.InputPlugin

In case of doubt, the [official source code](https://github.com/photonstorm/phaser) should be accessed.

### Introduction

The input plugin is one of the [seven default plugins](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/scene/systems.md#default-plugins). It is installed into every scene unless you specify otherwise and can be accessed with `this.input`.

### Examples
Since the input plugin extends `EventEmitter` you can do the following,
to listen for a pointer down event anywhere on the game canvas:

```
this.input.on('pointerdown', callback, context);
```

You can enable input for game objects by simply calling their [setInteractive](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/gameobjects/gameobject.md) method. Having done this, you can do the following:

```
let MyInteractiveSprite = this.add.sprite(x, y, texture);
MyInteractiveSprite.setInteractive();
MyInteractiveSprite.on('pointerdown', callback, context);
```

### Public Functions

#### isActive
Check to see if both this plugin and the scene to which it belongs is active.

#### clear
Clear a game object from the interactive object associated with it.

#### disable
Disable input on a single game object.

> An input disabled game object still retains its interactive object component
and can be re-enabled at any time, by passing it to `InputPlugin.enable`

#### enable
Enable a game object for interaction.

If the game object already has an interactive object component, it is enabled and returned.
Otherwise, a new interactive object component is created and assigned to the game object's `input` property.

Input works by using hit areas, these are nearly always geometric shapes, such as rectangles or circles, that act as the hit area
for the Game Object. However, you can provide your own hit area shape and callback, should you wish to handle some more advanced
input detection.

> If no arguments are provided it will try and create a rectangle hit area based
on the texture frame the game object is using. If this isn't a texture-bound object,
such as a graphics or bitmapText object, this will fail, and you'll need to provide a specific
shape for it to use.

Example (Passing only a `Input Configuration Object` as argument to this method):
```
const InputConfiguration = {
  hitArea: any,
  hitAreaCallback: function() {},
  draggable: false,
  dropZone: false,
  useHandCursor: false,
  cursor: "",
  pixelPerfect: false,
  alphaTolerance: 1
};
```

#### hitTestPointer
Takes the given pointer and performs a hit test against it, to see which interactive game objects
it is currently above.

> The hit test is performed against which-ever camera the pointer is over.
If it is over multiple cameras, it starts checking the camera at the top of the camera list, and if nothing is found, iterates down the list.

> Calls the [hitTest method](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/input/input-manager.md#hitTest)
from the [input manager](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/input/input-manager.md).

#### getDragState
Get the drag state of the given pointer for this input plugin.

| State | Comment     |
| :------------- | :------------- |
| 0 | Not dragging anything |
| 1 | Primary button down and objects below, so collect a draglist |
| 2 | Pointer being checked if meets drag criteria |
| 3 | Pointer meets criteria, notify the draglist |
| 4 | Pointer actively dragging the draglist and has moved |
| 5 | Pointer actively dragging but has been released, notify draglist |

#### setDragState
Set the drag state of the given pointer for this input plugin (see getDragState)

#### setDraggable
Set the draggable state of the given array of game objects.

> A game object will not fire drag events unless it has been specifically enabled for drag.

#### makePixelPerfect
Creates a function that can be passed to `setInteractive`, `enable` or `setHitArea` that will handle
pixel-perfect input detection on an Image or Sprite based game object, or any custom class that extends them.

The following will create a sprite that is clickable on any pixel that has an alpha value >= 1.

```
this.add.sprite(x, y, key).setInteractive(this.input.makePixelPerfect());
```

The following will create a sprite that is clickable on any pixel that has an alpha value >= 150.

```
this.add.sprite(x, y, key).setInteractive(this.input.makePixelPerfect(150));
```

> As a pointer interacts with the game object it will constantly poll the texture, extracting a single pixel from
the given coordinates and checking its color values.
> This is an expensive process, so should only be enabled on game objects that really need it.
> You cannot make non-texture based Game Objects pixel perfect. So this will not work on Graphics, BitmapText,
Render Textures, Text, Tilemaps, Containers or Particles.

#### setHitArea
Set the hit area for the given array of game objects.

A hit area is typically one of the geometric shapes Phaser provides, such as a `Phaser.Geom.Rectangle`
or `Phaser.Geom.Circle`. However, it can be any object as long as it works with the provided callback.

> If no hit area is provided a Rectangle is created based on the size of the Game Object, if possible to calculate.

#### setHitAreaCircle
Set the hit area for an array of game objects to be a `Phaser.Geom.Circle` shape, using
the given coordinates and radius to control its position and size.

#### setHitAreaEllipse
Set the hit area for an array of game objects to be a `Phaser.Geom.Ellipse` shape, using
the given coordinates and dimensions to control its position and size.

#### setHitAreaFromTexture
Set the hit area for an array of game objects to be a `Phaser.Geom.Rectangle` shape, using
the game objects texture frame to define the position and size of the hit area.

#### setHitAreaRectangle
Set the hit area for an array of game objects to be a `Phaser.Geom.Rectangle` shape, using
the given coordinates and dimensions to control its position and size.

#### setHitAreaTriangle
Set the hit area for an array of game objects to be a `Phaser.Geom.Triangle` shape, using
the given coordinates to control the position of its points.

#### setPollAlways
Sets the pointers to always poll.

When a pointer is polled it runs a hit test to see which game objects are currently below it,
or being interacted with it, regardless if the pointer has actually moved or not.

> You should enable this if you want objects in your game to fire over / out events, and the objects
are constantly moving, but the pointer may not have. Polling every frame has additional computation
costs, especially if there are a large number of interactive objects in your game.

#### setPollOnMove
Set the pointers to only poll when they are moved or updated.

> When a pointer is polled it runs a hit test to see which game objects are currently below it,
or being interacted with it.

#### setPollRate
Set the poll rate value. This is the amount of time that should have elapsed before a pointer
will be polled again. See the `setPollAlways` and `setPollOnMove` methods.

#### setGlobalTopOnly
When set to `true` the global input manager will emulate DOM behavior by only emitting events from
the top-most game objects in the Display List.

If set to `false` it will emit events from all game objects below a pointer, not just the top one.

#### setTopOnly
When set to `true` this input plugin will emulate DOM behavior by only emitting events from
the top-most game objects in the Display List.

If set to `false` it will emit events from all game objects below a pointer, not just the top one.

#### sortGameObjects
Given an array of game objects, sort the array and return it, so that the objects are in depth index order
with the lowest at the bottom.

#### stopPropagation
Causes the input manager to stop emitting any events for the remainder of this game step.

#### addPointer
Add new pointer objects to the input manager.

> Calls the [addPointer method](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/input/input-manager.md#addPointer)
from the [input manager](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/input/input-manager.md).

#### setDefaultCursor
Tells the input system to set a custom cursor.

This cursor will be the default cursor used when interacting with the game canvas.
If an interactive object also sets a custom cursor, this is the cursor that is reset after its use.

Any valid CSS cursor value is allowed, including paths to image files, i.e.:

```
this.input.setDefaultCursor('url(assets/cursors/sword.cur), pointer');
```

It's up to you to pick a suitable cursor format that works across the range of browsers you need to support.
Please read about the differences between browsers when it comes to the file formats and sizes they support:
https://developer.mozilla.org/en-US/docs/Web/CSS/cursor
https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_User_Interface/Using_URL_values_for_the_cursor_property

### Extends

- EventEmitter
