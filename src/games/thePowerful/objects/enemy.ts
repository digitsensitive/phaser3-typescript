/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 Digitsensitive
 * @description  The Powerful: Enemy
 * @license      Digitsensitive
 */

export class Enemy extends Phaser.GameObjects.Sprite {
  private currentScene: Phaser.Scene;

  constructor(params) {
    super(params.scene, params.x, params.y, "atlas", "playerWalk1");

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
  }

  /**
   * SPRITE customizations
   */
  private initImage(): void {
    this.setScale(1);
    this.setSize(16, 16);
    this.setAlpha(1);
    this.setFlip(false, false);
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
