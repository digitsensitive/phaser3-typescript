/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2019 Digitsensitive
 * @description  Tank: Game Scene
 * @license      Digitsensitive
 */

import { Player } from "../objects/player/player";

export class GameScene extends Phaser.Scene {
  private player: Player;

  constructor() {
    super({
      key: "GameScene"
    });
  }

  init(): void {}

  create(): void {
    this.player = new Player({
      scene: this,
      x: this.sys.canvas.width / 2,
      y: this.sys.canvas.height / 2
    });
  }

  update(): void {
    this.player.update();
  }
}
