
## The GameConfig Class

const config: GameConfig = { };

There are many parameters you can define when you create your own configuration object. We will have a look at the most important ones here. If you are interested to see all the parameters you can check the official source-code and have a look at the Config.js file (src/boot).

#### Important parameters

```
Informations about the game

- title: (default '')
- url: (default 'http://phaser.io')
- version: (default '')
```

```
Size and adjustments of your game

* width (default: 1024)
* height (default: 768)
* zoom (default 1) - will simply enlarge width and height with this factor
* resolution (default 1)
```

```
Rendering and context

* type (default CONST.AUTO)
AUTO will automatically detect the render. You can choose CONST.CANVAS to
choose the CANVAS Renderer, CONST.WEBGL for WebGL Rendering or CONST.HEADLESS
to have a headless renderer.
* parent (default: null)
Select where you want to render the game. It refers to the id of your
html element.
```

```
Scenes and Input

* scene (default {})
This is a very important parameter. Here you put all the scenes of your game.
For example you might have a boot scene, a main menu scene and a game scene.
* input (default {})
Here you can specify which inputs are allowed. If you do not define it,
keyboard, mouse and touch will be allowed.
```

```
Random

* pixelArt (default false)
If you work with pixel art you should set this to true.
* backgroundColor (default 0x000000)
Set the background color
```

#### Example

```
const config: GameConfig = {
  width: 800,
  height: 600,
  type: Phaser.AUTO,
  parent: "game",
  scene: {
    MainScene
  }
};
```

#### List of parameters (parameter : default value)

```
width               : 1024
height              : 768
zoom                : 1
resolution          : 1
type                : CONST.AUTO
parent              : null
canvas              : null
canvasStyle         : null
scene               : {}
seed                : ?
title               : ''
url                 : 'http://phaser.io'
version             : ''
input {
  keyboard            : true
  keyboard.target     : window
  mouse               : true
  mouse.target        : null
  touch               : true
  touch.target        : null
  touch.capture       : true
  gamepad             : false
}
disableContextMenu  : false
banner              : false
banner.hidePhaser   : false
banner.text         : '#ffffff'
banner.background   : ?
fps {
  min                 : 10
  target              : 60
  forceSetTimeOut     : false
  deltaHistory        : 10
  panicMax            : 120
}
pixelArt            : false
autoResize          : false
roundPixels         : false
transparent         : false
clearBeforeRender   : true
backgroundColor     : 0x000000
callbacks           : {}
callbacks.preBoot   : NOOP
callbacks.postBoot  : NOOP
loader {
  baseURL             : ?
  path                : ?
  enableParallel      : true
  maxParallelDownloads: 4
  crossOrigin         : undefined
  responseType        : ?
  async               : true
  user                : ?
  password            : ?
  timeout             : 0
}
images              : {}
images.default      : ?
images.missing      : ?
```
