/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2019 Digitsensitive
 * @description  Tank: Bullet
 * @license      Digitsensitive
 */

export class Bullet extends Phaser.GameObjects.Image {
  private bulletSpeed: number;

  constructor(params) {
    super(params.scene, params.x, params.y, params.key);

    this.rotation = params.rotation;
    this.initImage();
    this.scene.add.existing(this);
  }

  private initImage(): void {
    // variables
    this.bulletSpeed = 1000;

    // image
    this.setOrigin(0.5, 0.5);
    this.setDepth(2);

    // physics
    this.scene.physics.world.enable(this);
    this.scene.physics.velocityFromRotation(
      this.rotation - Math.PI / 2,
      this.bulletSpeed,
      this.body.velocity
    );
  }

  update(): void {}
}
