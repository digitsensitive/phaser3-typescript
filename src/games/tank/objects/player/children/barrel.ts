/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2019 Digitsensitive
 * @description  Tank: Player Barrel
 * @license      Digitsensitive
 */

export class Barrel extends Phaser.GameObjects.Image {
  private currentScene: Phaser.Scene;
  private rotateKeyLeft: Phaser.Input.Keyboard.Key;
  private rotateKeyRight: Phaser.Input.Keyboard.Key;

  constructor(params) {
    super(params.scene, params.x, params.y, params.key, params.frame);

    this.currentScene = params.scene;
    this.initImage();
    this.currentScene.add.existing(this);
  }

  private initImage() {
    // variables

    // image
    this.setOrigin(0.5, 1);

    // input
    this.rotateKeyLeft = this.currentScene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.A
    );
    this.rotateKeyRight = this.currentScene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.D
    );

    // physics
  }

  update(): void {
    this.handleInput();
  }

  private handleInput() {
    if (this.rotateKeyLeft.isDown) {
      this.rotation -= 0.05;
    } else if (this.rotateKeyRight.isDown) {
      this.rotation += 0.05;
    }
  }
}
