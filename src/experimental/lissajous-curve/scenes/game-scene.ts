/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2020 Digitsensitive
 * @description  Lissajous curve: Game Scene
 *
 * A Lissajous curve is the graph of a system of parametric equations
 *
 * x = A * sin(at+delta)
 * y = B * sin(bt),
 *
 * which describe complex harmonic motion.
 *
 * Ressources:
 *
 * Lissajous curve (Wikipedia):
 * https://en.wikipedia.org/wiki/Lissajous_curve
 *
 * Detailed Lissajous figures simulation:
 * https://codepen.io/kotwgarnku/full/dMqKZG
 *
 * @license      Digitsensitive
 */

export class GameScene extends Phaser.Scene {
  // Point
  private x: number;
  private y: number;
  private currentPoint: Phaser.Geom.Point;
  private pointGraphic: Phaser.GameObjects.Graphics;
  private pointAlpha: number;
  private pointColor: number;
  private pointSize: number;

  // System variables
  private A: number;
  private B: number;
  private a: number;
  private b: number;
  private phase: number;

  // Other variables
  private multiplicationFactor: number;
  private baseX: number;
  private baseY: number;
  private dt: number = 0;

  constructor() {
    super({
      key: "GameScene"
    });
  }

  init(): void {
    // Init point
    this.currentPoint = new Phaser.Geom.Point(this.x, this.y);
    this.pointAlpha = 1;
    this.pointColor = 0xffffff;
    this.pointSize = 4;
    this.pointGraphic = this.add.graphics();
    this.pointGraphic.fillStyle(this.pointColor, this.pointAlpha);

    // Init system variables
    this.multiplicationFactor = 30;
    this.A = 6 * this.multiplicationFactor;
    this.B = 6 * this.multiplicationFactor;
    this.a = 3;
    this.b = 2;
    this.phase = Math.PI / 2;

    // Init other variables
    this.baseX = this.sys.canvas.width / 2;
    this.baseY = this.sys.canvas.height / 2;
    this.dt = 0;
  }

  update(): void {
    this.updatePoint();
    this.drawPoint();
  }

  /**
   * Update our point
   */
  private updatePoint() {
    this.x = this.A * Math.sin(this.a * this.dt + this.phase) + this.baseX;
    this.y = this.B * Math.sin(this.b * this.dt) + this.baseY;
    this.currentPoint.setTo(this.x, this.y);
    this.dt += 0.009;

    /* Color change
    let color = Phaser.Display.Color.IntegerToColor(this.pointColor);
    color.blue -= 1;

    this.pointColor = +Phaser.Display.Color.RGBToString(
      color.red,
      color.green,
      color.blue,
      color.alpha,
      "0x"
    );
    this.pointGraphic.fillStyle(this.pointColor, this.pointAlpha);*/
  }

  /**
   * Draw point
   */
  private drawPoint(): void {
    this.pointGraphic.fillPointShape(this.currentPoint, this.pointSize);
  }
}
