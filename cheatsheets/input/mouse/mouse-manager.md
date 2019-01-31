## Phaser.Input.Mouse.MouseManager

In case of doubt, the [official source code](https://github.com/photonstorm/phaser) should be accessed.

### Introduction

The mouse manager is a helper class and belongs to the [input manager](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/input/input-manager.md).
It listen for native DOM Mouse Events and passes them onto the input manager.

> Do not create this class directly, the input manager will create an instance automatically.

### Public Functions

#### disableContextMenu
Attempts to disable the context menu from appearing if you right-click on the browser.

Works by listening for the `contextmenu` event and prevent defaulting it.

> Use this if you need to enable right-button mouse support in your game, and the browser
menu keeps getting in the way.

#### requestPointerLock
If the browser supports it, you can request that the pointer be locked to the browser window.

This is classically known as 'FPS controls', where the pointer can't leave the browser until
the user presses an exit key.

If the browser successfully enters a locked state, a `POINTER_LOCK_CHANGE_EVENT` will be dispatched,
from the games input manager, with an `isPointerLocked` property.

> It is important to note that pointer lock can only be enabled after an [engagement gesture](https://w3c.github.io/pointerlock/#dfn-engagement-gesture).

#### releasePointerLock
If the browser supports pointer lock, this will request that the pointer lock is released.
If the browser successfully enters a locked state, a `POINTER_LOCK_CHANGE_EVENT` will be
dispatched - from the game's input manager - with an `isPointerLocked` property.

#### startListeners
Starts the mouse event listeners running as long as an input target is set.

> This method is called automatically if mouse input is enabled in the [game config](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/boot/config.md).

#### stopListeners
Stops the mouse event listeners.
