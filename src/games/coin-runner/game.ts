/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 - 2020 digitsensitive
 * @description  Coin Runner
 * @license      {@link https://github.com/digitsensitive/phaser3-typescript/blob/master/LICENSE.md | MIT License}
 */

import "phaser";
import { GameScene } from "./scenes/game-scene";

const config: Phaser.Types.Core.GameConfig = {
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
  render: { pixelArt: false, antialias: false }
};

export class Game extends Phaser.Game {
  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config);
  }
}

window.addEventListener("load", () => {
  var game = new Game(config);
});
