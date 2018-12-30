## ScenePlugin

In case of doubt, the [official source code](https://github.com/photonstorm/phaser) should be accessed.

### Introduction

The Scene Plugin is one of the seven core plugins.
It is installed into every scene and you can access it with `this.scene`.

We will inspect here only some of the members and functions. Consult the official [ScenePlugin.js](https://github.com/photonstorm/phaser/blob/master/src/scene/ScenePlugin.js)
to find all the members and functions to access.

### Control and Communications

You will have to know how to control your scenes and how they communicate
with each other.

With `this.scene.start('newScene')` you can start a new scene.
With `this.scene.get('sceneName')` you can get the scene data from every scene.
With `this.scene.sendToBack('theScene')` you can render a scene below other scenes.
With `this.scene.bringToTop('theScene')` you can render a scene on top other scenes.
With `moveDown`and `moveUp` you can move a scene down or up one position on the scenes list.

this.scene.shutdown and this.scene.destroy not working (missing TS Defs?).

### References

- [Official Phaser 3 ScenePlugin](https://github.com/photonstorm/phaser/blob/master/src/scene/ScenePlugin.js)
