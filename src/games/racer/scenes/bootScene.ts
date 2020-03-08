/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 Digitsensitive
 * @description  Racer: Boot Scene
 * @license      Digitsensitive
 */

export class BootScene extends Phaser.Scene {
  constructor() {
    super({
      key: "BootScene"
    });
  }

  preload(): void {
    this.load.spritesheet("player", "./assets/games/racer/player.png", {
      frameWidth: 10,
      frameHeight: 20
    });
  }

  update(): void {
    this.scene.start("GameScene");
  }
}
