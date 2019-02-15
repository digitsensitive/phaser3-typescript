/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2019 Digitsensitive
 * @description  Tank
 * @license      Digitsensitive
 */

import "phaser";
import { BootScene } from "./scenes/boot-scene";
import { GameScene } from "./scenes/game-scene";
import { MenuScene } from "./scenes/menu-scene";

const config: GameConfig = {
  title: "Tank",
  url: "https://github.com/digitsensitive/phaser3-typescript",
  version: "1.0",
  width: 1600,
  height: 1200,
  zoom: 0.6,
  type: Phaser.AUTO,
  parent: "game",
  scene: [BootScene, MenuScene, GameScene],
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
  backgroundColor: "#000000",
  render: { pixelArt: false, antialias: true }
};

export class Game extends Phaser.Game {
  constructor(config: GameConfig) {
    super(config);
  }

  preload(): void {
    this.boot;
  }
}

window.addEventListener("load", () => {
  var game = new Game(config);
});
