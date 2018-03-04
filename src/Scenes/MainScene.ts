/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 Digitsensitive
 * @license      Digitsensitive
 */

export class MainScene extends Phaser.Scene {
  logo: Phaser.GameObjects.Sprite;

  preload(): void {
    this.load.image("logo", "../assets/sprites/phaser.png");
  }

  create(): void {
    this.logo = this.add.sprite(400, 300, "logo");
  }
}
