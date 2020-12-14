/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2019 - 2020 Digitsensitive
 * @description  Princess: GameObject
 * @license      {@link https://github.com/digitsensitive/phaser3-typescript/blob/master/LICENSE.md | MIT License}
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

  public updatePosition(tile: Phaser.Tilemaps.Tile): void {}
}
