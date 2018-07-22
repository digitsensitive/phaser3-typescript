/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 Digitsensitive
 * @description  Coin Runner
 * @license      Digitsensitive
 */

/// <reference path="../../phaser.d.ts"/>

import "phaser";
import { GameScene } from "./scenes/game-scene";

const config: GameConfig = {
  title: "Coin Runner",
  url: "https://github.com/digitsensitive/phaser3-typescript",
  version: "1.1.1",
  width: 768,
  height: 576,
  type: Phaser.AUTO,
  parent: "game",
  scene: [GameScene],
  input: {
    keyboard: true
  },
  backgroundColor: "#3A99D9",
  pixelArt: false
};

export class Game extends Phaser.Game {
  constructor(config: GameConfig) {
    super(config);
  }
}

window.onload = () => {
  var game = new Game(config);
};
