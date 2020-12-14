/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2019 - 2020 Digitsensitive
 * @description  Ray casting: Ray
 * @license      {@link https://github.com/digitsensitive/phaser3-typescript/blob/master/LICENSE.md | MIT License}
 */

export class Ray {
  private rayVector: Phaser.Math.Vector2;

  constructor(x: number, y: number) {
    this.rayVector = new Phaser.Math.Vector2(x, y);
  }

  public getVector(): Phaser.Math.Vector2 {
    return this.rayVector;
  }
}
