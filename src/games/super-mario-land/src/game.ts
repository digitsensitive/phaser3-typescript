/**
 * A remake of the famous and great Super Mario Land released in 1989 on the Game Boy.
 * I have used the original screen resolution of 160 x 144 Pixels.
 *
 * The creation of this remake took more time than expected.
 * Only the first level was implemented, with the following components to follow:
 *
 * - Enemy Nokobon
 * - Enemy Fly
 * - Platform at the end of the level is not working properly yet
 * - Currently you can go several times into the tubes
 * - Small details
 *
 * This is a remake of the original game for educational purposes.
 * The rights remain with Nintendo.
 *
 * References and Resources
 *
 * [1] [Spriters Resource](https://www.spriters-resource.com/game_boy_gbc/sml)
 * [2] [Super Mario Land Font by Patrick Lauke, CC BY 3.0 license](https://smartfonts.com/super-mario-land.font)
 * [3] [Nintendo Technical Data](https://www.nintendo.co.uk/Support/Game-Boy-Pocket-Color/Product-information/Technical-data/Technical-data-619585.html)
 * [4] [Generic Platformer and Phaser Bootstrap Project](https://github.com/nkholski/phaser3-es6-webpack)
 */

import 'phaser';
import { GameConfig } from './config';

export class Game extends Phaser.Game {
  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config);
  }
}

window.addEventListener('load', () => {
  const game = new Game(GameConfig);
});
