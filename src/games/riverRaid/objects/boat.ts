/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 Digitsensitive
 * @description  River Raid: Boat
 * @license      Digitsensitive
 */

import { CONST } from "../const/levelData";

export class Boat extends Phaser.GameObjects.Sprite {
  private lifeSpan: number;
  private movingToRight: boolean;

  constructor(params) {
    super(params.scene, params.x, params.y, params.key, params.frame);
    this.setOrigin(0, 0);
    this.setFrame(0);

    // variables
    this.lifeSpan = 50;
    this.movingToRight = true;

    // physics
    params.scene.physics.world.enable(this);
    this.body.setSize(CONST.TILESIZE, CONST.TILESIZE);
    this.body.setVelocityY(60);
    params.scene.add.existing(this);
  }

  update(): void {
    if (!this.active) {
      this.body.setVelocityY(60);
      this.setFrame(1);
      this.lifeSpan--;

      if (this.lifeSpan < 0) {
        this.destroy();
      }
    }
  }

  public turn(): void {
    if (this.movingToRight) {
      this.movingToRight = false;
      this.x -= 10;
    } else {
      this.movingToRight = true;
      this.x += 10;
    }
  }
}
