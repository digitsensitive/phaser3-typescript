# :ballot_box_with_check: Phaser.Data.DataManagerPlugin

In case of doubt, the [official source code](https://github.com/photonstorm/phaser) should be accessed.

## Introduction

> When you create a new scene the Scene Manager creates an object called `sys`.
This class is the core and it controls quite a lot (also your plugins).

The data manager plugin is one of seven *default plugins* installed into every scene.
The other default plugins are:

- The 3D Camera Manager
- The Clock
- The Input Plugin
- The Loader Plugin
- The Tween Manager
- The Lights Plugin

> Do not confuse the default plugins with the core plugins. The core plugins are:
- The Event Emitter
- The 2D Camera Manager
- The Game Object Creator
- The Game Object Factory
- The Scene Plugin
- The Display List
- The Update List

If you do not want any of the seven default plugins you can pass an empty array
to the constructor of the scene as follows:

```
constructor() {
  super({
    key: "YourScene",
    plugins: []
  });
}
```

You can also select the plugins you want to load as follows:

```
constructor() {
  super({
    key: "YourScene",
    plugins: ['Loader', 'TweenManager']
  });
}
```

An alternative to the upper approach, is to install the plugins in the `init()`
function yourself:

```
constructor() {
  super({
    key: "YourScene",
    plugins: []
  });
}

init() {
  this.sys.install('Loader');
}
```

## References

* [Phaser World Issue 119](https://labs.phaser.io/edit.html?src=src\pools\bullets.js)
