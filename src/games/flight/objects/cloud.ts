/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2019 - 2020 Digitsensitive
 * @description  43' Cloud
 * @license      {@link https://github.com/digitsensitive/phaser3-typescript/blob/master/LICENSE.md | MIT License}
 */

export class Cloud extends Phaser.GameObjects.Image {
  constructor(params) {
    super(params.scene, params.x, params.y, params.key);

    this.initImage();
    this.initPhysics();
    params.scene.add.existing(this);
  }

  private initImage(): void {
    this.setOrigin(0, 0);
  }

  private initPhysics(): void {
    this.scene.physics.world.enable(this);
    this.body.setVelocity(0, 40);
  }

  update(): void {}
}
