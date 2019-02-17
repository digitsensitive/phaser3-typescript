/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 - 2019 digitsensitive
 * @description  Blockade: Player One
 * @license      Digitsensitive
 */

export class Player {
  private cursors: any;
  private direction: string;
  private snakeHead: Phaser.GameObjects.Image;
  private snakeBody: Phaser.GameObjects.Image[] = [];
  private movingSpeed: number = 8;
  private dead: boolean;
  private currentFrame: number;
  private flipX: boolean;
  private flipY: boolean;
  private lastPositionX: number;
  private lastPositionY: number;

  public setDead(_dead): void {
    this.dead = _dead;
  }

  public isDead(): boolean {
    return this.dead;
  }

  public getHead(): Phaser.GameObjects.Image {
    return this.snakeHead;
  }

  public getBody(): Phaser.GameObjects.Image[] {
    return this.snakeBody;
  }

  constructor(scene, _x, _y, _direction) {
    this.snakeHead = scene.add
      .image(_x, _y, "player")
      .setOrigin(0.5, 0.5)
      .setFrame(3);

    // varibles
    this.direction = _direction;
    this.currentFrame = 1;
    this.flipX = false;
    this.flipY = false;

    // input
    this.cursors = scene.input.keyboard.createCursorKeys();
  }

  public move(): void {
    this.lastPositionX = this.snakeHead.x;
    this.lastPositionY = this.snakeHead.y;

    if (this.direction === "left") {
      this.snakeHead.x -= this.movingSpeed;
      this.snakeHead.setFlipX(true);
      this.snakeHead.setAngle(0);
    } else if (this.direction === "right") {
      this.snakeHead.x += this.movingSpeed;
      this.snakeHead.setFlipX(false);
      this.snakeHead.setAngle(0);
    } else if (this.direction === "up") {
      this.snakeHead.y -= this.movingSpeed;
      this.snakeHead.setFlipX(false);
      this.snakeHead.setAngle(-90);
    } else if (this.direction === "down") {
      this.snakeHead.y += this.movingSpeed;
      this.snakeHead.setFlipX(false);
      this.snakeHead.setAngle(90);
    }
  }

  public handleInput(): void {
    if (this.cursors.up.isDown && this.direction != "down") {
      this.direction = "up";
      this.currentFrame = 0;
      this.flipX = false;
      this.flipY = false;
    } else if (this.cursors.down.isDown && this.direction != "up") {
      this.direction = "down";
      this.currentFrame = 0;
      this.flipX = false;
      this.flipY = true;
    } else if (this.cursors.right.isDown && this.direction != "left") {
      this.direction = "right";
      this.currentFrame = 1;
      this.flipX = false;
      this.flipY = false;
    } else if (this.cursors.left.isDown && this.direction != "right") {
      this.direction = "left";
      this.currentFrame = 1;
      this.flipX = true;
      this.flipY = false;
    }
  }

  public grow(scene): void {
    this.snakeBody.push(
      scene.add
        .image(this.lastPositionX, this.lastPositionY, "player")
        .setOrigin(0.5, 0.5)
        .setFrame(this.currentFrame)
        .setFlipX(this.flipX)
        .setFlipY(this.flipY)
    );
  }
}
