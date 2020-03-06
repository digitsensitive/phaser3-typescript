/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2020 digitsensitive
 * @description  Untextured Raycaster
 * @license      Digitsensitive
 */

import "phaser";
import { GameScene } from "./scenes/game-scene";

const config: Phaser.Types.Core.GameConfig = {
  title: "Untextured Raycaster",
  url: "https://github.com/digitsensitive/phaser3-typescript",
  version: "1.0",
  width: 640,
  height: 480,
  type: Phaser.AUTO,
  parent: "game",
  scene: [GameScene],
  backgroundColor: "#000000",
  render: { pixelArt: false, antialias: true }
};

export class Game extends Phaser.Game {
  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config);
  }
}

window.addEventListener("load", () => {
  var game = new Game(config);
});
