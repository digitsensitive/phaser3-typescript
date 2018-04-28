/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 Digitsensitive
 * @description  Coin Runner: Player
 * @license      Digitsensitive
 */

export class Player extends Phaser.GameObjects.Image {
  private cursors: any;
  private walkingSpeed: number = 5;

  constructor(params) {
    super(params.scene, params.x, params.y, params.key);

    this.initImage();
    this.initInput(params);

    params.scene.add.existing(this);
  }

  private initImage(): void {
    this.setScale(0.8);
    this.setSize(40, 50);
    this.setAlpha(1);
    this.setFlip(false, false);
    this.setOrigin(0.4, 0.4);
    this.setAngle(0);
  }
  private initInput(params): void {
    this.cursors = params.scene.input.keyboard.createCursorKeys();
  }

  update(): void {
    this.handleInput();
  }

  private handleInput(): void {
    if (this.cursors.right.isDown) {
      this.x += this.walkingSpeed;
      this.setFlipX(false);
    } else if (this.cursors.left.isDown) {
      this.x -= this.walkingSpeed;
      this.setFlipX(true);
    } else if (this.cursors.up.isDown) {
      this.y -= this.walkingSpeed;
    } else if (this.cursors.down.isDown) {
      this.y += this.walkingSpeed;
    }
  }
}
