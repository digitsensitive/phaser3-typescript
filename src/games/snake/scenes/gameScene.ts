/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 - 2019 digitsensitive
 * @description  Snake: Game Scene
 * @license      Digitsensitive
 */

import { Apple } from "../objects/apple";
import { Snake } from "../objects/snake";
import { CONST } from "../const/const";

export class GameScene extends Phaser.Scene {
  // field and game setting
  private fieldSize: number;
  private gameHeight: number;
  private gameWidth: number;
  private boardWidth: number;
  private boardHeight: number;
  private horizontalFields: number;
  private verticalFields: number;
  private tick: number;

  // objects
  private player: Snake;
  private apple: Apple;
  private gameBorder: Phaser.GameObjects.Graphics[];

  // texts
  private scoreText: Phaser.GameObjects.BitmapText;

  constructor() {
    super({
      key: "GameScene"
    });
  }

  init(): void {
    this.fieldSize = 8;
    this.gameHeight = this.sys.canvas.height;
    this.gameWidth = this.sys.canvas.width;
    this.boardWidth = this.gameWidth - 2 * this.fieldSize;
    this.boardHeight = this.gameHeight - 2 * this.fieldSize;
    this.horizontalFields = this.boardWidth / this.fieldSize;
    this.verticalFields = this.boardHeight / this.fieldSize;
    this.tick = 0;
  }

  create(): void {
    // objects
    this.gameBorder = [];
    let i = 0;
    for (let x = 0; x < this.gameWidth / this.fieldSize; x++) {
      for (let y = 0; y < this.gameHeight / this.fieldSize; y++) {
        if (
          y === 0 ||
          y === this.gameHeight / this.fieldSize - 1 ||
          x === 0 ||
          x === this.gameWidth / this.fieldSize - 1
        ) {
          this.gameBorder[i] = this.add
            .graphics({
              x: -this.fieldSize + x * this.fieldSize,
              y: -this.fieldSize + y * this.fieldSize,
              fillStyle: { color: 0x61e85b, alpha: 0.3 }
            })
            .fillRect(
              this.fieldSize,
              this.fieldSize,
              this.fieldSize,
              this.fieldSize
            );
          i++;
        }
      }
    }

    this.player = new Snake(this);
    this.apple = new Apple(this, {
      xPos: this.rndXPos(),
      yPos: this.rndYPos(),
      fSize: this.fieldSize
    });

    // text
    this.scoreText = this.add.bitmapText(
      this.gameWidth / 2,
      1,
      "snakeFont",
      "" + CONST.SCORE,
      8
    );
  }

  update(time): void {
    if (this.tick === 0) {
      this.tick = time;
    }
    if (!this.player.isDead()) {
      if (time - this.tick > 100) {
        this.player.move();
        this.checkCollision();
        this.tick = time;
      }
      this.player.handleInput();
    } else {
      this.scene.start("MainMenuScene");
    }
  }

  private checkCollision(): void {
    const { x: headX, y: headY } = this.player.getHead();

    // player vs. apple collision
    if (headX === this.apple.x && headY === this.apple.y) {
      this.player.growSnake(this);
      CONST.SCORE++;
      this.scoreText.setText('' + CONST.SCORE);
      this.apple.newApplePosition(this.rndXPos(), this.rndYPos());
    }

    // border vs. snake collision
    for (const { x, y } of this.gameBorder) {
      if (headX === x && headY === y) {
        this.player.setDead(true);
      }
    }

    // snake vs. snake collision
    this.player.checkSnakeSnakeCollision();
  }

  private rndXPos(): number {
    return (
      Phaser.Math.RND.between(1, this.horizontalFields - 1) * this.fieldSize
    );
  }

  private rndYPos(): number {
    return Phaser.Math.RND.between(1, this.verticalFields - 1) * this.fieldSize;
  }
}
