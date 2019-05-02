## Phaser.Components.PathFollower

In case of doubt, the [official source code](https://github.com/photonstorm/phaser) should be accessed.

### Public Functions

#### setPath
Set path for the PathFollower to follow.

> As an alternative to Phaser.Curves.Path you can pass a PathConfig

```
const PathConfig = {
  duration: 2000,
  from: 0,
  to: 1,
  positionOnPath: false,
  rotateToPath: false,
  rotationOffset: 0,
  startAt: 0
}
```

#### setRotateToPath
Set if PathFollower should rotate to point in the direction of the path.

#### isFollowing
Check if the PathFollower is actively following a path or not.

#### startFollow
Start the PathFollower to follow the given path.

#### pauseFollow
Pause the PathFollower.

> It will still continue to render, but it will remain motionless at the
point on the path at which you paused it.

#### resumeFollow
Resume a previously paused PathFollower.

#### stopFollow
Stop the PathFollower from following the path.
