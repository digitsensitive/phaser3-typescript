/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2020 digitsensitive
 * @description  Cellular automaton
 * @license      Digitsensitive
 */

import "phaser";
import { GameScene } from "./scenes/game-scene";

const config: Phaser.Types.Core.GameConfig = {
  title: "Cellular automaton",
  url: "https://github.com/digitsensitive/phaser3-typescript",
  version: "1.0",
  width: 600,
  height: 600,
  type: Phaser.AUTO,
  parent: "game",
  scene: [GameScene],
  backgroundColor: "#5d13df",
  render: { pixelArt: true, antialias: false },
};

export class Game extends Phaser.Game {
  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config);
  }
}

window.addEventListener("load", () => {
  var game = new Game(config);
});
