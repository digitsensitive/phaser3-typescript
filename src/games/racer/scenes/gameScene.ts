/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 Digitsensitive
 * @description  Racer: Game Scene
 * @license      Digitsensitive
 */

import { Player } from "../objects/player";

export class GameScene extends Phaser.Scene {
  // objects
  private player: Player;

  constructor() {
    super({
      key: "GameScene"
    });
  }

  init(): void {
    // objects
    this.player = null;
  }

  create(): void {
    this.player = new Player({
      scene: this,
      x: this.sys.canvas.width / 2,
      y: this.sys.canvas.height - 100,
      key: "player"
    });
  }

  update(): void {
    this.player.update();
  }
}
