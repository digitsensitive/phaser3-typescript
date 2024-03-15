import { ImageConstructor } from '../interfaces/image.interface';

export class Tile extends Phaser.GameObjects.Image {
  constructor(params: ImageConstructor) {
    super(params.scene, params.x, params.y, params.texture, params.frame);

    // set image settings
    this.setOrigin(0, 0);
    this.setInteractive();

    this.scene.add.existing(this);
  }
}
