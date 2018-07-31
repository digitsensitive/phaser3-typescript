/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 Digitsensitive
 * @description  The Powerful: Sword
 * @license      Digitsensitive
 */

export class Sword extends Phaser.GameObjects.Sprite {
  private currentScene: Phaser.Scene;
  private flipHorizontal: boolean;
  private flipVertical: boolean;

  constructor(params) {
    super(params.scene, params.x, params.y, "atlas", params.frame);

    this.initVariables(params);
    this.initImage();
    this.initPhysics();

    params.scene.add.existing(this);
  }

  /**
   * VARIABLE customizations
   */
  private initVariables(params): void {
    this.currentScene = params.scene;
    this.flipHorizontal = params.flipHorizontal;
    this.flipVertical = params.flipVertical;
  }

  /**
   * SPRITE customizations
   */
  private initImage(): void {
    this.setScale(1);
    this.setSize(16, 16);
    this.setAlpha(1);
    this.setFlip(this.flipHorizontal, this.flipVertical);
    this.setOrigin(0, 0);
    this.setAngle(0);
  }

  /**
   * PHYSICS customizations
   */
  private initPhysics(): void {
    this.currentScene.physics.world.enable(this);
  }
}
