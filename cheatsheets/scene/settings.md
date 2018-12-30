## Phaser.Scenes.Settings

In case of doubt, the [official source code](https://github.com/photonstorm/phaser) should be accessed.

### Introduction

You can pass a configuration object into the constructor of a scene to define
multiple parameters. For example you can choose the plugins, give a scene name
and more.

This is probably the most basic configuration, where we only choose a scene name:

```
constructor() {
  super({
    key: "MyScene"
  });
}
```

If you prefer, you can define the configuration outside of the class as follows:

```
const mySceneConfig = {
  key: "MyScene"
};

export class MyScene extends Phaser.Scene {

  constructor() {
    super(mySceneConfig);
  }
}
```

### Parameters

Consult the official [Settings.js](https://github.com/photonstorm/phaser/blob/master/src/scene/Settings.js)
to see a complete list of parameters to use.

We will go deeper into just some of the parameters here.

### The injection map

You can find more informations about how to use the `map` object [here](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/data/systems.md).

### Plugins

You can find more informations about how to use the `plugins` object [here](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/data/systems.md).

### References

- [Official Phaser 3 Scenes Settings](https://github.com/photonstorm/phaser/blob/master/src/scene/Settings.js)
