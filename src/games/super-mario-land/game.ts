/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2019 Digitsensitive
 * @description  Super Mario Land
 * @license      Digitsensitive
 */

/// <reference path="../../phaser.d.ts"/>

import "phaser";
import { BootScene } from "./scenes/boot-scene";
import { GameScene } from "./scenes/game-scene";
import { MenuScene } from "./scenes/menu-scene";

const config: GameConfig = {
  title: "Super Mario Land",
  url: "https://github.com/digitsensitive/phaser3-typescript",
  version: "1.0",
  width: 160,
  height: 144,
  zoom: 5,
  type: Phaser.AUTO,
  parent: "game",
  scene: [BootScene, MenuScene, GameScene],
  input: {
    keyboard: true
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 475 },
      debug: true
    }
  },
  backgroundColor: "#ffffff",
  render: { pixelArt: true, antialias: false, autoResize: false }
};

export class Game extends Phaser.Game {
  constructor(config: GameConfig) {
    super(config);
  }
}

window.addEventListener("load", () => {
  var game = new Game(config);
});
