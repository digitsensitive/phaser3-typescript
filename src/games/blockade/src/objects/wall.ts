import { IImageConstructor } from '../interfaces/image.interface';

export class Wall extends Phaser.GameObjects.Image {
  constructor(aParams: IImageConstructor) {
    super(aParams.scene, aParams.x, aParams.y, aParams.texture, aParams.frame);
    this.setOrigin(0.5, 0.5);
    this.setAlpha(Phaser.Math.RND.between(0.01, 0.4));
    this.scene.add.existing(this);
  }

  update(): void {
    if (this.alpha < 1) {
      this.setAlpha(this.alpha + 0.005);
    } else {
      this.setAlpha(1);
    }
  }
}
