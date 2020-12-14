/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2019 - 2020 Digitsensitive
 * @description  Experimental: Draw
 * @license      {@link https://github.com/digitsensitive/phaser3-typescript/blob/master/LICENSE.md | MIT License}
 */

import "phaser";
import { BootScene } from "./scenes/boot-scene";
import { SpriteEditorScene } from "./scenes/sprite-editor-scene";

const config: Phaser.Types.Core.GameConfig = {
  title: "Draw",
  url: "https://github.com/digitsensitive/phaser3-typescript",
  version: "1.0",
  width: 300,
  height: 170,
  zoom: 4,
  type: Phaser.AUTO,
  parent: "game",
  scene: [BootScene, SpriteEditorScene],
  input: {
    keyboard: true
  },
  backgroundColor: "#5c544e",
  render: { pixelArt: true, antialias: false }
};

export class Game extends Phaser.Game {
  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config);
  }
}

window.addEventListener("load", () => {
  var game = new Game(config);
});
