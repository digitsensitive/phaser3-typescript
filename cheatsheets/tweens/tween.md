## Phaser.Tweens.Tween

In case of doubt, the [official source code](https://github.com/photonstorm/phaser) should be accessed.

### Introduction

A tween is able to manipulate the properties of one or more objects to any given value.
This is based on a duration and type of ease.
They are rarely instantiated directly and instead should be created via the [tween manager](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/tweens/tween-manager-plugin.md).

### Example

More advanced tween data config (for basic config see [here](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/tweens/tween-manager-plugin.md#Example)):

```
this.tweens.add({
  targets: this,
  paused: false,
  callbackScope: tween,

  rotation: ...,
  angle: ...,
  alpha: ...,
  props: {
    x: { value: '+=20', duration: 3000, ease: 'Power2' },
    y: ...
  },
  props: {
    x: {
      duration: 100,
      value: {
        getEnd: function (target, key, value) {
          destX -= 30;
          return destX;
        },
        getStart: function (target, key, value) {
          return value + 30;
        }
      }
    }
  },

  delay: 0,
  duration: 100,
  ease: "Power0",
  easeParams: null,
  flipX: false,
  flipY: false,

  completeDelay: 0,
  onComplete: function () {},
  onCompleteParams: [],
  onCompleteScope: callbackScope,

  loop: 0,
  onLoop: function () {},
  onLoopParams: [],
  onLoopScope: callbackScope,
  loopDelay: 0,

  repeat: 0,
  onRepeat: function () {},
  onRepeatParams: [],
  onRepeatScope: callbackScope,
  repeatDelay: 0,

  onStart: function () {},
  onStartParams: [],
  onStartScope: callbackScope,

  onUpdate: function () {},
  onUpdateParams: [],
  onUpdateScope: callbackScope,

  yoyo: true,
  hold: 0,
  onYoyo: function () {},
  onYoyoParams: [],
  onYoyoScope: callbackScope,

  offset: null,
  useFrames: false
});
```

For explanations about the properties see the [official source code](https://github.com/photonstorm/phaser/blob/master/src/tweens/tween/ReservedProps.js).

As soon as the tween returns `true`, then it means it has completed.
It will be moved into the `destroy list` and be destroyed the next frame.
This is all done by the [Tween Manager](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/tweens/tween-manager-plugin.md).

### Public Functions

#### getValue
Returns the current value of the tween.

#### setTimeScale
Set the scale the time applied to this tween.

> A value of 1 runs in real-time. A value of 0.5 runs 50% slower, and so on.

#### getTimeScale
Returns the scale of the time applied to this tween.

#### isPlaying
Checks if the tween is currently active.

#### isPaused
Checks if the tween is currently paused.

#### hasTarget
See if this tween is currently acting upon the given target.

#### restart
Restarts the tween from the beginning.

#### pause
Pause the tween.

#### play
Play the tween.

#### resume
Resumes the playback of a previously paused tween.

#### complete
Flags the tween as being complete, whatever stage of progress it is at.

> If an onComplete callback has been defined it will automatically invoke it, unless a `delay`
argument is provided, in which case the tween will delay for that period of time before calling the callback.
> If you don't need a delay, or have an onComplete callback, then call `Tween.stop` instead.

#### stop
Stops the tween immediately, whatever stage of progress it is at
and flags it for removal by the tween manager.

### References

- [Map and Set](https://codecraft.tv/courses/angular/es6-typescript/mapset)
