## Scene.Systems

In case of doubt, the [official source code](https://github.com/photonstorm/phaser) should be accessed.

### Introduction

> When you create a new scene the Scene Manager creates an object called `sys`.
This class is the core and it controls quite a lot. It also contains references
to global systems belonging to game.

#### Core plugins

- The Event Emitter
- [The 2D Camera Manager](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/cameras/camera-manager.md)
- [The Game Object Creator](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/gameobjects/game-object-creator-plugin.md)
- The Game Object Factory
- [The Scene Plugin](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/scene/plugins/scene-plugin.md)
- The Display List
- The Update List

The core plugins are `non-optional`.

#### Default plugins

- The 3D Camera Manager
- [The Clock](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/time/time.md)
- [The Input Plugin](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/input/input-plugin.md)
- [The Data Manager Plugin](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/data/data-manager-plugin.md)
- [The Loader Plugin](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/loader/loader-plugin.md)
- [The Tween Manager](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/tweens/tween-manager-plugin.md)
- The Lights Plugin

The default plugins are `optional`, but still they are installed into your
scene unless you specify otherwise.

#### Scene class

You can pass a configuration object into the constructor of a scene to define
multiple parameters.

```
const SceneConfig = {
  key: "YourScene",
  active: false,
  visible: true,
  pack: false,
  cameras: null,
  map: {},
  mapAdd: {},
  physics:{},
  loader: {},
  plugins: false
};
```

#### How to add and remove plugins

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

And last but no least, you can define the config of the scene outside of the class:

```
const MySceneConfig = {
  key: "YourScene",
  plugins: []
};

export class YourScene extends Phaser.Scene {

  constructor() {
    super(MySceneConfig);
  }
}
```

#### How to access the plugins

Phaser 3 uses the so called `Scene Injection Map`. This map is an object, that
maps every plugin to a property within the corresponding scene. For example the
Input Plugin is mapped to the `input` property. So you can access the Input Plugin
within your scene with `this.input`. The `this` refers to your scene
obviously.

> If you separate the game code of a game object to another file, you will have to
get a reference to the scene. This means, that if you create the object in your
scene, you will have to send the `this` with it. You will see plenty examples in
my repository.

This is a list of the properties:

| Property | Value |
| -------|------|
| game | game |
| anims | anims |
| cache | cache |
| plugins | plugins |
| registry | registry |
| scale | scale |
| sound | sound |
| textures | textures |
| events | events |
| cameras | cameras |
| add | add |
| make | make |
| scenePlugin | scene |
| displayList | children |
| lights | lights |
| data | data |
| input | input |
| load | load |
| time | time |
| tweens | tweens |
| arcadePhysics | physics |
| impactPhysics | impact |
| matterPhysics | matter |

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
