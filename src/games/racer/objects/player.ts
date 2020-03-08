/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 Digitsensitive
 * @description  Racer: Player
 * @license      Digitsensitive
 */

export class Player extends Phaser.GameObjects.Sprite {
  private cursors: any;
  private drivingSpeed: number;

  constructor(params) {
    super(params.scene, params.x, params.y, params.key, params.frame);

    // varibles
    this.drivingSpeed = 5;

    // image
    this.setScale(3);
    this.setOrigin(0, 0);

    // physics
    params.scene.physics.world.enable(this);
    this.body.setSize(10, 20);

    // input
    this.cursors = params.scene.input.keyboard.createCursorKeys();

    params.scene.add.existing(this);
  }

  update(): void {
    this.handleInput();
  }

  private handleInput(): void {
    if (this.cursors.right.isDown) {
      this.x += this.drivingSpeed;
    } else if (this.cursors.left.isDown) {
      this.x -= this.drivingSpeed;
    }
  }
}
