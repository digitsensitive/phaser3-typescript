import { ImageConstructor } from '../interfaces/interfaces';

export class Ball extends Phaser.GameObjects.Image {
  body: Phaser.Physics.Arcade.Body;

  private speed: number;

  constructor(params: ImageConstructor) {
    super(params.scene, params.x, params.y, params.texture, params.frame);

    this.initVariables();
    this.initImage();
    this.initPhysics();
    this.scene.add.existing(this);
  }

  private initVariables() {
    this.speed = 600;
  }

  private initImage() {
    this.setVisible(false);
  }

  private initPhysics() {
    this.scene.physics.world.enable(this);
    this.body.setCollideWorldBounds(true);
    this.body.onWorldBounds = true;
  }

  public getSpeed(): number {
    return this.speed;
  }
}
