/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2020 digitsensitive
 * @description  Raycasting: Game Scene
 * @license      Digitsensitive
 */

import { RaycastingService } from "../services/raycasting/raycasting.service";

const LINE_SEGMENTS = [
  { a: { x: 10, y: 10 }, b: { x: 790, y: 10 } },
  { a: { x: 10, y: 10 }, b: { x: 10, y: 590 } },
  { a: { x: 790, y: 10 }, b: { x: 790, y: 590 } },
  { a: { x: 10, y: 590 }, b: { x: 790, y: 590 } },
  { a: { x: 400, y: 200 }, b: { x: 400, y: 400 } },
  { a: { x: 400, y: 400 }, b: { x: 520, y: 340 } },
  { a: { x: 520, y: 340 }, b: { x: 400, y: 200 } },
  { a: { x: 100, y: 100 }, b: { x: 200, y: 120 } },
  { a: { x: 200, y: 120 }, b: { x: 250, y: 20 } },
  { a: { x: 250, y: 20 }, b: { x: 100, y: 100 } },
  { a: { x: 600, y: 160 }, b: { x: 740, y: 130 } },
  { a: { x: 740, y: 130 }, b: { x: 690, y: 45 } },
  { a: { x: 690, y: 45 }, b: { x: 600, y: 160 } },
  { a: { x: 172, y: 395 }, b: { x: 288, y: 517 } },
  { a: { x: 288, y: 517 }, b: { x: 61, y: 546 } },
  { a: { x: 61, y: 546 }, b: { x: 172, y: 395 } }
];

export class GameScene extends Phaser.Scene {
  // Raycasting Service Instance
  private raycastingService: RaycastingService;

  // Graphics
  private rayGraphics: Phaser.GameObjects.Graphics;
  private wallGraphics: Phaser.GameObjects.Graphics;

  // Objects
  private walls: Phaser.Geom.Line[];

  constructor() {
    super({
      key: "GameScene"
    });
  }

  init(): void {
    this.raycastingService = new RaycastingService(
      new Phaser.Math.Vector2(100, 200),
      32
    );

    this.rayGraphics = this.add.graphics();
    this.wallGraphics = this.add.graphics();
    this.walls = [];
  }

  create(): void {
    // Create lines for walls from predefined arrays
    for (let lineSegment of LINE_SEGMENTS) {
      this.walls.push(
        new Phaser.Geom.Line(
          lineSegment.a.x,
          lineSegment.a.y,
          lineSegment.b.x,
          lineSegment.b.y
        )
      );
    }

    // Set the line style for the walls
    this.wallGraphics.lineStyle(1, 0x00ff00);

    // Draw the walls on screen
    for (let w of this.walls) {
      this.wallGraphics.strokeLineShape(w);
    }

    // Config mouse/pointer input on move
    this.input.on("pointermove", pointer => {
      this.raycastingService.setEyePosition(pointer.x, pointer.y);
    });
  }

  update(): void {
    // Clear command buffer and set line and fill styles
    this.rayGraphics.clear();
    this.rayGraphics.lineStyle(1, 0xffffff);
    this.rayGraphics.fillStyle(0xffffff, 1);

    // Get all the rays from the eye point
    for (let r of this.raycastingService.getRays()) {
      let closestIntersect = null;
      let rayLine: Phaser.Geom.Line = this.raycastingService.getRayLine(r);

      for (let w of this.walls) {
        let intersect = this.raycastingService.lineTolineIntersection(
          rayLine,
          w
        );

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

      rayLine.x2 = closestIntersect.x;
      rayLine.y2 = closestIntersect.y;

      // Draw the line
      this.rayGraphics.strokeLineShape(rayLine);
      this.rayGraphics.fillCircle(closestIntersect.x, closestIntersect.y, 4);
    }
  }
}
