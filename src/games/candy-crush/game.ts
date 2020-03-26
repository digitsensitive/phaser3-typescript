/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2020 digitsensitive
 * @description  Candy crush
 * @license      Digitsensitive
 */

import "phaser";
import { BootScene } from "./scenes/boot-scene";
import { GameScene } from "./scenes/game-scene";

const config: Phaser.Types.Core.GameConfig = {
  title: "Candy crush",
  url: "https://github.com/digitsensitive/phaser3-typescript",
  version: "1.0",
  width: 520,
  height: 700,
  type: Phaser.AUTO,
  parent: "game",
  scene: [BootScene, GameScene],
  backgroundColor: "#de3412",
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
