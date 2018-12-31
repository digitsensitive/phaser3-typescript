/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 Digitsensitive
 * @license      Digitsensitive
 */

export class MainScene extends Phaser.Scene {
  private phaserSprite: Phaser.GameObjects.Sprite;
  private container: Phaser.GameObjects.Container;

  constructor() {
    super({
      key: "MainScene"
    });
  }

  preload(): void {
    this.load.image("logo", "./assets/boilerplate/phaser.png");
  }

  create(): void {
    this.phaserSprite = this.add.sprite(400, 300, "logo");
    this.container = this.add.container(0, 0);

    this.container.add(this.phaserSprite);
    console.log(this.container.getAll());
    this.container.each(function(child) {
      child.destroy();
    });
    console.log(this.container.getAll());
  }

  update(): void {}
}
