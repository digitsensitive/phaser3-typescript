/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2020 Digitsensitive
 * @description  Blocks: Game Scene
 * @license      Digitsensitive
 */

import * as _ from "lodash";

import { Block } from "../objects/block";
import { Cursor } from "../objects/cursor";
import { CONST } from "../const/const";

export class GameScene extends Phaser.Scene {
  // Variables
  private currentLevel: number[][];
  private canMove: boolean;

  // Input
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  private actionKey: Phaser.Input.Keyboard.Key;

  // Game objects
  private cursor: Cursor;
  private blocks: Block[][];

  constructor() {
    super({
      key: "GameScene"
    });
  }

  init(): void {
    // Get the two dimensional array of the level
    this.currentLevel = CONST.levels[CONST.currentLevel].data;
    this.canMove = true;

    // Init input
    this.cursors = this.input.keyboard.createCursorKeys();
    this.actionKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
  }

  create(): void {
    // Create level map blocks
    this.blocks = [];
    for (let y = 0; y < this.currentLevel.length; y++) {
      this.blocks[y] = [];
      for (let x = 0; x < this.currentLevel[y].length; x++) {
        if (this.currentLevel[y][x] !== 0) {
          this.blocks[y][x] = new Block({
            scene: this,
            x: x * CONST.tileSize,
            y: y * CONST.tileSize,
            key: "block",
            type: this.currentLevel[y][x]
          });
        }
      }
    }

    // Create our game cursor
    this.cursor = new Cursor({
      scene: this,
      x: CONST.levels[CONST.currentLevel].cursorStart[0] * CONST.tileSize,
      y: CONST.levels[CONST.currentLevel].cursorStart[1] * CONST.tileSize,
      key: "cursor",
      cursorStartPosition: CONST.levels[CONST.currentLevel].cursorStart
    });
  }

  update(): void {
    if (this.canMove) {
      this.handleInput();
    } else {
      //checkMovingDown();
    }
  }

  private handleInput(): void {
    let oldX = this.cursor.getX();
    let oldY = this.cursor.getY();
    let dx = 0;
    let dy = 0;

    if (Phaser.Input.Keyboard.JustDown(this.cursors.right)) {
      dx = 1;
    } else if (Phaser.Input.Keyboard.JustDown(this.cursors.left)) {
      dx = -1;
    }

    if (!this.cursor.isActivated()) {
      if (Phaser.Input.Keyboard.JustDown(this.cursors.up)) {
        dy = -1;
      } else if (Phaser.Input.Keyboard.JustDown(this.cursors.down)) {
        dy = 1;
      }
    }

    if (dx !== 0 || dy !== 0) {
      let newX = oldX + dx;
      let newY = oldY + dy;

      if (this.currentLevel[newY][newX] !== 1) {
        this.cursor.moveTo(newX, newY);
      }

      if (this.cursor.isActivated()) {
        this.blocks[oldY][oldX].moveTo(newX, newY);
        this.currentLevel[oldY][oldX] === 0;
        this.currentLevel[newY][newX] === this.blocks[oldY][oldX].getType();
        //this.canMove = false;
      }
    }

    if (Phaser.Input.Keyboard.JustDown(this.actionKey)) {
      if (this.currentLevel[this.cursor.getY()][this.cursor.getX()] !== 0) {
        this.cursor.setActivated();
      }
    }
  }
}
