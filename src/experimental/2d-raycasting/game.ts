/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2019 - 2020 Digitsensitive
 * @description  2D Raycasting
 * @license      {@link https://github.com/digitsensitive/phaser3-typescript/blob/master/LICENSE.md | MIT License}
 */

import "phaser";
import { GameScene } from "./scenes/game-scene";

const config: Phaser.Types.Core.GameConfig = {
  title: "2D Raycasting",
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
