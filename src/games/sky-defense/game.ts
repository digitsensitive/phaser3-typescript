import "phaser";
import { BootScene } from "./scenes/boot-scene";
import { GameScene } from "./scenes/game-scene";
import { HUDScene } from "./scenes/hud-scene";

const config: Phaser.Types.Core.GameConfig = {
  title: "Sky Defense",
  url: "https://github.com/digitsensitive/phaser3-typescript",
  version: "1.0",
  width: 207,
  height: 448,
  zoom: 1.5,
  type: Phaser.AUTO,
  parent: "game",
  scene: [BootScene, HUDScene, GameScene],
  input: {
    touch: true,
    mouse: true,
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
  backgroundColor: "#9bbc0f",
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
