/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2020 Digitsensitive
 * @description  Fractal Trees: Game
 * @license      Digitsensitive
 */

import "phaser";
import { GameScene } from "./scenes/main-scene";

const config: GameConfig = {
  title: "Fractal Trees",
  url: "https://github.com/digitsensitive/phaser3-typescript",
  version: "1.0",
  width: 800,
  height: 800,
  type: Phaser.AUTO,
  parent: "game",
  scene: [GameScene],
  backgroundColor: "#000000",
  pixelArt: false,
  antialias: true
};

export class Game extends Phaser.Game {
  constructor(config: GameConfig) {
    super(config);
  }
}

window.onload = () => {
  var game = new Game(config);
};
