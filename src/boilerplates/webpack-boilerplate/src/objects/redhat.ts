import { IImageConstructor } from '../interfaces/image.interface';

export class Redhat extends Phaser.GameObjects.Image {
  body: Phaser.Physics.Arcade.Body;

  constructor(aParams: IImageConstructor) {
    super(aParams.scene, aParams.x, aParams.y, aParams.texture, aParams.frame);

    this.initSprite();
    this.initPhysics();
    this.scene.add.existing(this);
  }

  private initSprite() {
    this.setScale(0.5);
  }

  private initPhysics() {
    this.scene.physics.world.enable(this);
    this.body.setVelocity(100, 200);
    this.body.setBounce(1, 1);
    this.body.setCollideWorldBounds(true);
  }
}
