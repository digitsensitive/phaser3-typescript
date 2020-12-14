/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2019 - 2020 Digitsensitive
 * @description  Draw: Sprite Class
 * @license      {@link https://github.com/digitsensitive/phaser3-typescript/blob/master/LICENSE.md | MIT License}
 */

import { Point } from "./point";

export class Sprite extends Phaser.GameObjects.Graphics {
  private id: number;
  private points: Point[][];
  private size: number;

  scene: Phaser.Scene;

  constructor(
    scene: Phaser.Scene,
    id: number,
    defaultColor: number,
    size: number
  ) {
    super(scene);
    this.id = id;
    this.scene = scene;
    this.size = size;
    this.points = [];
    for (let y = 0; y < this.size; y++) {
      this.points[y] = [];
      for (let x = 0; x < this.size; x++) {
        this.points[y][x] = new Point(x, y, defaultColor);
      }
    }

    this.draw();
    this.scene.add.existing(this);
  }

  public draw(): void {
    for (let y = 0; y < this.size; y++) {
      for (let x = 0; x < this.size; x++) {
        this.fillStyle(this.points[y][x].getColor(), 1);
        this.fillPoint(
          this.points[y][x].getPosition().x,
          this.points[y][x].getPosition().y
        );
      }
    }
  }

  public changePointColor(x: number, y: number, color: number): void {
    this.points[y][x].setColor(color);
    this.updatePoint(x, y);
  }

  public updatePoint(x: number, y: number): void {
    this.fillStyle(this.points[y][x].getColor(), 1);
    this.fillPoint(
      this.points[y][x].getPosition().x,
      this.points[y][x].getPosition().y
    );
  }

  public getPoints(): Point[][] {
    return this.points;
  }

  public getPoint(x: number, y: number): Point {
    return this.points[y][x];
  }

  public createTexture(): void {
    this.generateTexture(this.id.toString());
  }
}
