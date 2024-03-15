import { RectangleConstructor } from '../interfaces/interfaces';

export class Brick extends Phaser.GameObjects.Rectangle {
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
  }

  private initPhysics(): void {
    this.scene.physics.world.enable(this);
    this.body.setImmovable(true);
  }
}
