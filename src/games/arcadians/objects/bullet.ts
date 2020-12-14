/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2019 - 2020 Digitsensitive
 * @description  Arcadians: Bullet
 * @license      {@link https://github.com/digitsensitive/phaser3-typescript/blob/master/LICENSE.md | MIT License}
 */

export class Bullet extends Phaser.GameObjects.Sprite {
  body: Phaser.Physics.Arcade.Body;
  private bulletSpeed: number;

  constructor(params) {
    super(params.scene, params.x, params.y, params.key);

    this.initVariables(params);
    this.initImage();
    this.initPhysics();

    this.scene.add.existing(this);
  }

  private initVariables(params): void {
    this.bulletSpeed = params.speed;
  }

  private initImage(): void {
    this.setOrigin(0, 0);
    this.setScale(2);
  }

  private initPhysics(): void {
    this.scene.physics.world.enable(this);
    this.body.setVelocityY(this.bulletSpeed);
    this.body.setSize(3, this.height);
  }

  update(): void {
    if (this.y < 0) {
      this.destroy();
    }
  }
}
