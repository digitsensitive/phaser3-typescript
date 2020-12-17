import { IGraphicsConstructor } from '../interfaces/graphics.interface';

export class Ray extends Phaser.GameObjects.Graphics {
  // Vectors
  private direction: Phaser.Math.Vector2;

  // Variables
  private movingSpeed: number;

  // Circle Geom
  private rayCircle: Phaser.Geom.Circle;

  constructor(aParams: IGraphicsConstructor) {
    super(aParams.scene, aParams.options);

    this.initVariables(aParams.direction);
    this.initGraphics(aParams.options);

    this.scene.add.existing(this);
  }

  private initVariables(direction: Phaser.Math.Vector2): void {
    this.direction = direction.normalize();
    this.movingSpeed = 2;
  }

  private initGraphics(
    aParams: Phaser.Types.GameObjects.Graphics.Options
  ): void {
    this.setPosition(aParams.x, aParams.y);

    this.rayCircle = new Phaser.Geom.Circle(
      this.direction.x,
      this.direction.y,
      4
    );
    this.fillCircleShape(this.rayCircle);
  }

  update(): void {
    this.x += this.direction.x * this.movingSpeed;
    this.y += this.direction.y * this.movingSpeed;
  }
}
