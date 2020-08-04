/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2020 digitsensitive
 * @description  Factory Method
 * @license      Digitsensitive
 */

import "phaser";
import { BootScene } from "./scenes/boot-scene";
import { FactoryMethodScene } from "./scenes/factory-method-scene";
import { SimpleFactoryScene } from "./scenes/simple-factory-scene";

const config: Phaser.Types.Core.GameConfig = {
  title: "Factory Method",
  url: "https://github.com/digitsensitive/phaser3-typescript",
  version: "1.0",
  width: 160,
  height: 144,
  zoom: 4,
  type: Phaser.AUTO,
  parent: "game",
  scene: [BootScene, SimpleFactoryScene, FactoryMethodScene],
  backgroundColor: "#32484f",
  render: { pixelArt: true, antialias: false },
};

export class Game extends Phaser.Game {
  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config);
  }
}

window.addEventListener("load", () => {
  let game = new Game(config);
});
