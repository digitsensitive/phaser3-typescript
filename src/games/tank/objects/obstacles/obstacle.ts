/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2019 Digitsensitive
 * @description  Tank: Obstacle
 * @license      Digitsensitive
 */

export class Obstacle extends Phaser.GameObjects.Image {
  private currentScene: Phaser.Scene;

  constructor(params) {
    super(params.scene, params.x, params.y, params.key);

    this.currentScene = params.scene;
    this.initImage();
    this.currentScene.add.existing(this);
  }

  private initImage(): void {
    // image
    this.setOrigin(0, 0);

    // physics
    this.currentScene.physics.world.enable(this);
    this.body.setImmovable(true);
  }

  update(): void {}
}
