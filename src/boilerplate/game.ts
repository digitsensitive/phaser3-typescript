/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 Digitsensitive
 * @license      Digitsensitive
 */

/// <reference path="../phaser.d.ts"/>

import "phaser";
import { MainScene } from "./Scenes/MainScene";

// main game configuration
const config: GameConfig = {
  type: Phaser.AUTO,
  parent: "game",
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 200 }
    }
  },
  scene: {
    MainScene
  }
};

// game class
export class Game extends Phaser.Game {
  constructor(GameConfig: config) {
    super(config);
    this.scene.add("MainScene", MainScene, false);
    this.scene.start("MainScene");
  }
}

// when the page is loaded, create our game instance
window.onload = () => {
  var game = new Game(config);
};
