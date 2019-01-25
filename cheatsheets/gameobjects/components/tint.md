## Phaser.Components.Tint

In case of doubt, the [official source code](https://github.com/photonstorm/phaser) should be accessed.

### Public Functions

#### clearTint
Clears all tint values (color back to 0xffffff and tint type 'additive').

#### setTint
Set an additive tint on the game object.

> Additive Tinting = Pixel color values from the Game Objects texture multiplying
by the color value of the tint

#### setTintFill
Sets a fill-based tint on the game object.

> Fill Tinting = Replaces the pixel colors from the texture with those in the tint.
> Useful for effects such as making a player flash 'white' if hit by something.
