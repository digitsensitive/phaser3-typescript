/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2019 - 2020 Digitsensitive
 * @description  Canyon Bomber
 * @license      {@link https://github.com/digitsensitive/phaser3-typescript/blob/master/LICENSE.md | MIT License}
 */

import "phaser";

import { BootScene } from "./scenes/boot-scene";
import { GameScene } from "./scenes/game-scene";
import { HUDScene } from "./scenes/hud-scene";

const config: Phaser.Types.Core.GameConfig = {
  title: "Canyon Bomber",
  url: "https://github.com/digitsensitive/phaser3-typescript",
  version: "1.0",
  width: 320,
  height: 384,
  zoom: 2,
  type: Phaser.AUTO,
  parent: "game",
  scene: [BootScene, GameScene, HUDScene],
  input: {
    keyboard: true
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 100 },
      debug: false
    }
  },
  backgroundColor: "#bdbdbd",
  render: { pixelArt: true, antialias: false }
};

export class Game extends Phaser.Game {
  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config);
  }

  preload(): void {
    this.boot;
  }
}

window.addEventListener("load", () => {
  var game = new Game(config);
});
