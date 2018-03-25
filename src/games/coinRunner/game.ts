/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 Digitsensitive
 * @description  Coin Runner
 * @license      Digitsensitive
 */

/// <reference path="../../phaser.d.ts"/>

import "phaser";
import { GameScene } from "./scenes/gameScene";

// main game configuration
const config: GameConfig = {
  title: "Coin Runner",
  url: "https://github.com/digitsensitive/phaser3-typescript",
  version: "1.0",
  width: 768,
  height: 576,
  type: Phaser.AUTO,
  parent: "game",
  scene: {
    GameScene
  },
  input: {
    keyboard: true,
    mouse: false,
    touch: false,
    gamepad: false
  },
  backgroundColor: "#3A99D9",
  pixelArt: false
};

// game class
export class Game extends Phaser.Game {
  constructor(GameConfig: config) {
    super(config);
    this.scene.add("GameScene", GameScene, false);
    this.scene.start("GameScene");
  }
}

// when the page is loaded, create our game instance
window.onload = () => {
  var game = new Game(config);
};
