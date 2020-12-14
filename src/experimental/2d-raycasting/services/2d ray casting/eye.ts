/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2019 - 2020 Digitsensitive
 * @description  Ray casting: Eye
 * @license      {@link https://github.com/digitsensitive/phaser3-typescript/blob/master/LICENSE.md | MIT License}
 */

import { Ray } from "./ray";

export class Eye {
  private position: Phaser.Geom.Point;
  private rays: Ray[];

  constructor(x: number, y: number) {
    this.position = new Phaser.Geom.Point(x, y);
    this.rays = [];

    let fullCircle = 2 * Math.PI;
    let partCircle = fullCircle / 32;
    for (let i = 0; i < 32; i++) {
      this.rays.push(
        new Ray(Math.sin(i * partCircle), Math.cos(i * partCircle))
      );
    }
  }

  public getPosition(): Phaser.Geom.Point {
    return this.position;
  }

  public getRays(): Ray[] {
    return this.rays;
  }
}
