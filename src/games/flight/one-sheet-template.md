# 43'
- Platform: Web only.
- Target age: Every age.
- Prize: Free (YouTube Tutorial).

## Summary

A single-player vertical scrolling shooter.

## Scenes and UI

- Main Scene
    - Title of the game (centered)
    - Arrow with START text (centered)
- Game Scene
    - Score with shadow (top left)
- Pause Scene
    - PAUSE text (centered)
    - Everything else will get a lower alpha value (use of a fullscreen black box)

## Classes

### Cloud
The cloud class extends Phaser Container. It contains multiple cloud images.

Every cloud has the following private members:

- number of clouds

### Enemy
**To be defined.**

### Player
**To be defined.**

## Services
### Cloud Building
The cloud building service creates and returns a random number of clouds, formed
as a unique group. 

For the generation it uses a very simple algorithm:

- Randomly pick a number between a predefined range to define the number of clouds
- Randomly pick a x position between 0 and the game width
- Randomly set the cloud positions around that x position
- Randomly set a speed (optional)

### Enemy Spawner
The enemy spawner service is a simple service, that returns individual waves
of enemies. The enemies will spawn in an outer box around the actual screen. If
they fly even further out of that outer box, they die instantly.

For the generation it uses the following algorithm:

- Randomly pick a direction vector from a list
- The possible vectors are (x, y):
    - Spawn from the left side (1, 0)
    - Spawn from the right side (-1, 0)
    - Spawn from the top left side (0.5, 0.5)
    - Spawn from the top left side (0.25, 0.25)
    - Spawn from the top right side (-0.5, 0.5)
    - Spawn from the top right side (-0.25, 0.25)
- Randomly pick a number between a predefined range to define the number of enemies
- Randomly set a maximum flying height between half game height and game height
- Randomly set a speed (optional)

### Animation Helper
Parses the animations.json to create the game animations.

## References

- 1943: The Battle of Midway