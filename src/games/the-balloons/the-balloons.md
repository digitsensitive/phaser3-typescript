# The Balloons ![Difficulty](https://img.shields.io/badge/Difficulty-Intermediate-blue.svg)

## Preparation for development

### Key parameters

- Screen size: 256 × 480 pixels

### Objects graphics

o   Balloon of the player (red?)
o   Balloon of the enemies (skin-colored?)
o   Player (balloons are attached on the helmet)
    o   Walking Animation
    o   Flying Animation
    o   Dying Animation
o   Enemies
    o   Setting-up Balloon for Take-off Animation
    o   Flying Animation
    o   Parachute Animation
    o   Dying Animation
o   Large piranha
    o   Attack animation
o   Bubble
o   Lightning
o   Star Animation
o   Water effect if fall in water

### Background graphics

o   Main Menu Logo
o   Cloud
o   Small platform with grass and dirt
o   Bigger platform with grass and more dirt
o   Water

### Music

o   Music as soon as the game starts, continues until the player starts to fly
o   Game over music
o   Annoying background music
o   Music that comes, when one of the enemies of flying down on parachute
o   Music if level is successfully completed

### Sound effects

o   Respawn sound
o   Flying sound
o   Bump on ground or upper wall sound
o   Sound if hit balloon from enemy
o   Sound if enemy hits player balloon
o   Sound if enemy is hit final and dies
o   Sound if player hits bubble
o   Sound if play got hit from lightning star
o   Sound if lightning star hits the ground
o   Sound if player drowns in the water
o   Sound if the cloud releases a new star

### Coding challenges

o   Entities <-> Balloon: Find out best approach (http://www.html5gamedevs.com/topic/35762-parent-child-gameobjects-best-practice)
o   Integrate check if horizontal off screen (see asteroids -> objects -> asteroid)
o   If a balloon is popped, the player's flotation is decreased, making it harder to rise.

## Introduction
## Challenges
## How to run it

Adjust the entry path in the `webpack.config.js` file as follows:
```
entry: './src/games/the-balloons/game.ts'
```

## References

* [Balloon Fight on Wikipedia](https://en.wikipedia.org/wiki/Balloon_Fight)
