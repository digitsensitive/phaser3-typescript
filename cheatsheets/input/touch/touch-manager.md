## Phaser.Input.Touch.TouchManager

In case of doubt, the [official source code](https://github.com/photonstorm/phaser) should be accessed.

### Introduction

The touch manager is a helper class and belongs to the [input manager](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/input/input-manager.md).
It listen for native DOM Touch Events and passes them onto the input manager.

> Do not create this class directly, the input manager will create an instance automatically.

### Public Functions

#### startListeners
Starts the touch event listeners running as long as an input target is set.

> This method is called automatically if touch input is enabled in the [game config](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/boot/config.md).
You can call it manually if you need to delay input capturing until later in the game.

#### stopListeners
Stops the touch event listeners.
