# Super Mario Land ![Difficulty](https://img.shields.io/badge/Difficulty-Intermediate-blue.svg)

![Super Mario Land](https://github.com/digitsensitive/phaser3-typescript/blob/master/src/games/super-mario-land/assets/github/super-mario-land.png)

## Description

A remake of the famous and great Super Mario Land released in 1989 on the Game Boy.
I have used the original screen resolution of 160 x 144 Pixels.

The creation of this remake took more time than expected.
Only the first level was implemented, with the following components to follow:

- Enemy Nokobon
- Enemy Fly
- Platform at the end of the level is not working properly yet
- Currently you can go several times into the tubes
- Small details

This is a remake of the original game for educational purposes.
The rights remain with Nintendo.

## How to run it

Adjust the entry path in the `webpack.config.js` file as follows:
```
entry: './src/games/super-mario-land/game.ts'
```

## Learn to use

* [Phaser.Game](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/boot/game.md)
* [Phaser.Config](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/boot/config.md)
* [Phaser.Scenes.ScenePlugin](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/scene/plugins/scene-plugin.md)
* [Phaser.Loader](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/loader/loader-plugin.md)
* [Phaser.GameObjects.GameObjectCreator](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/gameobjects/game-object-creator-plugin.md)
* [Phaser.Tilemaps.Tilemap](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/tilemaps/tilemap.md)
* [Phaser.GameObject.Group](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/gameobjects/group.md)
* [Phaser.GameObject.Image](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/gameobjects/image.md)
* [Phaser.GameObject.Sprite](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/gameobjects/sprite.md)
* [Phaser.Physics.Arcade.ArcadePhysics](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/physics/arcade/arcade-physics.md)
* [Phaser.Cameras.Scene2D](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets/cameras/camera-manager.md)

## References and Resources

* [Spriters Resource](https://www.spriters-resource.com/game_boy_gbc/sml)
* [Super Mario Land Font by Patrick Lauke, CC BY 3.0 license](https://smartfonts.com/super-mario-land.font)
* [Nintendo Technical Data](https://www.nintendo.co.uk/Support/Game-Boy-Pocket-Color/Product-information/Technical-data/Technical-data-619585.html)
* [Generic Platformer and Phaser Bootstrap Project](https://github.com/nkholski/phaser3-es6-webpack)
