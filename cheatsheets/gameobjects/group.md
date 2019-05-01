## Phaser.GameObjects.Group

In case of doubt, the [official source code](https://github.com/photonstorm/phaser) should be accessed.

### Introduction

With the group class you can create, manipulate and recycle similar game objects.
A game object can belong to multiple groups, to one group or to none (non-exclusive).

> Groups are not displayed, and can't be positioned, rotated, scaled, or hidden!

#### Example

```
const GroupConfig = {
  classType: Sprite,
  active: true,
  maxSize: -1,
  defaultKey: null,
  defaultFrame: null,
  runChildUpdate: false,
  createCallback: null,
  removeCallback: null,
  createMultipleCallback: null
}

const GroupCreateConfig = {
  classType: Sprite,
  key: "textureName",
  frame: null,
  visible: true,
  active: true,
  repeat: 0,
  randomKey: false,
  yoyo: false,
  frameQuantity: 1,
  max: 0,
  setXY: {
    x: 0,
    y: 0,
    stepX: 0,
    stepY: 0       
  },
  setRotation: {
    value: 0,
    step: 0
  },
  setScale: {
    x: 0,
    y: 0,
    stepX: 0,
    stepY: 0      
  },
  setAlpha: {
    value: 0,
    step: 0
  },
  hitArea: null,
  hitAreaCallback: null,
  gridAlign: false
}

let myGroup = this.add.group(GroupConfig);
```

When you create a new group you can pass:

- a single child
- an array of children
- a config object (GroupConfig or GroupCreateConfig) or
- an array of config objects

### Public Functions

#### create            
Create new game object and add it to group.

#### createMultiple    
Create several game objects and add them to group.

#### createFromConfig  
A helper for createMultiple (use of GroupCreateConfig).

#### add               
Add game object to group.

#### addMultiple       
Add several game objects to group.

#### remove            
Remove a member of the group.
Optionally remove it from scene and/or destroy it.

#### clear             
Remove all members of the group.
Optionally remove them from scene and/or destroy them

#### contains          
Test if game object is a member of the group

#### getChildren     
Get group members.

#### getLength      
Number of group members.

#### getFirst        
Get first active member (from top to bottom).

#### getFirstNth       
Get nth active member (from top to bottom).

#### getLast           
Get last active member (from top to bottom).

#### getLastNth        
Get last nth active member (from top to bottom).

#### getHandler        
Get last active member.

#### get               
Get first inactive member.

#### getFirstAlive     
Get first active member.

#### getFirstDead      
Get first inactive member.

#### playAnimation     
Plays an animation for all group members.

#### isFull            
Check if group size is at maximum.

#### countActive       
Count the number of active (or inactive) group members.

#### getTotalUsed      
Count the number of in-use (active) group members.

#### getTotalFree      
Difference of max size and number of active group members.

#### setDepth          
Set depth of each group member.

#### kill              
Deactivate member of the group.

#### killAndHide       
Deactivate and hide member of the group.

#### toggleVisible     
Toggle the visible state of each group member.

#### destroy           
Empty the group and remove it from the scene.
