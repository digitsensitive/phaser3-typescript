## Phaser.Tweens.Timeline

In case of doubt, the [official source code](https://github.com/photonstorm/phaser) should be accessed.

### Introduction

A timeline combines multiple tweens into one
Its overall behavior is otherwise similar to a single tween.

> The timeline updates all of its tweens simultaneously.
Its methods allow you to easily build a sequence of tweens (each one starting after the previous one)
or run multiple tweens at once during given parts of the timeline.

### Example

```
const TimelineDataConfig = {
  tweens,
  targets: this,
  totalDuration,
  duration,
  delay,
  easeParams,
  ease,
  hold,
  repeat,
  repeatDelay,
  yoyo,
  flipX,
  flipY,
  completeDelay,
  loop,
  loopDelay,
  paused,
  useFrames,
  callbackScope,

  onStart,
  onStartScope,
  onStartParams,

  onUpdate,
  onUpdateScope,
  onUpdateParams,

  onLoop,
  onLoopScope,
  onLoopParams,

  onYoyo,
  onYoyoScope,
  onYoyoParams,

  onComplete,
  onCompleteScope,
  onCompleteParams,
}

let myTimeline = this.tweens.timeline(TimelineDataConfig);
```

### Public Functions

#### setTimeScale
Set the value of the time scale applied to this timeline.

> A value of 1 runs in real-time. A value of 0.5 runs 50% slower, and so on.

#### getTimeScale
Get the value of the time scale applied to this timeline.

#### isPlaying
Check if the timeline is playing.

#### add
Add a new timeline.

#### queue
???

#### hasOffset
???

#### isOffsetAbsolute
Check whether the offset value is a number or a directive that is relative to previous tweens.

#### isOffsetRelative
Check if the offset is a relative value rather than an absolute one. If the value is just a number, this returns false.

#### getRelativeOffset
Parses the relative offset value, returning a positive or negative number.

#### calcDuration
Calculates the total duration of the timeline.
Computes all tweens durations and returns the full duration of the timeline.

> The resulting number is stored in the timeline, not as a return value.

#### init
Initializes the timeline, which means all tweens get their init() called, and the total duration will be computed.

> Returns a boolean indicating whether the timeline is auto-started or not.

#### resetTweens
Resets all of the timeline's tweens back to their initial states.
The boolean parameter indicates whether tweens that are looping should reset as well, or not.

#### setCallback
Seta callback for the timeline.

#### makeActive
Delegates [makeActive](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/tweens/tween-manager-plugin.md#makeActive) to the tween manager.

#### play
Start playing the timeline.

#### nextState
???

#### stop
Stop the tween immediately,
whatever stage of progress it is at and flags it for removal by the tween manager.

#### pause
Pause the timeline, retaining its internal state.

#### resume
Resume the timeline from where it was when it was paused.

#### hasTarget
Check if any of the tweens has the target as the object they are operating on.
Retuns false if no tweens operate on the target object.

#### destroy
Stops all the tweens in the timeline immediately,
whatever stage of progress they are at and flags them for removal by the TweenManager.

### Extends

- EventEmitter
