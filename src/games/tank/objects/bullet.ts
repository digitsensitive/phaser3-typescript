/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 Digitsensitive
 * @description  Tank: Bullet
 * @license      Digitsensitive
 */

export class Bullet extends Phaser.GameObjects.Image {
  private currentScene: Phaser.Scene;
  private bulletSpeed: number;

  constructor(params) {
    super(params.scene, params.x, params.y, params.key);

    this.currentScene = params.scene;
    this.rotation = params.rotation;
    this.initImage();
    this.currentScene.add.existing(this);
  }

  private initImage(): void {
    // variables
    this.bulletSpeed = 600;

    // image
    this.setOrigin(0.5, 0.5);

    // physics
    this.currentScene.physics.world.enable(this);
    this.currentScene.physics.velocityFromRotation(
      this.rotation - Math.PI / 2,
      this.bulletSpeed,
      this.body.velocity
    );
  }

  update(): void {
    if (
      this.y < 0 ||
      this.y > this.currentScene.sys.canvas.height ||
      this.x < 0 ||
      this.x > this.currentScene.sys.canvas.width
    ) {
      this.destroy();
    }
  }
}
