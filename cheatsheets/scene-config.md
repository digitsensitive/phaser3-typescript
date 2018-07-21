## :ballot_box_with_check: Phaser.Scene

In case of doubt, the [official source code](https://github.com/photonstorm/phaser) should be accessed.

### Example

```
{
  key: "myScene",
  physics: {
    arcade: {
      gravity: { y: 200 }
      debug: true
    }
  }
}
```

### Interesting parameters with default values

```
Informations about the scene

* key               : The name of the scene
* physics           : Define the physics for that specific scene
* map               : properties get injected into scene and map to local systems
* mapAdd            : extends the injection map for a scene
```

### List of parameters with default values

```
Takes a scene configuration object (= Phaser.Scenes.Settings.Config)
and returns a fully formed systems object (= Phaser.Scenes.Settings.Object)

Phaser.Scenes.Settings.Config

key                   : ''
active                : false
visible               : true
files                 : false
cameras               : null
map {
  game                : 'game'
  anims               : 'anims'
  cache               : 'cache'
  registry            : 'registry'
  sound               : 'sound'
  textures            : 'textures'
  events              : 'events'
  cameras             : 'cameras'
  cameras3d           : 'cameras3d'
  add                 : 'add'
  make                : 'make'
  scenePlugin         : 'scene'
  displayList         : 'children'
  lights              : 'lights'
  data                : 'data'
  input               : 'input'
  load                : 'load'
  time                : 'time'
  tweens              : 'tweens'
  arcadePhysics       : 'physics'
  impactPhysics       : 'impact'
  matterPhysics       : 'matter'
}
mapAdd                : {}
physics               : {}
loader                : {}
plugins               : false
status                : CONST.PENDING
isBooted              : false
data                  : {}

Phaser.Scenes.Settings.Object

status                : ?
key                   : ?
active                : ?
visible               : ?
isBooted              : ?
isTransition          : ?
transitionFrom        : ?
transitionDuration    : ?
transitionAllowInput  : ?
data                  : ?
files                 : ?
cameras               : ?
map                   : ?
physics               : ?
loader                : ?
plugins               : ?
```

#### Registry: Game Data Manager (Global)

With `registry` you can save and access data from every scene and
exchange these informations between all your scenes. Using `this.registry.set`
you can save data, using `this.registry.get`you can access data.
