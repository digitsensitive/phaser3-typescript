/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 Digitsensitive
 * @license      Digitsensitive
 */

/// <reference path="./phaser.d.ts"/>

import "phaser";
import { MainScene } from "./Scenes/MainScene";

interface IGameConstructor {
  width: string | number;
  height: string | number;
  type?: number;
  parent?: string;
  physics?: any;
  scene?: any;
}

export class Game extends Phaser.Game {
  constructor(aParams: IGameConstructor) {
    super(aParams);

    this.scene.add("MainScene", MainScene, false);
    this.scene.start("MainScene");
  }
}

// when the page has finished loading, create our game
window.onload = () => {
  var game = new Game({
    width: 800,
    height: 600,
    parent: "game",
    type: Phaser.AUTO,
    physics: {
      default: "arcade",
      arcade: {
        gravity: { y: 200 }
      }
    },
    scene: {
      MainScene
    }
  });
};
