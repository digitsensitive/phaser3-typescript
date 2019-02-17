/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 - 2019 digitsensitive
 * @description  Alpha Adjust: Clone Crystal
 * @license      Digitsensitive
 */

export class CloneCrystal extends Phaser.GameObjects.Image {
  private increaseAlpha: boolean;

  constructor(params) {
    super(params.scene, params.x, params.y, params.key);

    this.initVariables();
    this.initImage();
    this.scene.add.existing(this);
  }

  private initVariables(): void {
    this.increaseAlpha = false;
  }

  private initImage(): void {
    this.setOrigin(0.5);
    this.setScale(2);
    this.setAlpha(1);
  }

  update(): void {
    this.updateAlphaOfCloneCrystal();
    this.checkIfAlphaOutOfRange();
  }

  private updateAlphaOfCloneCrystal(): void {
    if (this.increaseAlpha) {
      this.alpha += 0.01;
    } else {
      this.alpha -= 0.01;
    }
  }

  private checkIfAlphaOutOfRange(): void {
    if (this.alpha === 0) {
      this.increaseAlpha = true;
      this.alpha = 0;
    } else if (this.alpha === 1) {
      this.increaseAlpha = false;
      this.alpha = 1;
    }
  }
}
