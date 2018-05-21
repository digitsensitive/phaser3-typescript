/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 Digitsensitive
 * @description  River Raid: Bridge
 * @license      Digitsensitive
 */

import { CONST } from "../const/levelData";

export class Bridge extends Phaser.GameObjects.Sprite {
  private lifeSpan: number;

  constructor(params) {
    super(params.scene, params.x, params.y, params.key, params.frame);
    this.setOrigin(0, 0);
    this.setFrame(0);

    // variables
    this.lifeSpan = 10;

    // physics
    params.scene.physics.world.enable(this);
    this.body.setSize(CONST.TILESIZE, CONST.TILESIZE);
    this.body.setVelocityY(30);
    params.scene.add.existing(this);
  }

  update(): void {
    if (!this.active) {
      this.body.setVelocityY(30);
      this.lifeSpan--;

      if (this.lifeSpan < 0) {
        this.destroy();
      }
    }
  }
}
