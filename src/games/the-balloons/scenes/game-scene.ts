/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 Digitsensitive
 * @description  The Balloons: Game Scene
 * @license      Digitsensitive
 */

import { Player } from "../objects/player";

export class GameScene extends Phaser.Scene {
  private player: Player;

  constructor() {
    super({
      key: "GameScene"
    });
  }

  init(): void {}

  create(): void {
    // create game objects
    this.player = new Player({
      scene: this,
      x: this.sys.canvas.width / 2,
      y: this.sys.canvas.height - 40,
      key: "player"
    });
  }

  update(): void {
    if (this.player.active) {
      this.player.update();
    }
  }
}
