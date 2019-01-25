## Phaser.Tweens.Tween

In case of doubt, the [official source code](https://github.com/photonstorm/phaser) should be accessed.

### Introduction

The Tween itself.

### Example

```
this.tweens.add({
  targets: this,
  props: { x: this.x - 10, y: this.y - 10 },
  delay: 0,
  duration: 100,
  ease: "Power1",
  easeParams: null,
  hold: 0,
  repeat: 0,
  repeatDelay: 0,
  yoyo: true,
  paused: false
});
```

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

#### pause
Pause the tween.

#### play
Play the tween.

#### resume
Resumes the playback of a previously paused tween.

#### complete
Flags the tween as being complete, whatever stage of progress it is at.

> If an onComplete callback has been defined it will automatically invoke it, unless a `delay`
argument is provided, in which case the tween will delay for that period of time before calling the callback.
> If you don't need a delay, or have an onComplete callback, then call `Tween.stop` instead.

#### stop
Stops the tween immediately, whatever stage of progress it is at
and flags it for removal by the tween manager.

### References

- [Map and Set](https://codecraft.tv/courses/angular/es6-typescript/mapset)
