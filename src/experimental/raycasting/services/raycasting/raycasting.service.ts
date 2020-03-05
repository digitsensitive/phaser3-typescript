/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2020 digitsensitive
 * @description  Raycasting Service
 *               A service to use raycasting in 2D.
 *
 * Ressources:
 *
 * Ray casting (Wikipedia):
 * https://en.wikipedia.org/wiki/Ray_casting
 *
 * The coding train - 2D Raycasting:
 * https://www.youtube.com/watch?v=TOEi6T2mtHo&t=1581s
 *
 * @version      1.0
 * @license      Digitsensitive
 */

import { Ray } from "./ray";

export interface RaycastHit2D {
  x: number;
  y: number;
  param: number;
}

export class RaycastingService {
  private eye: Phaser.Math.Vector2;
  private rays: Ray[];

  constructor(eyePosition: Phaser.Math.Vector2, amountOfRays: number) {
    this.eye = eyePosition;
    this.rays = [];

    // Create regular rays
    let fullCircle = 2 * Math.PI;
    let partCircle = fullCircle / amountOfRays;
    for (let i = 0; i < amountOfRays; i++) {
      this.rays.push(
        new Ray(Math.sin(i * partCircle), Math.cos(i * partCircle))
      );
    }
  }

  public setEyePosition(x: number, y: number): void {
    this.eye.setTo(x, y);
  }

  public getEyePosition(): Phaser.Math.Vector2 {
    return this.eye;
  }

  /**
   * Get all the rays from the current eye.
   */
  public getRays(): Ray[] {
    return this.rays;
  }

  public getRayLine(ray: Ray): Phaser.Geom.Line {
    return new Phaser.Geom.Line(
      this.eye.x,
      this.eye.y,
      this.eye.x + ray.getX(),
      this.eye.y + ray.getY()
    );
  }

  /**
   * Line–line intersection (adapted)
   *
   * Ressources:
   *
   * Line–line intersection (Wikipedia):
   * https://en.wikipedia.org/wiki/Line%E2%80%93line_intersection
   *
   * Bézier curve (Wikipedia):
   * https://en.wikipedia.org/wiki/B%C3%A9zier_curve
   *
   * @param l1
   * @param l2
   */
  public lineTolineIntersection(
    l1: Phaser.Geom.Line,
    l2: Phaser.Geom.Line
  ): RaycastHit2D {
    // Get coordinates of the two points from line 1
    let x1 = l1.x1;
    let y1 = l1.y1;
    let x2 = l1.x2;
    let y2 = l1.y2;

    // Get coordinates of the two points from line 2
    let x3 = l2.x1;
    let y3 = l2.y1;
    let x4 = l2.x2;
    let y4 = l2.y2;

    // Create denominator
    let denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

    // Check if the two lines are parallel or coincident
    if (denominator === 0) {
      return null;
    }

    let t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denominator;
    let u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / denominator;

    if (t > 0 && u < 1 && u > 0) {
      return {
        x: x3 + u * (x4 - x3),
        y: y3 + u * (y4 - y3),
        param: t
      };
    } else {
      return null;
    }
  }
}
