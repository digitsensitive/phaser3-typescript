/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 Digitsensitive
 * @description  Alpha Adjust: Original Crystal
 * @license      Digitsensitive
 */

export class OriginalCrystal extends Phaser.GameObjects.Image {
  private currentScene: Phaser.Scene;
  private randomAlpha: number;

  constructor(params) {
    super(params.scene, params.x, params.y, params.key);

    this.initVariables(params);
    this.initImage();
    this.currentScene.add.existing(this);
  }

  private initVariables(params): void {
    this.currentScene = params.scene;
    this.randomAlpha = params.alpha;
  }

  private initImage(): void {
    this.setOrigin(0.5);
    this.setScale(2);
    this.setAlpha(this.randomAlpha);
  }

  update(): void {}
}
