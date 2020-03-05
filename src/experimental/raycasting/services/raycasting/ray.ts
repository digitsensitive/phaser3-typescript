/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2020 digitsensitive
 * @description  Raycasting Service: Ray
 * @version      1.0
 * @license      Digitsensitive
 */

export class Ray {
  private v: Phaser.Math.Vector2;

  constructor(x: number, y: number) {
    this.v = new Phaser.Math.Vector2(x, y);
  }

  public getVector(): Phaser.Math.Vector2 {
    return this.v;
  }

  public getX(): number {
    return this.v.x;
  }

  public getY(): number {
    return this.v.y;
  }
}
