## Phaser.Tweens.TweenManager

In case of doubt, the [official source code](https://github.com/photonstorm/phaser) should be accessed.

### Introduction

The tween manager is one of the [seven default plugins](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/scene/systems.md#core-
plugins) from a scene. It controls and updates tweens and timelines.
It is installed into every scene and you can access it with `this.tweens`.

### Example

Basic tween data config:
```
const TweenDataConfig = {
  targets: null,
  delay: 0,
  duration: 1000,
  ease: 'Power0',
  easeParams: null,
  hold: 0,
  repeat: 0,
  repeatDelay: 0,
  yoyo: false,
  flipX: false,
  flipY: false
}

let myTween = this.tweens.add(TweenDataConfig);
```

[Table](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/tweens/ease-map.md) of easing functions.

> The tween builder is capable to process object properties.
> For example if you want the tween to target the alpha value, you can simply add
alpha: 0.2 and the tween builder will use the GetProps() function to get an array
of all the targets the tween is operating on. I prefer to use the props object
and put all my targets in there.

```
const TweenDataConfig = {
  ...
  alpha: 0.8,
  ...
}
```

or

```
const TweenDataConfig = {
  ...
  props: { alpha: 0.8 }
  ...
}
```

### Public Functions

#### createTimeline
Create a tween timeline and return it, but do NOT add it to the active or pending tween lists.

#### timeline
Create a tween timeline and add it to the active tween list.

#### create
Create a tween and return it, but do NOT add it to the active or pending tween lists.

#### add
Create a tween and add it to the active tween list.

#### existing
Add an existing tween into the active tween list.

#### addCounter
Create a tween and add it to the active tween list.

#### makeActive
Checks if a tween or timeline is active and adds it to the tween Manager
at the start of the frame if it isn't.

#### each
Passes all tweens to the given callback.

#### getAllTweens
Returns an array of all active tweens and timelines in the tween manager.

#### getGlobalTimeScale
Returns the scale of the time delta for all tweens and timelines owned by this tween manager.

#### getTweensOf
Returns an array of all tweens or timelines in the tween manager which affect
the given target or array of targets.

#### isTweening
Checks if the given object is being affected by a playing tween.

#### killAll
Stops all tweens in this tween manager. They will be removed at the start of the frame.

#### killTweensOf
Stops all tweens which affect the given target or array of targets.
The tweens will be removed from the tween manager at the start of the frame.

#### pauseAll
Pauses all tweens in this tween manager.

#### resumeAll
Resumes all tweens in this tween manager.

#### setGlobalTimeScale
Sets a new scale of the time delta for this tween manager.

#### shutdown
The scene that owns this plugin is shutting down.

> We need to kill and reset all internal properties as well as stop listening to scene events.

#### destroy
The scene that owns this plugin is being destroyed.
We need to shutdown and then kill off all external references.
