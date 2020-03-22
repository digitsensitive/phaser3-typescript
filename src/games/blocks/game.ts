/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2019 Digitsensitive
 * @description  Blocks
 * @license      Digitsensitive
 */

import "phaser";
import { BootScene } from "./scenes/boot-scene";
import { GameScene } from "./scenes/game-scene";

const config: GameConfig = {
  title: "Blocks",
  url: "https://github.com/digitsensitive/phaser3-typescript",
  version: "1.0",
  width: 160,
  height: 144,
  zoom: 3,
  type: Phaser.AUTO,
  parent: "game",
  scene: [BootScene, GameScene],
  backgroundColor: "#24232e",
  render: { pixelArt: true, antialias: false }
};

export class Game extends Phaser.Game {
  constructor(config: GameConfig) {
    super(config);
  }
}

window.addEventListener("load", () => {
  var game = new Game(config);
});
