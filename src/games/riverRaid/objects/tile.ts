/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 Digitsensitive
 * @description  River Raid: Tile
 * @license      Digitsensitive
 */

export class Tile extends Phaser.GameObjects.Sprite {
  constructor(params) {
    super(params.scene, params.x, params.y, params.key, params.frame);
    this.setOrigin(0, 0);

    // physics
    params.scene.physics.world.enable(this);

    this.body.setSize(6, 6);

    params.scene.add.existing(this);
  }
  update(): void {}
}
