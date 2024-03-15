import { RectangleConstructor } from '../interfaces/interfaces';

export class Ball extends Phaser.GameObjects.Rectangle {
  body: Phaser.Physics.Arcade.Body;

  constructor(params: RectangleConstructor) {
    super(
      params.scene,
      params.x,
      params.y,
      params.width,
      params.height,
      params.fillColor,
      params.fillAlpha
    );

    this.initRectangle();
    this.initPhysics();
    this.scene.add.existing(this);
  }

  private initRectangle(): void {
    this.setOrigin(0);
    this.width = 10;
    this.height = 10;
    this.setFillStyle(0xffffff);
  }

  private initPhysics(): void {
    this.scene.physics.world.enable(this);
    this.body.setBounce(1, 1);
    this.body.setCollideWorldBounds();
  }

  public applyInitVelocity(): void {
    this.body.setVelocity(Phaser.Math.RND.between(-200, 200), 200);
    this.body.speed = 800;
  }
}
