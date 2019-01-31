## Phaser.Time.TimerEvent

In case of doubt, the [official source code](https://github.com/photonstorm/phaser) should be accessed.

### Introduction

A timer event represents a delayed function call. Because it's managed by a clock,
a timer event is based on game time and will pause if its clock pauses.

### Example

```
const TimerEventConfig = {
  delay: 0,
  repeat: 0,
  loop: false,
  callback: this.theFunctionToCall,
  callbackScope: this,
  args: [],
  timeScale: 1,
  startAt: 1,
  paused: false
}

let myEvent = this.time.addEvent(TimerEventConfig);
```

### Public Functions

#### reset
Completely reinitializes the timer event.

#### getProgress
Get the progress of the current iteration, not factoring in repeats.
A number between 0 and 1 representing the current progress.

#### getOverallProgress
Get the progress of the timer overall, factoring in repeats.
The overall progress of the timer event, between 0 and 1.

#### getRepeatCount
Returns the number of times this timer event will repeat before finishing.

> Not to be confused with the number of times the timer event will fire before finishing.

#### getElapsed
Returns the local elapsed time for the current iteration of the timer event.

#### getElapsedSeconds
Returns the local elapsed time for the current iteration of the timer event in seconds.

#### remove
Forces the timer event to immediately expire. Will be removed in the next frame.

#### destroy
Destroys all object references in the timer event.

> If called manually, the timer event will still be updated by the Clock, but it won't do anything when it fires.
