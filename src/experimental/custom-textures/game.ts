/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2020 digitsensitive
 * @description  Experimental: Custom Textures
 * @license      {@link https://github.com/digitsensitive/phaser3-typescript/blob/master/LICENSE.md | MIT License}
 */

import "phaser";
import { BootScene } from "./scenes/boot-scene";
import { GameScene } from "./scenes/game-scene";

const config: Phaser.Types.Core.GameConfig = {
  title: "Custom Textures",
  url: "https://github.com/digitsensitive/phaser3-typescript",
  version: "1.0",
  width: 200,
  height: 150,
  zoom: 4,
  type: Phaser.AUTO,
  parent: "game",
  scene: [BootScene, GameScene],
  backgroundColor: 0x265d80,
  render: { pixelArt: true, antialias: false }
};

export class Game extends Phaser.Game {
  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config);
  }
}

window.addEventListener("load", () => {
  const game = new Game(config);
});
