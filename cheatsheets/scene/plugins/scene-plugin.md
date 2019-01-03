## Phaser.Scenes.ScenePlugin

In case of doubt, the [official source code](https://github.com/photonstorm/phaser) should be accessed.

### Introduction

The Scene Plugin is one of the [seven core plugins](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/scene/systems.md#core-plugins).
It is installed into every scene and you can access it with `this.scene`.

### Public Functions

#### start()
Shutdown the scene you call this function from and run the given one.

You can not only pass the scene you want to start, but also the
[config](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/scene/systems.md#scene-config) for it.

```
this.scene.start("MyScene", {
  active: false,
  visible: true,
});
```

#### restart()
Restart the current scene.

#### transition()

***
WIP:

With `this.scene.get('sceneName')` you can get the scene data from every scene.
With `this.scene.sendToBack('theScene')` you can render a scene below other scenes.
With `this.scene.bringToTop('theScene')` you can render a scene on top other scenes.
With `moveDown`and `moveUp` you can move a scene down or up one position on the scenes list.

this.scene.shutdown and this.scene.destroy not working (missing TS Defs?).


Scene consts:
PENDING: 0,
INIT: 1,
START: 2,
LOADING: 3,
CREATING: 4,
RUNNING: 5,
PAUSED: 6,
SLEEPING: 7,
SHUTDOWN: 8,
DESTROYED: 9
***

### References

- [Official Phaser 3 ScenePlugin](https://github.com/photonstorm/phaser/blob/master/src/scene/ScenePlugin.js)
