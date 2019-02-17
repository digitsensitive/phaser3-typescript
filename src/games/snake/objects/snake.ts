/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 - 2019 digitsensitive
 * @description  Snake: Snake
 * @license      Digitsensitive
 */

export class Snake {
  private dotSize: number;
  private snakeLength: number;
  private direction: string;
  private cursors: any;
  private dead: boolean;
  private snakeBody: Phaser.GameObjects.Graphics[];

  public isDead(): boolean {
    return this.dead;
  }
  public setDead(_dead): void {
    this.dead = _dead;
  }
  public getSnakeBody(): Phaser.GameObjects.Graphics[] {
    return this.snakeBody;
  }
  public getHead(): Phaser.GameObjects.Graphics {
    return this.snakeBody[0];
  }
  public getSnakeLength(): number {
    return this.snakeLength;
  }

  constructor(scene) {
    // set variables
    this.dotSize = scene.fieldSize;
    this.snakeLength = 0;
    this.direction = "right";
    this.dead = false;
    this.snakeBody = [];

    // input
    this.cursors = scene.input.keyboard.createCursorKeys();

    // build snake
    this.buildSnake(scene);
  }

  private buildSnake(scene): void {
    let currentAlpha = 0;
    for (let i = 0; i <= this.snakeLength; i++) {
      if (i === 0) {
        currentAlpha = 1;
      } else {
        currentAlpha = 0.8;
      }

      this.snakeBody[i] = scene.add
        .graphics({
          x: 16 - i * this.dotSize,
          y: 16,
          fillStyle: { color: "0x61e85b", alpha: currentAlpha }
        })
        .fillRect(this.dotSize, this.dotSize, this.dotSize, this.dotSize);
    }
  }

  public move(): void {
    // move body
    for (let i = this.snakeLength; i > 0; i--) {
      this.snakeBody[i].x = this.snakeBody[i - 1].x;
      this.snakeBody[i].y = this.snakeBody[i - 1].y;
    }

    // move head
    if (this.direction === "left") {
      this.snakeBody[0].x -= this.dotSize;
    } else if (this.direction === "right") {
      this.snakeBody[0].x += this.dotSize;
    } else if (this.direction === "up") {
      this.snakeBody[0].y -= this.dotSize;
    } else if (this.direction === "down") {
      this.snakeBody[0].y += this.dotSize;
    }
  }

  public handleInput(): void {
    if (this.cursors.up.isDown && this.direction != "down") {
      this.direction = "up";
    } else if (this.cursors.down.isDown && this.direction != "up") {
      this.direction = "down";
    } else if (this.cursors.right.isDown && this.direction != "left") {
      this.direction = "right";
    } else if (this.cursors.left.isDown && this.direction != "right") {
      this.direction = "left";
    }
  }

  public growSnake(scene): void {
    this.snakeLength++;
    this.snakeBody[this.snakeBody.length] = scene.add
      .graphics({
        x: this.snakeBody[this.snakeBody.length - 1].x,
        y: this.snakeBody[this.snakeBody.length - 1].y,
        fillStyle: { color: "0x61e85b", alpha: 0.8 }
      })
      .fillRect(this.dotSize, this.dotSize, this.dotSize, this.dotSize);
  }

  public checkSnakeSnakeCollision(): void {
    for (let i = this.snakeLength; i > 0; i--) {
      if (
        this.snakeLength > 1 &&
        this.snakeBody[0].x === this.snakeBody[i].x &&
        this.snakeBody[0].y === this.snakeBody[i].y
      ) {
        this.dead = true;
      }
    }
  }
}
