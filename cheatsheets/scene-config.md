## The Scene configuration object

![Scene Config](/assets/cheatsheets/sceneConfig.png)

There are many parameters you can define when you create a scene
configuration object, which you will pass to the Scene Constructor.
You will find a short example and then we will have a look
at the some interesting parameters.

If you are interested to see all the parameters check out the list of
parameters at the bottom of this site.

In case of doubt, the [official source code](https://github.com/photonstorm/phaser) should be accessed.

#### Example

```
{
  key: "myScene",
  physics: {
    arcade: {
      debug: true,
      gravity: { y: 200 }
    }
  }
}
```

#### Interesting parameters (parameter : description)

```
Informations about the scene

* key               : The name of the scene
* visible           : If the scene is visible
```

```
Physics of the scene

* physics           : Define the physics for that specific scene
```

#### List of all parameters (parameter : default value)

```
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
physics               : {}
loader                : {}
plugins               : false
status                : CONST.PENDING
isBooted              : false
data                  : {}
```
