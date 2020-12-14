/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2019 - 2020 Digitsensitive
 * @description  Arcadians
 * @license      {@link https://github.com/digitsensitive/phaser3-typescript/blob/master/LICENSE.md | MIT License}
 */

import "phaser";
import { BootScene } from "./scenes/boot-scene";
import { GameScene } from "./scenes/game-scene";
import { HUDScene } from "./scenes/hud-scene";
import { MainMenuScene } from "./scenes/main-menu-scene";

const config: Phaser.Types.Core.GameConfig = {
  title: "Arcadians",
  url: "https://github.com/digitsensitive/phaser3-typescript",
  version: "1.0",
  width: 320,
  height: 256,
  zoom: 3,
  type: Phaser.AUTO,
  parent: "game",
  input: {
    keyboard: true
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  },
  scene: [BootScene, GameScene, HUDScene, MainMenuScene],
  backgroundColor: "#000000",
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
