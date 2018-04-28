/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 Digitsensitive
 * @description  Flappy Bird: Pipe
 * @license      Digitsensitive
 */

export class Pipe extends Phaser.GameObjects.Sprite {
  constructor(params) {
    super(params.scene, params.x, params.y, params.key, params.frame);

    // image
    this.setScale(3);
    this.setOrigin(0, 0);

    // physics
    params.scene.physics.world.enable(this);
    this.body.allowGravity = false;
    this.body.setVelocityX(-200);
    this.body.setSize(20, 20);

    params.scene.add.existing(this);
  }
}
