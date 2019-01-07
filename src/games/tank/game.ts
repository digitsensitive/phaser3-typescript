/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2019 Digitsensitive
 * @description  Tank
 * @license      Digitsensitive
 */

/// <reference path="../../phaser.d.ts"/>

import "phaser";
import { BootScene } from "./scenes/boot-scene";
import { GameScene } from "./scenes/game-scene";
import { HUDScene } from "./scenes/hud-scene";
import { MenuScene } from "./scenes/menu-scene";

const config: GameConfig = {
  title: "Tank",
  url: "https://github.com/digitsensitive/phaser3-typescript",
  version: "1.0",
  width: 800,
  height: 600,
  zoom: 1.2,
  type: Phaser.AUTO,
  parent: "game",
  scene: [BootScene, MenuScene, GameScene, HUDScene],
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
  backgroundColor: "#80be1f",
  render: { pixelArt: false, antialias: true, autoResize: false }
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
