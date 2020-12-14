/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2019 - 2020 Digitsensitive
 * @description  Dare Devil Denis: Tile
 * @license      {@link https://github.com/digitsensitive/phaser3-typescript/blob/master/LICENSE.md | MIT License}
 */

export class Tile extends Phaser.GameObjects.Image {
  constructor(params) {
    super(params.scene, params.x, params.y, params.key);

    this.initImage();
    this.scene.add.existing(this);
  }

  private initImage() {
    this.setOrigin(0, 0);

    // physics
    this.scene.physics.world.enable(this);
    this.body.setAllowGravity(false);
    this.body.setImmovable(true);
  }
}
