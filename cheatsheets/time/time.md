## Phaser.Time.Clock

In case of doubt, the [official source code](https://github.com/photonstorm/phaser) should be accessed.

### Introduction

The Clock is one of the [seven default plugins](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/scene/systems.md#default-plugins).
It is installed into every scene unless you specify otherwise and you can access it with `this.time`.

With the Clock you can create and update [timer events](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/time/timer-event.md) for the scene.

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

#### addEvent
Create a timer event and add it to the clock at the start of the frame.

#### delayedCall
Create a timer event and add it to the clock at the start of the frame.
It is a shortcut for addEvent(). It is compatible with the syntax of the [GreenSock Animation Platform (GSAP)](https://greensock.com).

#### clearPendingEvents
Clear and recreate the array of pending timer events.

#### removeAllEvents
Schedule all active timer events for removal at the start of the frame.
