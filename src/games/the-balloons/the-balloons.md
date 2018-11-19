# The Balloons ![Difficulty](https://img.shields.io/badge/Difficulty-Intermediate-blue.svg)

## Preparation for development

### Key parameters

- Screen size: 256 × 480 pixels

### Objects graphics

- Balloon of the player (red?)
- Balloon of the enemies (skin-colored?)
- Player (balloons are attached on the helmet)
  - Walking Animation
  - Flying Animation
 - Dying Animation
- Enemies
 - Setting-up Balloon for Take-off Animation
 - Flying Animation
 - Parachute Animation
 - Dying Animation
- Large piranha
 - Attack animation
- Bubble
- Lightning
- Star Animation
- Water effect if fall in water

### Background graphics

- Main Menu Logo
- Cloud
- Small platform with grass and dirt
- Bigger platform with grass and more dirt
- Water

### Music

- Music as soon as the game starts, continues until the player starts to fly
- Game over music
- Annoying background music
- Music that comes, when one of the enemies of flying down on parachute
- Music if level is successfully completed

### Sound effects

- Respawn sound
- Flying sound
- Bump on ground or upper wall sound
- Sound if hit balloon from enemy
- Sound if enemy hits player balloon
- Sound if enemy is hit final and dies
- Sound if player hits bubble
- Sound if play got hit from lightning star
- Sound if lightning star hits the ground
- Sound if player drowns in the water
- Sound if the cloud releases a new star

### Coding challenges

- Entities <-> Balloon: Find out best approach (http://www.html5gamedevs.com/topic/35762-parent-child-gameobjects-best-practice)
- Integrate check if horizontal off screen (see asteroids -> objects -> asteroid)
- If a balloon is popped, the player's flotation is decreased, making it harder to rise.

## Introduction
## Challenges
## How to run it

Adjust the entry path in the `webpack.config.js` file as follows:
```
entry: './src/games/the-balloons/game.ts'
```

## References

* [Balloon Fight on Wikipedia](https://en.wikipedia.org/wiki/Balloon_Fight)
