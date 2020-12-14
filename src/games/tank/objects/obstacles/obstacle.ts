/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2019 - 2020 Digitsensitive
 * @description  Tank: Obstacle
 * @license      {@link https://github.com/digitsensitive/phaser3-typescript/blob/master/LICENSE.md | MIT License}
 */

export class Obstacle extends Phaser.GameObjects.Image {
  constructor(params) {
    super(params.scene, params.x, params.y, params.key);

    this.initImage();
    this.scene.add.existing(this);
  }

  private initImage(): void {
    // image
    this.setOrigin(0, 0);

    // physics
    this.scene.physics.world.enable(this);
    this.body.setImmovable(true);
  }

  update(): void {}
}
