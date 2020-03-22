/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2020 Digitsensitive
 * @description  Blocks: Game Scene
 * @license      Digitsensitive
 */

import { Block } from "../objects/block";

export class GameScene extends Phaser.Scene {
  private level: number[][] = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 1, 1],
    [1, 0, 0, 0, 0, 2, 0, 1, 1, 1],
    [1, 0, 0, 0, 0, 2, 0, 1, 1, 1],
    [1, 0, 0, 0, 2, 2, 2, 1, 1, 1],
    [1, 2, 0, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ];

  private currentLevel = {
    x: 0,
    y: 0,
    columns: 10,
    rows: 9,
    tileWidth: 16,
    tileHeight: 16,
    tiles: []
  };

  constructor() {
    super({
      key: "GameScene"
    });
  }

  init(): void {}

  create(): void {
    for (let y = 0; y < this.currentLevel.rows; y++) {
      this.currentLevel.tiles[y] = [];
      for (let x = 0; x < this.currentLevel.columns; x++) {
        if (this.level[y][x] !== 0) {
          this.currentLevel.tiles[y][x] = new Block({
            scene: this,
            x: x * 16,
            y: y * 16,
            key: "block",
            value: this.level[y][x]
          });
        }
      }
    }

    this.input.on("pointerdown", pointer => {
      if (this.checkIfClickable(pointer)) {
      }
    }),
      this;
  }

  update(): void {
    for (let y = 0; y < this.currentLevel.rows; y++) {
      for (let x = 0; x < this.currentLevel.columns; x++) {
        if (this.level[y][x] !== 0) {
          this.currentLevel.tiles[y][x].update();
        }
      }
    }
  }

  private checkIfClickable(pointerPosition): boolean {
    if (
      this.currentLevel.tiles[
        Math.round(pointerPosition.y / this.currentLevel.tileHeight)
      ][Math.round(pointerPosition.x / this.currentLevel.tileWidth)]
        .blockType >= 2
    ) {
      return true;
    } else {
      return false;
    }
  }
}
