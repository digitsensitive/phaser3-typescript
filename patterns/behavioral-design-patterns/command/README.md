## Behavioral Design Patterns

### Command

The command pattern is a behavioral design pattern in which an object is used to
encapsulate all information needed to perform an action or trigger an event at a later time.
This information includes the method name, the object that owns the method
and values for the method parameters (Source: Wikipedia).

### Notes regarding use for input management

- In your scene create a `inputHelperInstance`
- Init the input helper and the commands in your scene as follows:

```ts
    // Init our input helper
    this.inputHelperInstance = new InputHelper(this);

    // Init scene commands
    this.inputHelperInstance.setPauseSceneCommand(new PauseCommand(this));
    this.inputHelperInstance.setPointerMovedCommand(
      new PointerMovedCommand(this, this.layer, this.tileSelector)
    );
    this.inputHelperInstance.setShootingCommand(new ShootingCommand(this));
```

- In your update() loop add a function to check for activated commands

```ts
 public evaluateCommands(): void {
    let command = this.inputHelperInstance.handleInput();

    if (command) {
      command.execute();

      if (command instanceof RemoveTreeCommand) {
        console.log("now");
      }
    }
  }
```

- The Input Helper acts as a sender (sends request to the command) and stores commands 

### Todo

- Rethink structure
- Add a queue with array of commands

## References

* [Wikipedia](https://en.wikipedia.org/wiki/Command_pattern)
* [Refactoring Guru](https://refactoring.guru/design-patterns/command)
* [Game Programming Patterns](https://gameprogrammingpatterns.com/command.html)