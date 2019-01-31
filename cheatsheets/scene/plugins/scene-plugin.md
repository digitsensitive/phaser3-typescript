## Phaser.Scenes.ScenePlugin

In case of doubt, the [official source code](https://github.com/photonstorm/phaser) should be accessed.

### Introduction

The Scene Plugin is one of the [seven core plugins](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/scene/systems.md#core-plugins).
It is installed into every scene and you can access it with `this.scene`.

### Public Functions

#### start
Shutdown the scene you call this function from and run the given one.

You can not only pass the scene you want to start, but also the scene config.

```
this.scene.start("MyScene", {
  active: false,
  visible: true,
  pack: false,
  cameras: null,
  map: {},
  mapAdd: {},
  physics:{},
  loader: {},
  plugins: false
});
```

#### restart
Restart the current scene.

#### transition
Do a transition from current to target scene.
You can use the following object to specify some transition parameters.

```
const SceneTransitionConfig = {
    target: '',
    duration: 1000,
    sleep: false,
    allowInput: false,
    moveAbove: false,
    moveBelow: false,
    onUpdate: function() {},
    onUpdateScope: any,
    data: any
}
```

There are 5 transition related events to use:

- transitionto
- transitioninit
- transitionstart
- transitionwake
- transitioncomplete

#### add
Add the given scene into the scene .

#### launch
Launch the given scene and run it in parallel with this one.

#### run
Run the given scene.

> If the given Scene is paused, it will resume it. If sleeping, it will wake it.
If not running at all, it will be started.

#### pause
Pause the given scene (stops update step but not render).

#### resume
Resume the given scene (starts the update loop again).

#### sleep
Sleep the given scene (stops update and render steps, but no shutdown).

#### wake
Wake up the given scene (starts update and render).

#### switch
Sleep the scene and start the given scene.

#### stop
Shutdown the given scene, clearing display list, timers, etc.

#### remove
Remove a scene from the scene manager.

#### setActive
Set the active state of the given scene.

#### setVisible
Set the visible state of the given scene.

#### isSleeping
Check if the given scene is sleeping or not.

#### isActive
Check if the given scene is active or not.

#### isVisible
Check if the given scene is visible or not.

#### swapPosition
Swap the position of two scenes in the scenes list.

#### moveAbove
Swap the position of two scenes in the scenes list, so that scene B is
directly above scene A.

#### moveBelow
Swap the position of two scenes in the scenes list, so that scene B is
directly below scene A.

#### moveUp
Move a scene up one position in the scenes list.

#### moveDown
Move a scene down one position in the scenes list.

#### bringToTop
Bring a scene to the top of the scenes list.

#### sendToBack
Send a scene to the back of the scenes list.

#### get
Retrieve a scene.

#### getIndex
Retrieve the numeric index of a scene in the scenes list.

### References

- [Phaser World Issue 120](https://madmimi.com/p/2c1afb)
- [Phaser World Issue 121](https://madmimi.com/p/860f1c)
