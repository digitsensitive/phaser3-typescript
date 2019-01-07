/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2019 Digitsensitive
 * @description  Tank: Player Tank
 * @license      Digitsensitive
 */

export class Tank extends Phaser.GameObjects.Image {
  private currentScene: Phaser.Scene;
  private cursors: Phaser.Input.Keyboard.CursorKeys;
  private speed: number;

  constructor(params) {
    super(params.scene, params.x, params.y, params.key, params.frame);

    this.currentScene = params.scene;
    this.initImage();
    this.currentScene.add.existing(this);
  }

  private initImage() {
    // variables
    this.speed = 100;

    // image
    this.setOrigin(0.5, 0.5);

    // input
    this.cursors = this.currentScene.input.keyboard.createCursorKeys();

    // physics
    this.currentScene.physics.world.enable(this);
    /*this.body.setDrag(0.2);
    this.body.maxVelocity.setTo(400, 400);*/
  }

  update(): void {
    this.handleInput();
  }

  private handleInput() {
    // move tank forward
    // small corrections with (- MATH.PI / 2) to align tank correctly
    if (this.cursors.up.isDown) {
      this.currentScene.physics.velocityFromRotation(
        this.rotation - Math.PI / 2,
        this.speed,
        this.body.velocity
      );
    } else {
      this.body.setVelocity(0, 0);
    }

    // rotate tank
    if (this.cursors.left.isDown) {
      this.rotation -= 0.02;
    } else if (this.cursors.right.isDown) {
      this.rotation += 0.02;
    }
  }
}
