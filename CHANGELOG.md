# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [1.X.X] - 2020-XX-XX

### Added

### Changed

### Fixed

---

## Version 1.4.3 - 2020-12-15

### Updates

- Boilerplate: Update dependencies
- Add `prettier` version `2.2.1` to `devDependencies`
- Add `.prettierignore` and `.prettierrc` to root
- Format whole project with `prettier`
- Update `README.md`
- Update `.gitignore`
- Update `yarn.lock`
- Update `LICENSE`
- Remove `yarn.lock` from `.gitignore`

---

## Version 1.4.2 - 2020-12-14

### Updates

- Boilerplate: Refactor and update dependencies
- Update `CHANGELOG.md`
- Delete main `package-lock.json` --> dependency management only done with Yarn

---

## Version 1.4.1 - 2020-08-04

### Features

- Refactor boilerplate as an independent project
- Add new `experimental` project `raycasting`
- Add new `experimental` project `untextured-raycaster`
- Add new `experimental` project `game-of-life`
- Add new `experimental` project `point-in-polygon`
- Add new `experimental` project `fractal-tree`
- Add new `experimental` project `lissajous-curve`
- Add new game `candy-crush`
- Add new `experimental` project `procedural-generation`
- Add new `experimental` project `cellular-automaton`
- Add new project `factory-method`

### Updates

- Refactor boilerplate

---

## Version 1.4.0 - 2019-11-10

### Features

- Add new folder `patterns` with first design pattern: `command`

### Updates

- Update webpack version from `4.35.0` to `4.35.2`
- Update phaser version from `3.18.1` to `3.20.1`

---

## Version 1.3.0 - 2019-06-30

### Updates

- Update ts-loader version from `6.0.0` to `6.0.4`
- Update typescript version from `3.4.5` to `3.5.2`
- Update webpack version from `4.31.0` to `4.35.0`
- Update webpack-cli version from `3.3.2` to `3.3.5`
- Update webpack-dev-server version fromb `3.3.1` to `3.7.2`
- Update phaser version from `3.16.2` to `3.18.1`
- Workaround for Physics Body TS Def Problem, see `phaser-typescript-issues.md`

---

## Version 1.2.5 - 2019-05-11

### Updates

- Rename output folder from `build` to `dist`
- Refactor `tsconfig.json` with explanations in the README.md
- Update webpack version from `4.28.4` to `4.29.0`
- Add touch-manager cheatsheet
- Add mouse-manager cheatsheet
- Add input-manager cheatsheet
- Add input-plugin cheatsheet
- Add pointer cheatsheet
- Link to first tutorial in `README.md` file
- Update phaser version from `3.15.1` to `3.16.2`
- Comment `classType` in group after phaser update from `3.15.1` to `3.16.2`
- Update webpack-cli version from `3.2.1` to `3.2.3`
- Update webpack version from `4.28.4` to `4.29.4`
- Update typescript version from `3.2.4` to `3.3.3`
- Update `camera.md`
- Update `group.md`
- Add `pathfollower.md` and `path-follower.md`
- Update Flappy Bird
- Update typescript version from `3.3.3` to `3.4.5`
- Update ts-loader version from `5.3.3` to `6.0.0`
- Update webpack version from `4.29.4` to `4.31.0`
- Update webpack-cli version from `3.2.3` to `3.3.2`
- Update webpack-dev-server version from `3.1.14` to `3.3.1`

### Bugfixes

- Delete `<reference path>`
- Update `config.md`: Delete `autoResize` after phaser update from `3.15.1` to `3.16.2`
- Refactor `this.currentScene`

---

## Version 1.2.4 - 2019-01-29

### Features

- New Game Super-Mario-Land

### Updates

- Update webpack-cli version from `3.1.2` to `3.2.1`
- Update webpack version from `4.28.3` to `4.28.4`
- Update typescript version from `3.2.2` to `3.2.4`
- Update ts-loader version from `5.3.2` to `5.3.3`
- Add static-tilemap-layer cheatsheet
- Update tilemap cheatsheet
- Update body cheatsheet
- Add camera-manager cheatsheet
- Add camera cheatsheet
- Add base-camera cheatsheet
- Add data-manager-plugin cheatsheet
- Add data-manager cheatsheet
- Add timeline cheatsheet
- Add scale-manager cheatsheet

---

## Version 1.2.3 - 2019-01-19

### Features

- New Game Tank

### Updates

- Update phaser.d.ts to 3.15 TS Defs
- Update phaser version from `3.10.1` to `3.15.1`
- Update webpack-dev-server version from `3.1.10` to `3.1.14`
- Update webpack version from `4.25.1` to `.28.3`
- Update typescript version from `3.1.6` to `3.2.2`
- Update ts-loader version from `5.3.0` to `5.3.2`
- Add container to cheatsheets
- Update transform cheatsheet
- Update alpha cheatsheet
- Update blend-mode cheatsheet
- Update depth cheatsheet
- Update flip cheatsheet
- Update get-bounds cheatsheet
- Update mask cheatsheet
- Update origin cheatsheet
- Update pipeline cheatsheet
- Update scale-mode cheatsheet
- Update scroll-factor cheatsheet
- Update size cheatsheet
- Update texture cheatsheet
- Update tint cheatsheet
- Update visible cheatsheet
- Add computed-size cheatsheet
- Update game cheatsheet
- Update config cheatsheet
- Update scene cheatsheets
- Add texture-crop cheatsheet
- Update image cheatsheet
- Update sprite cheatsheet
- Add time cheatsheet
- Add time-event cheatsheet
- Add arcade-physics cheatsheet
- Add body cheatsheet
- Add tilemap cheatsheet
- Add game-object-creator-plugin cheatsheet
- Add tween-manager-plugin cheatsheet
- Add ease-map cheatsheet
- Add tween cheatsheet
- Add loader-plugin cheatsheet
- Add pack-file cheatsheet
- Add scene folder with `plugin.md`, `settings.md` and `systems.md` to cheatsheets
- Add data folder with `data-manager-plugin.md` to cheatsheets
- Rename window.onload to window.addEventListener
- Merge PR #19 (_iliyaZelenko_)
- Merge PR #21 (_ItsMTC_)

### Bugfixes

- Update syntax after the upgrade to phaser `3.15.1`

---

## Version 1.2.2 - 2018-11-17

### Features

- New small beginner Game Alpha Adjust
- New Game Space Invader

### Updates

- Update typescript version from `2.9.2` to `3.1.6`
- Update ts-loader version from `4.4.2` to `5.3.0`
- Update webpack version from `4.15.0 `to `4.25.1`
- Update webpack-cli version from `3.0.8` to `3.2.1`
- Update webpack-dev-server version from `3.1.4` to `3.1.10`
- Small changes in the coin-runner game: new version `1.1.1`
- Redesign the main README.md file

### Bugfixes

- Small changes in space-invaders

---

## Version 1.2.1 (Juno) - 2018-07-07

### Features

- Update to newest phaser.d.ts (7th July 2018)
- Add loading bar to flappy bird

### Updates

- Update phaser version from `3.9.0` to `3.10.1`
- Update ts-loader version from `4.3.0` to `4.4.2`
- Update typescript version from `2.9.1` to `2.9.2`
- Update webpack version from `4.10.2` to `4.15.0`
- Update webpack-cli version from `2.1.3` to `3.0.8`
- Update asteroid.md, blockade.md,coinRunner.md and flappyBird.md

### Bugfixes

- Fixes in mainMenuScene of blockade and in gameScene of snake
- Fix startKey Problem in mainMenuScene of flappy bird

---

## Version 1.2.0 (Sliver) - 2018-06-02

### Updates

- New cheatsheet sprite
- New cheatsheet texture
- New cheatsheet tint
- New cheatsheet visible
- New cheatsheet mesh
- Update cheatsheet image
- Update CHANGELOG.md
- Update phaser version from `3.7.1` to `3.9.0`
- Update typescript version from `2.8.3` to `2.9.1`
- Update webpack version from `4.8.3` to `4.10.2`
- Update intro text README.md

### Bugfixes

- Correct path for assets loading
- Add mode to webpack in package.json (_emedws_)
- Small change in output of the webpack.config.js file

---

## Version 1.1.0 - 2018-05-13

### Features

- New game Flappy Bird
- New game Blockade
- New game Asteroid

### Updates

- Small changes in the tsconfig.json
- Update README.md with external resources links
- New cheatsheets: group, image, gameobject, alpha, blendMode, depth, flip, transform, getBounds, mask, origin, pipeline, scaleMode, scrollFactor, size
- Update cheatsheets: game-config, scene-config
- Update Coin Runner game
- Update Snake game
- Update phaser version from `3.5.0` to `3.7.1`
- Update typescript version from `2.8.1` to `2.8.3`
- Update webpack-cli version from `2.0.14` to `2.1.3`
- Update ts-loader version from `4.2.0` to `4.3.0`
- Update webpack version from to `4.6.0` to `4.8.3`
- Update webpack-dev-server version from `3.1.3` to `3.1.4`

### Bugfixes

- Fix config error in game.ts (constructor(config: GameConfig)) files after updating to official phaser.d.ts (_vladfaust_)
- Workaround for intersect in the phaser.d.ts file

---

## Version 1.0.9 - 2018-04-17

### Updates

- Update phaser version from `3.3.0` to `3.5.0`
- Update webpack version from `4.5.0` to `4.6.0`
- Update webpack-dev-server version from `3.1.2` to `3.1.3`

---

## Version 1.0.8 - 2018-04-07

### Updates

- Create new game: snake
- Create assets folder for snake
- Update README.md
- Small changes in the index.html file
- Update ts-loader version from `4.1.0` to `4.2.0`
- Update typescript version from `2.7.2` to `2.8.1`
- Update webpack version from `4.2.0` to `4.5.0`
- Update webpack-dev-server version from `3.1.1` to `3.1.2`
- Update webpack-cli version from `2.0.13` to `2.0.14`

---

## Version 1.0.7 - 2018-04-01

### Updates

- Update cheatsheets/game-config.md
- New cheatsheet: scene-config.md
- Update README.md
- New assets: cheatsheets/sceneConfig.png

### Bugfixes

- Boilerplate Game Config: do not load object
- Delete this (not necessary):
  - this.scene.add("GameScene", GameScene, false);
  - this.scene.start("GameScene");

---

## Version 1.0.6 - 2018-03-25

### Updates

- First game: coin runner
- Small changes in the README.md
- Create coin runner folder in assets/games
- Upload assets for the coin runner game
- Small changes in the README.md
- Small changes in the package.json
- Rename tutorials folder to cheatsheets

### Bugfixes

- phaser.d.ts: fix RectangleToRectangle problem -> missing object

---

## Version 1.0.5 - 2018-03-24

### Updates

- Update phaser version from `3.2.1` to `3.3.0`
- Update expose-loader version from `0.7.4` to `0.7.5`
- Update ts-loader version from `4.0.1` to `4.1.0`
- Update webpack version from `4.0.1` to `4.2.0`
- Update webpack-dev-server version from `3.1.0` to `3.1.1`
- Update webpack-cli version from `2.0.10` to `2.0.13`
- Create games folder in assets
- Create endlessRunner folder in assets/games
- Upload assets for the Endless Runner game
- Add image to game config tutorial
- Small changes in the README.md

---

## Version 1.0.4 - 2018-03-18

### Updates

- Update phaser version from `3.2.0` to `3.2.1`

---

## Version 1.0.3 - 2018-03-11

### Updates

- Update phaser version from `3.1.2` to `3.2.0`
- Restructure folders
