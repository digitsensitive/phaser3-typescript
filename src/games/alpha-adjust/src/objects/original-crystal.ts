import { CrystalConstructor } from '../interfaces/crystal.interface';

export class OriginalCrystal extends Phaser.GameObjects.Image {
  private randomAlpha: number;

  constructor(params: CrystalConstructor) {
    super(params.scene, params.x, params.y, params.texture);

    this.initVariables(params.alpha);
    this.initImage();
    this.scene.add.existing(this);
  }

  private initVariables(alpha: number): void {
    this.randomAlpha = alpha;
  }

  private initImage(): void {
    this.setOrigin(0.5);
    this.setScale(2);
    this.setAlpha(this.randomAlpha);
  }
}
