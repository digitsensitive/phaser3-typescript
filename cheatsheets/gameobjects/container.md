## Phaser.GameObjects.Container

In case of doubt, the [official source code](https://github.com/photonstorm/phaser) should be accessed.

### Example

```
let myContainer = this.add.container(200, 300, [ sprite1, sprite2 ]);
```

or

```
let myContainer = this.add.container(200, 300);
myContainer.add(sprite1);
myContainer.add(sprite2);
```

or

```
let myContainer = this.add.container(200, 300);
myContainer.add([ sprite1, sprite2 ]);
```

### Public Functions

#### setExclusive
If you want to add a child (= a game object) to more than one container, you
have to set the variable `exclusive` of one of the two containers to `false`.

> If you set both containers to true, Phaser will only include the child in the
latest container defined.

> If you set both containers to false, Phaser will also render the child at the
position you defined it (see [official example](http://labs.phaser.io/edit.html?src=src\game%20objects\container\non%20exclusive%20containers.js))
In other words the child will stay in the internal display list of the scene
and the two containers will reference to that game object

#### getBounds
This function returns a `Phaser.Geom.Rectangle` object (amongst other things
containing the x and y position and the width and height) of the container.
It will go through all the children and calculate a min-max rectangle.

> Using a Graphic object you can stroke for example the rectangle shape

> You can use the rectangle to make it interactive for input:
> myContainer.setInteractive(myContainer.getBounds(), Phaser.Geom.Rectangle.Contains);

#### pointToContainer
Takes a Point-like object (Vector2, Geom.Point or object), transforms it
into the space of the container and returns it.

#### getBoundsTransformMatrix
Returns the world transform matrix.

#### add
Adds a game object or array of game objects to container.
Every game object in a container must be unique.

#### addAt
Add a game object or array of game objects to the container at a
specific position.

#### getAt
Get a game object at the given position.

#### getIndex
Get the index of the game object.

#### sort
Sort contents of container in order based on the given property.
For example sort by `alpha` value, `x` or `y` position.

#### getByName
Search for the first instance of a child matching the given `name`.

#### getRandom
Get a random game object of the container.

#### getFirst
Get the first game object in the container or specify a property and value
of a game object you want to return.

#### getAll
Get all the game objects in the container or specify a property and value
of the game objects you want to return.

#### count
Get number of all game objects in the container or specify a property and value
to get only the number of game objects matching these criteria.

#### swap
Swap to game objects in the container.

#### moveTo
Move a game object to a new position within the container.

#### remove
Remove a game object or array of game objects from the container.
```
myContainer.remove(sprite1);
```
or
```
sprite1.destroy();
```

#### removeAt
Remove a game object or array of game objects from the container at a
specific position.

#### removeBetween
Remove the game objects between two positions in the container.

#### removeAll
Remove all game objects from the container.

#### bringToTop
Bring the given game object to the top of the container.

#### sendToBack
Send the given game object to the bottom of the container.

#### moveUp
Move the given game object up one place in the container.

#### moveDown
Move the given game object down one place in the container.

#### reverse
Reverse the order of all game objects.

#### shuffle
Shuffle all game objects using the Fisher-Yates implementation.

#### replace
Replace the game object with a new one.

#### exists
Check if a given game object is a child of the container.
Will return `true` if the case.

#### setAll
Set a property to a given value on all game objects.

#### each
Loop through all game objects in the container.
Using this function, you will get a copy of the container.

> If you know, that you do not change the size of the container, use iterate()
instead.

```
container.each(function(child) {
  child.destroy();
});
```

#### iterate
Loop through all game objects in the container.

> Do not use this function if you change the size of the container

### Extends

- [GameObject](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/gameobjects/gameobject.md)

### Mixins

- [Components.Alpha](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/gameobjects/components/alpha.md)
- [Components.BlendMode](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/gameobjects/components/blend-mode.md)
- [Components.ComputedSize](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/gameobjects/components/computed-size.md)
- [Components.Depth](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/gameobjects/components/depth.md)
- [Components.Mask](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/gameobjects/components/mask.md)
- [Components.ScrollFactor](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/gameobjects/components/scroll-factor.md)
- [Components.Transform](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/gameobjects/components/transform.md)
- [Components.Visible](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/gameobjects/components/visible.md)
- Render

### References

- [Phaser Github](https://github.com/photonstorm/phaser)
- [Phaser 3 Examples Github](https://github.com/photonstorm/phaser3-examples)
- [Phaser 3 Examples Labs](http://labs.phaser.io)
- [Phaser 3 Dev Log #120](https://phaser.io/phaser3/devlog/120)
