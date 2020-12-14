/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2019 - 2020 Digitsensitive
 * @description  Draw: Point Class
 * @license      {@link https://github.com/digitsensitive/phaser3-typescript/blob/master/LICENSE.md | MIT License}
 */

export class Point {
  private color: number;
  private position: Phaser.Geom.Point;

  constructor(xPos: number, yPos: number, color: number) {
    this.color = color;
    this.position = new Phaser.Geom.Point(xPos, yPos);
  }

  public getColor(): number {
    return this.color;
  }

  public setColor(newColor: number): void {
    this.color = newColor;
  }

  public getPosition(): Phaser.Geom.Point {
    return this.position;
  }
}
