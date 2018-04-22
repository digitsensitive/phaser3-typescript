## :ballot_box_with_check: Phaser.Game

In case of doubt, the [official source code](https://github.com/photonstorm/phaser) should be accessed.

#### Example

```
const config: GameConfig = {
  width: 800,
  height: 600,
  type: Phaser.AUTO,
  parent: "game",
  scene: MainScene,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: false
    }
  }
};
```

#### Interesting parameters with default values

```
Informations about the game

* title             : ''
* url               : 'http://phaser.io'
* version           : ''
```

```
Size and adjustments of your game

* width             : 1024
* height            : 768
* zoom              : 1 (will simply enlarge width and height with this factor)
* resolution        : 1
```

```
Rendering and context

* type              : CONST.AUTO
AUTO will automatically detect the render. You can choose CONST.CANVAS to
choose the CANVAS Renderer or CONST.WEBGL for WebGL Rendering.
* parent            : null
Select where you want to render the game. It refers to the id of your
html element.
```

```
Scenes and Input

* scene             : []
This is a very important parameter. Here you put all the scenes of your game.
For example you might have a boot scene, a main menu scene and a game scene.
Important: If you have more then one scene, create an array and NOT an object.
* input             : {}
Here you can specify which inputs are allowed. If you do not define it,
keyboard, mouse and touch will be allowed.
```

```
Random

* pixelArt          : false
If you work with pixel art you should set this to true.
* backgroundColor   : 0x000000
Set the background color
```

#### List of all parameters with default values

```
width                 : 1024
height                : 768
zoom                  : 1
resolution            : 1
type                  : CONST.AUTO
parent                : null
canvas                : null
canvasStyle           : null
scene                 : null
seed                  : ?
title                 : ''
url                   : 'http://phaser.io'
version               : ''
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
disableContextMenu    : false
banner                : false
banner {
  hidePhaser          : false
  text                : '#ffffff'
  background          : ?
}       
fps {
  min                 : 10
  target              : 60
  forceSetTimeOut     : false
  deltaHistory        : 10
  panicMax            : 120
}
antialias             : true
pixelArt              : false
autoResize            : false
roundPixels           : false
transparent           : false
clearBeforeRender     : true
premultipliedAlpha    : true
preserveDrawingBuffer : false
failIfMajorPerformanceCaveat : false
powerPreference       : 'default'
backgroundColor       : 0x000000
callbacks {
  preBoot             : NOOP
  postBoot            : NOOP
}
physics               : {}
default               : false
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
images {
  default             : ?
  missing             : ?
}
```
