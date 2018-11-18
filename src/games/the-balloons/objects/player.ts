/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 Digitsensitive
 * @description  The Balloons: Player
 * @license      Digitsensitive
 */

export class Player extends Phaser.GameObjects.Image {
  private currentScene: Phaser.Scene;
  private cursors: CursorKeys;
  private flyKey: Phaser.Input.Keyboard.Key;

  constructor(params) {
    super(params.scene, params.x, params.y, params.key);

    this.initVariables(params);
    this.initImage();
    this.initInput();
    this.initPhysics();

    this.currentScene.add.existing(this);
  }

  private initVariables(params): void {
    this.currentScene = params.scene;
  }

  private initImage(): void {
    this.setOrigin(0.5, 0.5);
  }

  private initInput(): void {
    this.cursors = this.currentScene.input.keyboard.createCursorKeys();
    this.flyKey = this.currentScene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
  }

  private initPhysics(): void {
    this.currentScene.physics.world.enable(this);
    this.body.setSize(15, 24);
  }

  update(): void {
    this.handleInput();
  }

  private handleInput(): void {
    // check if flying key is pressed
    if (this.flyKey.isDown) {
      this.body.setVelocityY(-60);
    }

    // check direction keys
    if (this.cursors.right.isDown) {
      this.x += 1;
      this.flipX = true;
    } else if (this.cursors.left.isDown) {
      this.x -= 1;
      this.flipX = false;
    }
  }
}
