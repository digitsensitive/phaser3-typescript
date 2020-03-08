/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 Digitsensitive
 * @description  River Raid: Tile
 * @license      Digitsensitive
 */

import { CONST } from "../const/levelData";

export class Tile extends Phaser.GameObjects.Sprite {
  constructor(params) {
    super(params.scene, params.x, params.y, params.key, params.frame);
    this.setOrigin(0, 0);

    // physics
    params.scene.physics.world.enable(this);

    this.body.setSize(CONST.TILESIZE, CONST.TILESIZE);
    this.body.setVelocityY(60);
    params.scene.add.existing(this);
  }
  update(): void {
    if (!this.active) {
      this.destroy();
    }
  }
}
