/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2019 - 2020 Digitsensitive
 * @description  Princess
 * @license      {@link https://github.com/digitsensitive/phaser3-typescript/blob/master/LICENSE.md | MIT License}
 */

import "phaser";
import { BootScene } from "./scenes/boot-scene";
import { GameScene } from "./scenes/game-scene";
import { MenuScene } from "./scenes/menu-scene";
import { PauseScene } from "./scenes/pause-scene";

const config: Phaser.Types.Core.GameConfig = {
  title: "Princess",
  url: "https://github.com/digitsensitive/phaser3-typescript",
  version: "1.0",
  width: 144,
  height: 144,
  zoom: 4,
  type: Phaser.AUTO,
  parent: "game",
  scene: [BootScene, MenuScene, GameScene, PauseScene],
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
  backgroundColor: "#639331",
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
