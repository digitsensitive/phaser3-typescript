/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 Digitsensitive
 * @description  The Powerful: Game
 * @license      Digitsensitive
 */

/// <reference path="../../phaser.d.ts"/>

import "phaser";
import { BootScene } from "./scenes/bootScene";
import { HeadUpDisplayScene } from "./scenes/headUpDisplayScene";
import { GameScene } from "./scenes/gameScene";

const config: GameConfig = {
  title: "The Powerful",
  url: "https://github.com/digitsensitive/phaser3-typescript",
  version: "1.0",
  width: 256,
  height: 220,
  zoom: 4,
  type: Phaser.AUTO,
  parent: "game",
  scene: [BootScene, HeadUpDisplayScene, GameScene],
  input: {
    keyboard: true,
    mouse: false,
    touch: false,
    gamepad: false
  },
  physics: {
    default: "arcade",
    arcade: {
      debug: false
    }
  },
  backgroundColor: "#000000",
  pixelArt: true,
  antialias: false
};

export class Game extends Phaser.Game {
  constructor(config: GameConfig) {
    super(config);
  }
}

window.onload = () => {
  var game = new Game(config);
};
