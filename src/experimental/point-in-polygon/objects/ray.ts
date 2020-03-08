/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2020 digitsensitive
 * @description  Point in Polygon: Ray
 * @license      Digitsensitive
 */

export class Ray extends Phaser.GameObjects.Graphics {
  // Vectors
  private direction: Phaser.Math.Vector2;

  // Variables
  private movingSpeed: number;

  // Circle Geom
  private rayCircle: Phaser.Geom.Circle;

  constructor(params) {
    super(params.scene, params.options);

    this.initVariables(params.options.direction);
    this.initGraphics(params.options);

    this.scene.add.existing(this);
  }

  private initVariables(direction: Phaser.Math.Vector2): void {
    this.direction = direction.normalize();
    this.movingSpeed = 2;
  }

  private initGraphics(params): void {
    this.setPosition(params.x, params.y);

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
