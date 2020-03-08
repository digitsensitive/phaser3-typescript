/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2020 Digitsensitive
 * @description  Fractal tree: Game Scene
 *
 * In mathematics, a fractal is a subset of a Euclidean space for which the
 * fractal dimension strictly exceeds the topological dimension.
 *
 * Ressources:
 *
 * Fractal tree (Wikipedia):
 * https://en.wikipedia.org/wiki/Fractal
 *
 * Rosetta code:
 * https://www.rosettacode.org/wiki/Fractal_tree#TypeScript
 *
 * @license      Digitsensitive
 */

export class GameScene extends Phaser.Scene {
  private lines: Phaser.GameObjects.Graphics[];
  private constantForConversionToRadians: number = Math.PI / 180;
  private depth: number = 12;
  private lineLength: number = 5;

  constructor() {
    super({
      key: "GameScene"
    });
  }

  init(): void {
    this.lines = [];
  }
  create(): void {
    this.drawTree(300, 500, -90, this.depth);
  }

  /**
   * Draw a line.
   * @param x1
   * @param y1
   * @param x2
   * @param y2
   */
  private drawLine(x1: number, y1: number, x2: number, y2: number): void {
    // Add new line with style
    let line = this.add.graphics();
    line.lineStyle(1, 0xffffff);
    line.moveTo(x1, y1);
    line.lineTo(x2, y2);
    line.strokePath();
    this.lines.push(line);
  }

  /**
   * Draw a branch at the given point with a specified angle and call itself twice
   * @param x1
   * @param y1
   * @param angle
   * @param depth
   */
  private drawTree(x1: number, y1: number, angle: number, depth: number): void {
    // Only draw if depth not yet reached
    if (depth !== 0) {
      let x2: number =
        x1 +
        Math.cos(angle * this.constantForConversionToRadians) *
          depth *
          this.lineLength;
      let y2: number =
        y1 +
        Math.sin(angle * this.constantForConversionToRadians) *
          depth *
          this.lineLength;
      this.drawLine(x1, y1, x2, y2);
      this.drawTree(x2, y2, angle - 20, depth - 1);
      this.drawTree(x2, y2, angle + 20, depth - 1);
    }
  }
}
