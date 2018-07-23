/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 Digitsensitive
 * @description  Alpha Adjust
 * @license      Digitsensitive
 */

/// <reference path="../../phaser.d.ts"/>

import "phaser";
import { GameScene } from "./scenes/game-scene";

const config: GameConfig = {
  title: "Alpha Adjust",
  url: "https://github.com/digitsensitive/phaser3-typescript",
  version: "1.0",
  width: 800,
  height: 600,
  type: Phaser.AUTO,
  parent: "game",
  scene: [GameScene],
  input: {
    mouse: true
  },
  backgroundColor: "#1d2b53",
  pixelArt: true
};

export class Game extends Phaser.Game {
  constructor(config: GameConfig) {
    super(config);
  }
}

window.onload = () => {
  var game = new Game(config);
};
