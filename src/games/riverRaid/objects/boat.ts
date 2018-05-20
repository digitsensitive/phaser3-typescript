/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 Digitsensitive
 * @description  River Raid: Boat
 * @license      Digitsensitive
 */

export class Boat extends Phaser.GameObjects.Sprite {
  private lifeSpan: number;

  constructor(params) {
    super(params.scene, params.x, params.y, params.key, params.frame);
    this.setOrigin(0, 0);
    this.setFrame(0);

    // variables
    this.lifeSpan = 50;

    // physics
    params.scene.physics.world.enable(this);
    this.body.setSize(6, 6);
    params.scene.add.existing(this);
  }

  update(): void {
    if (!this.active) {
      this.body.enable = false;
      this.setFrame(1);
      this.lifeSpan--;

      if (this.lifeSpan < 0) {
        this.destroy();
      }
    }
  }
}
