## Phaser.Data.DataManager

In case of doubt, the [official source code](https://github.com/photonstorm/phaser) should be accessed.

### Introduction

You can store pieces of data specific to a game object, system or plugin.
The parent must either extend EventEmitter, or have a property called `events` that is an instance of it.

### Public Functions

#### get
Retrieve the value for the given key, or undefined if it doesn't exist.

```
this.data.get("score");
```

or

```
this.data.values.score;
```

You can also get an array:

```
this.data.get([ 'gold', 'armor', 'health' ]);
```

#### getAll
Retrieve all data values in a new object.

#### set
Set a value for the given key. If the key doesn't already exist in the data manager then it is created.

```
this.data.set('name', 'Red Gem Stone');
```

or

```
data.set({ name: 'Red Gem Stone', level: 2, owner: 'Link', gold: 50 });
```

or

```
data.values.gold += 50;
```

> When the value is first set, a `setdata` event is emitted.
> If the key already exists, a `changedata` event is emitted instead, along an event named after the key.
For example, if you updated an existing key called `PlayerLives` then it would emit the event `changedata-PlayerLives`.
