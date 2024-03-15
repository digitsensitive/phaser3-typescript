import { ImageConstructor } from '../interfaces/image.interface';

export class Wall extends Phaser.GameObjects.Image {
  constructor(params: ImageConstructor) {
    super(params.scene, params.x, params.y, params.texture, params.frame);
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
