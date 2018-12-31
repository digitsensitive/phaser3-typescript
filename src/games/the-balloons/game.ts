/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 Digitsensitive
 * @description  The Balloons
 * @license      Digitsensitive
 */

/// <reference path="../../phaser.d.ts"/>

import "phaser";

import { BootScene } from "./scenes/boot-scene";
import { GameScene } from "./scenes/game-scene";

const config: GameConfig = {
  title: "The Balloons",
  url: "https://github.com/digitsensitive/phaser3-typescript",
  version: "1.0",
  width: 256,
  height: 240,
  zoom: 3,
  type: Phaser.AUTO,
  parent: "game",
  scene: [BootScene, GameScene],
  input: {
    keyboard: true
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 50 },
      debug: false
    }
  },
  backgroundColor: "#000000",
  render: { pixelArt: true, antialias: false, autoResize: false }
};

export class Game extends Phaser.Game {
  constructor(config: GameConfig) {
    super(config);
  }
}

window.onload = () => {
  var game = new Game(config);
};
