/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2020 digitsensitive
 * @description  Point in Polygon: Game Scene
 *
 * In computational geometry, the point-in-polygon (PIP) problem asks whether a
 * given point in the plane lies inside, outside, or on the boundary of a polygon.
 *
 * An early description of the problem in computer graphics shows two common approaches
 * (ray casting and angle summation) in use as early as 1974.
 *
 * In this example we use the ray casting approach.
 * We simply count how often the point hits a side of the polygon.
 * If the number of hits is even, it's outside of the polygon,
 * if it's odd, it's inside.
 *
 * Ressources:
 *
 * Point in polygon (Wikipedia):
 * https://en.wikipedia.org/wiki/Point_in_polygon
 *
 * Stackoverflow:
 * https://stackoverflow.com/questions/217578/how-can-i-determine-whether-a-2d-point-is-within-a-polygon
 *
 * Collision Detection (Jeffrey Thompson):
 * http://www.jeffreythompson.org/collision-detection/line-point.php
 *
 * @license      Digitsensitive
 */

import { Ray } from "../objects/ray";
import { PointLineCollision } from "../services/collisions.service";

const LINE_SEGMENTS = [
  { a: { x: 150, y: 80 }, b: { x: 480, y: 280 }, active: true },
  { a: { x: 480, y: 280 }, b: { x: 520, y: 320 }, active: true },
  { a: { x: 520, y: 320 }, b: { x: 240, y: 320 }, active: true },
  { a: { x: 240, y: 320 }, b: { x: 150, y: 80 }, active: true }
];

export class GameScene extends Phaser.Scene {
  // Variables
  private endPoint: Phaser.Math.Vector2;
  private startPoint: Phaser.Math.Vector2;
  private counter: number;

  // Game objects
  private polygonGraphics: Phaser.GameObjects.Graphics;
  private polygonLines: Phaser.Geom.Line[];
  private ray: Ray;
  private counterText: Phaser.GameObjects.Text;

  constructor() {
    super({
      key: "GameScene"
    });
  }

  init(): void {
    // Variables
    this.startPoint = new Phaser.Math.Vector2(2, 2);
    this.endPoint = new Phaser.Math.Vector2(500, 300);
    this.counter = 0;

    // Game objects
    this.polygonGraphics = this.add.graphics();
    this.polygonLines = [];
    // Create lines for walls from predefined arrays
    for (let lineSegment of LINE_SEGMENTS) {
      this.polygonLines.push(
        new Phaser.Geom.Line(
          lineSegment.a.x,
          lineSegment.a.y,
          lineSegment.b.x,
          lineSegment.b.y
        )
      );
    }

    // Set the line style for the walls
    this.polygonGraphics.lineStyle(1, 0x00ff00);

    // Draw the walls on screen
    for (let w of this.polygonLines) {
      this.polygonGraphics.strokeLineShape(w);
    }

    this.counterText = this.add
      .text(
        10,
        10,
        "Count: " + this.counter.toString() + " (even, outside polygon)",
        {
          fontFamily: "Arial",
          fontSize: 20,
          stroke: "#ffffff",
          strokeThickness: 1,
          fill: "#ffffff"
        }
      )
      .setDepth(2);

    this.ray = new Ray({
      scene: this,
      options: {
        fillStyle: { color: 0xffffff, alpha: 1 },
        x: 20,
        y: 20,
        direction: new Phaser.Math.Vector2(
          this.endPoint.x - this.startPoint.x,
          this.endPoint.y - this.startPoint.y
        )
      }
    });
  }

  update(): void {
    // Update Ray
    let buffer = 1;
    if (
      this.ray.x >= this.endPoint.x - buffer &&
      this.ray.x <= this.endPoint.x + buffer &&
      this.ray.y >= this.endPoint.y - buffer &&
      this.ray.y <= this.endPoint.y + buffer
    ) {
    } else {
      this.ray.update();
    }

    // Check for collision
    for (let lineSegment of LINE_SEGMENTS) {
      if (!lineSegment.active) {
        continue;
      }
      if (
        PointLineCollision(
          lineSegment.a.x,
          lineSegment.a.y,
          lineSegment.b.x,
          lineSegment.b.y,
          this.ray.x,
          this.ray.y
        )
      ) {
        lineSegment.active = false;

        // Update counter and text
        this.counter++;

        if (this.counter % 2 === 0) {
          this.counterText.setText(
            "Count: " + this.counter.toString() + " (even, outside polygon)"
          );
        } else {
          this.counterText.setText(
            "Count: " + this.counter.toString() + " (odd, inside polygon)"
          );
        }
      }
    }
  }
}
