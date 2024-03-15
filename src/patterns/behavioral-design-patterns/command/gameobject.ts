/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2019 Digitsensitive
 * @description  Design patterns: Behavioral design pattern - Command
 *               Game Object
 * @license      Digitsensitive
 */

export class GameObject extends Phaser.GameObjects.Image {
  constructor(params) {
    super(params.scene, params.x, params.y, params.key);

    this.initImage();

    this.scene.add.existing(this);
  }

  private initImage(): void {
    this.setOrigin(0, 0);
  }

  public shoot(): void {}
  public updatePosition(tile: Phaser.Tilemaps.Tile): void {}
}
