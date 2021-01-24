import { CONST } from '../const/const';
import { Block } from '../objects/block';
import { Cursor } from '../objects/cursor';

export class GameScene extends Phaser.Scene {
  private currentLevelArray: Block[] = [];
  private currentLevelWidth: number;
  private currentLevelHeight: number;
  private cursor: Cursor;

  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  private actionKey: Phaser.Input.Keyboard.Key;
  private activatedBlockId: number;

  constructor() {
    super({
      key: 'GameScene'
    });
  }

  init(): void {
    let tempLevel = CONST.levels[CONST.currentLevel];

    // set the width and height of the current level
    this.currentLevelWidth = tempLevel.width;
    this.currentLevelHeight = tempLevel.height;

    // loop through current level 2D-number-array and create a 1D-block-array
    for (let y = 0; y < this.currentLevelHeight; y++) {
      for (let x = 0; x < this.currentLevelWidth; x++) {
        let blockType = tempLevel.data[y][x];
        this.currentLevelArray.push(
          new Block({
            scene: this,
            x: x * CONST.tileSize,
            y: y * CONST.tileSize,
            texture: 'block',
            type: blockType
          })
        );
      }
    }

    this.cursors = this.input.keyboard.createCursorKeys();
    this.actionKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );

    this.cursor = new Cursor({
      scene: this,
      x: CONST.levels[CONST.currentLevel].cursorStart[0] * CONST.tileSize,
      y: CONST.levels[CONST.currentLevel].cursorStart[1] * CONST.tileSize,
      texture: 'cursor',
      cursorStartPosition: CONST.levels[CONST.currentLevel].cursorStart
    });
  }

  update(): void {
    for (let y = this.currentLevelHeight - 1; y >= 0; y--) {
      for (let x = this.currentLevelWidth - 1; x >= 0; x--) {
        let block = this.currentLevelArray[this.getBlockIndex(x, y)];

        if (block.getDead()) {
          block.update();
        } else {
          let upperBlock;
          if (y > 0) {
            upperBlock = this.currentLevelArray[this.getBlockIndex(x, y - 1)];
          } else {
            upperBlock = undefined;
          }
          if (block.getType() === 0 && upperBlock !== undefined) {
            if (upperBlock.getType() > 1) {
              this.swapTwoBlocks(
                this.getBlockIndex(x, y),
                this.getBlockIndex(x, y - 1)
              );
            }
          }
        }
      }
    }

    this.checkMatches();

    this.handleInput();
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

      if (this.getBlockType(newX, newY) !== 1) {
        this.cursor.moveTo(newX, newY);

        if (this.cursor.isActivated()) {
          this.swapTwoBlocks(
            this.getBlockIndex(oldX, oldY),
            this.getBlockIndex(newX, newY)
          );

          this.cursor.setActivated();
        }
      }
    }

    if (Phaser.Input.Keyboard.JustDown(this.actionKey)) {
      if (this.getBlockType(this.cursor.getX(), this.cursor.getY()) !== 0) {
        this.cursor.setActivated();
      }
    }
  }

  getBlock(x: number, y: number): Block {
    return this.currentLevelArray[y * this.currentLevelWidth + x];
  }

  getBlockIndex(x: number, y: number): number {
    return y * this.currentLevelWidth + x;
  }

  getBlockType(x: number, y: number): number {
    return this.currentLevelArray[y * this.currentLevelWidth + x].getType();
  }

  getBlockTypeById(id: number): number {
    return this.currentLevelArray[id].getType();
  }

  swapTwoBlocks(blockId0: number, blockId1: number): void {
    let type0 = this.getBlockTypeById(blockId0);
    let type1 = this.getBlockTypeById(blockId1);
    this.currentLevelArray[blockId0].setType(type1);
    this.currentLevelArray[blockId1].setType(type0);
  }

  public checkMatches(): void {
    let matches: number[] = [];

    for (let y = 1; y < this.currentLevelHeight - 1; y++) {
      for (let x = 1; x < this.currentLevelWidth - 1; x++) {
        if (this.getBlockType(x, y) > 1) {
          if (this.isSameTypeAroundMe(x, y)) {
            matches.push(this.getBlockIndex(x, y));
          }
        }
      }
    }

    for (let i = 0; i < matches.length; i++) {
      this.currentLevelArray[matches[i]].activateDead();
    }
  }

  public isSameTypeAroundMe(x: number, y: number): boolean {
    let me = this.getBlockType(x, y);

    let leftOfMe = this.getBlockType(x - 1, y);
    let rightOfMe = this.getBlockType(x + 1, y);
    let topOfMe = this.getBlockType(x, y - 1);
    let bottomOfMe = this.getBlockType(x, y + 1);
    if (
      me === leftOfMe ||
      me === rightOfMe ||
      me === topOfMe ||
      me === bottomOfMe
    ) {
      return true;
    }

    return false;
  }
}
