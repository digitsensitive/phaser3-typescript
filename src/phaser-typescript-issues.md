## Phaser TypeScript Defs Issues

Since I have not found a good solution yet for the physics body problem,
I had to copy the original typescript definition file (phaser version 3.18.1) and do the following change.

[Physics Body Issue](https://github.com/photonstorm/phaser3-docs/issues/24)

```
14435       /**
14436        * If this Game Object is enabled for physics then this property will contain a reference to a Physics Body.
14437        */
14438       body: any;
```
