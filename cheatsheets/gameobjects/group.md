## :ballot_box_with_check: Phaser.GameObject.Group

In case of doubt, the [official source code](https://github.com/photonstorm/phaser) should be accessed.

#### Example

```
let newGroup = this.add.group();
```

When you create a new group you can attach a config file.
As format you can choose from GroupConfig or GroupCreateConfig (see below).
> If key is set, createMultiple will be called with these settings

#### Parameters

```
create()            : create new game object and add it to group
createMultiple()    : create several game objects and add them to group
createFromConfig()  : a helper for createMultiple
preUpdate()         : updates group objects, if runChildUpdate is enabled
add()               : add game object to group
addMultiple()       : add several game objects to group
remove()            : remove a member of the group. Optionally remove it from scene and/or destroy it
clear()             : remove all members of the group. Optionally remove them from scene and/or destroy them
contains()          : test if game object is a member of the group
getChildren()       : get group members
getLength()         : number of group members
getFirst()          : get first active member (from top to bottom)
getFirstNth()       : get nth active member (from top to bottom)
getLast()           : get last active member (from top to bottom)
getLastNth()        : get last nth active member (from top to bottom)
getHandler()        : get last active member
get()               : get first inactive member
getFirstAlive()     : get first active member
getFirstDead()      : get first inactive member
playAnimation()     : plays an animation for all group members
isFull()            : check if group size is at maximum
countActive()       : count the number of active (or inactive) group members
getTotalUsed()      : count the number of in-use (active) group members
getTotalFree()      : difference of max size and number of active group members
setDepth()          : set depth of each group member
kill()              : deactivate member of the group
killAndHide()       : deactivate and hide member of the group
toggleVisible()     : toggle the visible state of each group member
destroy()           : empty the group and remove it from the scene
```

#### GroupConfig: Parameters with default values

```
classType              : Sprite
active                 : true
maxSize                : -1
defaultKey             : null
defaultFrame           : null
runChildUpdate         : false
createCallback         : null
removeCallback         : null
createMultipleCallback : null
```

#### GroupCreateConfig: Parameters with default values

```
classType              : ?
key                    : ?
frame                  : null
visible                : true
active                 : true
repeat                 : 0
randomKey              : false
randomFrame            : false
yoyo                   : false
frameQuantity          : 1
max                    : 0
setXY {
  x                    : 0
  y                    : 0
  stepX                : 0
  stepY                : 0
}
setRotation {
  value                : 0
  step                 : 0
}
setScale {
  x                    : 0
  y                    : 0
  stepX                : 0
  stepY                : 0
}
setAlpha {
  value                : 0
  step                 : 0
}
hitArea                : ?
hitAreaCallback        : ?
gridAlign              : false
```
