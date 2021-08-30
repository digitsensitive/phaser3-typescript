import { IRectangleConstructor } from '../interfaces/interfaces';

export class Brick extends Phaser.GameObjects.Rectangle {
  body: Phaser.Physics.Arcade.Body;

  constructor(aParams: IRectangleConstructor) {
    super(
      aParams.scene,
      aParams.x,
      aParams.y,
      aParams.width,
      aParams.height,
      aParams.fillColor,
      aParams.fillAlpha
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
