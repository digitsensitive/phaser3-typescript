import { ISpriteConstructor } from '../interfaces/sprite.interface';

export class Redhat extends Phaser.GameObjects.Sprite {
  body: Phaser.Physics.Arcade.Body;

  constructor(aParams: ISpriteConstructor) {
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
