import { ImageConstructor } from '../interfaces/image.interface';

export class Redhat extends Phaser.GameObjects.Image {
  body: Phaser.Physics.Arcade.Body;

  constructor(params: ImageConstructor) {
    super(params.scene, params.x, params.y, params.texture, params.frame);

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
    this.body.setSize(200, 300);
  }
}
