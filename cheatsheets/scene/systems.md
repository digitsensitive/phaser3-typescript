## Scene.Systems

In case of doubt, the [official source code](https://github.com/photonstorm/phaser) should be accessed.

### Introduction

> When you create a new scene the Scene Manager creates an object called `sys`.
> This class is the core and it controls quite a lot (also your plugins).

The core plugins are:

- The Event Emitter
- The 2D Camera Manager
- The Game Object Creator
- The Game Object Factory
- The Scene Plugin
- The Display List
- The Update List

The default plugins are:

- The 3D Camera Manager
- The Clock
- The Input Plugin
- The Data Manager Plugin
- The Loader Plugin
- The Tween Manager
- The Lights Plugin

The core plugins are `non-optional`. The default plugins are `optional`, but still
they are installed into your scene unless you specify otherwise.

### How to add and remove plugins

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
function yourself, using the Scene Systems `sys`:

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

### How to access the plugins

Phaser 3 uses the so called `Scene Injection Map`. This map is an object, that
maps every plugin to a property within the corresponding scene. For example the
Input Plugin is mapped to the `input` property. So you can access the Input Plugin
within your scene with `this.input`. The `this` refers to your scene
obviously.

> If you separate the game code of a game object to another file, you will have to
> get a reference to the scene. This means, that if you create the object in your
> scene, you will have to send the `this` with it. You will see plenty examples in
> my repository.

Find a list of all the properties here:
[Injection Map Phaser 3](https://github.com/photonstorm/phaser/blob/master/src/scene/InjectionMap.js).

You can access the properties within the `map` object in the scene constructor.
It is possible to rename the properties (here we rename add to add2):

```
constructor() {
  super({
    key: "YourScene",
    map: {
      add: 'add2'
    }
  });
}
```

If you decide to rename stuff here, be careful. If you only want to rename for
example add as we did in the example above, you will be missing the other mappings.
For example you won't be able to access load anymore. So you will have to add
that too as follows:

```
constructor() {
  super({
    key: "YourScene",
    map: {
      load: 'load',
      add: 'add2'
    }
  });
}
```

And there is another problem:
Everything will work fine, but you will get a property error:

> Property 'add2' does not exist on type 'MainScene'. Did you mean 'add'?

So for me, I decided not to use the map at all.

### References

- [Phaser World Issue 119](https://madmimi.com/p/a2dddb)
- [Phaser 3 Systems Github](https://github.com/photonstorm/phaser/blob/master/src/scene/Systems.js)
