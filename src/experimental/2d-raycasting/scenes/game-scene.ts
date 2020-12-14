/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2019 - 2020 Digitsensitive
 * @description  2D Raycasting: Game Scene
 *
 * Line–line intersection (Wikipedia):
 * https://en.wikipedia.org/wiki/Line%E2%80%93line_intersection
 *
 * Bézier curve (Wikipedia):
 * https://en.wikipedia.org/wiki/B%C3%A9zier_curve
 *
 * The coding train - 2D Raycasting:
 * https://www.youtube.com/watch?v=TOEi6T2mtHo&t=1581s
 *
 * @license      {@link https://github.com/digitsensitive/phaser3-typescript/blob/master/LICENSE.md | MIT License}
 */

import { Eye } from "../services/2d ray casting/eye";
import { Ray } from "../services/2d ray casting/ray";
import { RaycastHit2D } from "../services/2d ray casting/interfaces/raycastHit2D";

const WALLS = [
  [10, 10, 790, 10],
  [10, 10, 10, 590],
  [790, 10, 790, 590],
  [10, 590, 790, 590],
  [400, 200, 400, 400],
  [400, 400, 520, 340],
  [520, 340, 400, 200],
  [100, 100, 200, 120],
  [200, 120, 250, 20],
  [250, 20, 100, 100],
  [600, 160, 740, 130],
  [740, 130, 690, 45],
  [690, 45, 600, 160],
  [172, 395, 288, 517],
  [288, 517, 61, 546],
  [61, 546, 172, 395]
];

export class GameScene extends Phaser.Scene {
  private eyePoint: Eye;
  private lineGraphics: Phaser.GameObjects.Graphics;
  private walls: Phaser.Geom.Line[];

  private P0: Phaser.Geom.Point;
  private P1: Phaser.Geom.Point;
  private P2: Phaser.Geom.Point;
  private P3: Phaser.Geom.Point;

  constructor() {
    super({
      key: "GameScene"
    });
  }

  init(): void {
    this.eyePoint = new Eye(200, 200);
    this.lineGraphics = null;

    this.walls = [];
  }

  create(): void {
    // add graphics
    this.lineGraphics = this.add.graphics();

    // add walls to the game scene from predefined arrays
    for (let wall of WALLS) {
      this.walls.push(new Phaser.Geom.Line(wall[0], wall[1], wall[2], wall[3]));
    }

    // handle input
    this.input.on("pointermove", pointer => {
      this.eyePoint.getPosition().x = pointer.x;
      this.eyePoint.getPosition().y = pointer.y;
    });

    // DELETE
    this.P0 = new Phaser.Geom.Point(100, 100);
    this.P1 = new Phaser.Geom.Point(200, 200);
    this.P2 = new Phaser.Geom.Point(100, 300);
    this.P3 = new Phaser.Geom.Point(400, 250);

    let a = this.segmentIntersect(this.P0, this.P1, this.P2, this.P3);
    // DELETE
  }

  update(): void {
    this.lineGraphics.clear();
    this.lineGraphics.lineStyle(2, 0x00ff00);

    for (let w of this.walls) {
      this.lineGraphics.strokeLineShape(w);
    }

    for (let r of this.eyePoint.getRays()) {
      let closestIntersect = null;
      let rayLine = new Phaser.Geom.Line(
        this.eyePoint.getPosition().x,
        this.eyePoint.getPosition().y,
        this.eyePoint.getPosition().x + r.getVector().x,
        this.eyePoint.getPosition().y + r.getVector().y
      );

      for (let w of this.walls) {
        // check if there is a line to line intersection
        let intersect = this.lineTolineIntersection(rayLine, w);

        // continue if there is no intersection
        if (!intersect) {
          continue;
        }

        if (!closestIntersect || intersect.param < closestIntersect.param) {
          closestIntersect = intersect;
        }
      }

      if (!closestIntersect) {
        continue;
      }

      // set the intersection point of the ray line
      rayLine.x2 = closestIntersect.x;
      rayLine.y2 = closestIntersect.y;

      // draw the ray line
      this.lineGraphics.lineStyle(2, 0xffffff);
      this.lineGraphics.strokeLineShape(rayLine);

      // draw the point of intersection
      this.lineGraphics.fillStyle(0xffffff, 1);
      this.lineGraphics.fillCircle(closestIntersect.x, closestIntersect.y, 4);
    }

    this.lineGraphics.fillPointShape(this.P0, 10);
    this.lineGraphics.fillPointShape(this.P1, 10);
    this.lineGraphics.fillPointShape(this.P2, 10);
    this.lineGraphics.fillPointShape(this.P3, 10);
    this.lineGraphics.strokeLineShape(
      new Phaser.Geom.Line(this.P0.x, this.P0.y, this.P1.x, this.P1.y)
    );
    this.lineGraphics.strokeLineShape(
      new Phaser.Geom.Line(this.P2.x, this.P2.y, this.P3.x, this.P3.y)
    );

    let intersectionPoint = this.rayIntersect(
      this.P0,
      this.P1,
      this.P2,
      this.P3
    );

    if (intersectionPoint) {
      this.lineGraphics.fillPointShape(intersectionPoint, 10);
    }
  }

  /**
   * Line–line intersection adapted
   * @param l1
   * @param l2
   */
  private lineTolineIntersection(
    l1: Phaser.Geom.Line,
    l2: Phaser.Geom.Line
  ): RaycastHit2D {
    // get coordinates of the two points from line 1
    let x1 = l1.x1;
    let y1 = l1.y1;
    let x2 = l1.x2;
    let y2 = l1.y2;

    // get coordinates of the two points from line 2
    let x3 = l2.x1;
    let y3 = l2.y1;
    let x4 = l2.x2;
    let y4 = l2.y2;

    // create denominator
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

  /**
   * Intersection between infinitive lines
   * @param p0
   * @param p1
   * @param p2
   * @param p3
   */
  private lineIntersect(
    p0: Phaser.Geom.Point,
    p1: Phaser.Geom.Point,
    p2: Phaser.Geom.Point,
    p3: Phaser.Geom.Point
  ): Phaser.Geom.Point {
    let A1 = p1.y - p0.y;
    let B1 = p0.x - p1.x;
    let C1 = A1 * p0.x + B1 * p0.y;
    let A2 = p3.y - p2.y;
    let B2 = p2.x - p3.x;
    let C2 = A2 * p2.x + B2 * p2.y;

    let denominator = A1 * B2 - A2 * B1;

    // lines are parallel or collinear
    // A's and B's are the same, because they both have the same slope
    if (denominator === 0) {
      return null;
    }

    let intersectX = (B2 * C1 - B1 * C2) / denominator;
    let intersectY = (A1 * C2 - A2 * C1) / denominator;
    return new Phaser.Geom.Point(intersectX, intersectY);
  }

  /**
   * Segment Intersection
   * @param p0
   * @param p1
   * @param p2
   * @param p3
   */
  private segmentIntersect(
    p0: Phaser.Geom.Point,
    p1: Phaser.Geom.Point,
    p2: Phaser.Geom.Point,
    p3: Phaser.Geom.Point
  ): Phaser.Geom.Point {
    let A1 = p1.y - p0.y;
    let B1 = p0.x - p1.x;
    let C1 = A1 * p0.x + B1 * p0.y;
    let A2 = p3.y - p2.y;
    let B2 = p2.x - p3.x;
    let C2 = A2 * p2.x + B2 * p2.y;

    let denominator = A1 * B2 - A2 * B1;

    // lines are parallel or collinear
    // A's and B's are the same, because they both have the same slope
    if (denominator === 0) {
      return null;
    }

    let intersectX = (B2 * C1 - B1 * C2) / denominator;
    let intersectY = (A1 * C2 - A2 * C1) / denominator;

    // We take the distance between the intersection and the starting point of the line
    // and divide it by the total distance on the x-axis. We do this for both line segments.
    let rx0 = (intersectX - p0.x) / (p1.x - p0.x);
    let ry0 = (intersectY - p0.y) / (p1.y - p0.y);
    let rx1 = (intersectX - p2.x) / (p3.x - p2.x);
    let ry1 = (intersectY - p2.y) / (p3.y - p2.y);

    // If the value is between [0-1] the intersection happend on the line segment.
    // If it is exactly 0 or 1, than the intersection happend exactly on the edges of the lines
    if (
      ((rx0 >= 0 && rx0 <= 1) || (ry0 >= 0 && ry0 <= 1)) &&
      ((rx1 >= 0 && rx1 <= 1) || (ry1 >= 0 && ry1 <= 1))
    ) {
      return new Phaser.Geom.Point(intersectX, intersectY);
    } else {
      return null;
    }
  }

  /**
   * Ray Intersection
   * @param p0
   * @param p1
   * @param p2
   * @param p3
   */
  private rayIntersect(
    p0: Phaser.Geom.Point,
    p1: Phaser.Geom.Point,
    p2: Phaser.Geom.Point,
    p3: Phaser.Geom.Point
  ): Phaser.Geom.Point {
    let A1 = p1.y - p0.y;
    let B1 = p0.x - p1.x;
    let C1 = A1 * p0.x + B1 * p0.y;
    let A2 = p3.y - p2.y;
    let B2 = p2.x - p3.x;
    let C2 = A2 * p2.x + B2 * p2.y;

    let denominator = A1 * B2 - A2 * B1;

    // lines are parallel or collinear
    // A's and B's are the same, because they both have the same slope
    if (denominator === 0) {
      return null;
    }

    let intersectX = (B2 * C1 - B1 * C2) / denominator;
    let intersectY = (A1 * C2 - A2 * C1) / denominator;

    // We take the distance between the intersection and the starting point of the line
    // and divide it by the total distance on the x-axis. We do this for both line segments.
    let rx0 = (intersectX - p0.x) / (p1.x - p0.x);
    let ry0 = (intersectY - p0.y) / (p1.y - p0.y);
    let rx1 = (intersectX - p2.x) / (p3.x - p2.x);
    let ry1 = (intersectY - p2.y) / (p3.y - p2.y);

    // Difference to normal segment intersection is that the ray can be > 1
    if (
      (rx0 >= 0 || ry0 >= 0) &&
      ((rx1 >= 0 && rx1 <= 1) || (ry1 >= 0 && ry1 <= 1))
    ) {
      return new Phaser.Geom.Point(intersectX, intersectY);
    } else {
      return null;
    }
  }
}
