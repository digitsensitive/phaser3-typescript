/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2019 Digitsensitive
 * @description  Super Mario Land: Mario
 * @license      Digitsensitive
 */

export class Mario extends Phaser.GameObjects.Sprite {
  // variables
  private currentScene: Phaser.Scene;
  private marioSize: string;

  // input
  private cursors: Phaser.Input.Keyboard.CursorKeys;
  private jumpKey: Phaser.Input.Keyboard.Key;

  constructor(params) {
    super(params.scene, params.x, params.y, params.key, params.frame);

    this.currentScene = params.scene;
    this.initSprite();
    this.currentScene.add.existing(this);
  }

  private initSprite() {
    // variables
    this.marioSize = "small";

    // sprite
    this.setOrigin(0.5, 0.5);
    this.setFlipX(false);

    // input
    this.cursors = this.currentScene.input.keyboard.createCursorKeys();
    this.jumpKey = this.currentScene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );

    // physics
    this.currentScene.physics.world.enable(this);
    this.body.setSize(10, 16);
  }

  update(): void {
    this.handleInput();
  }

  private handleInput() {
    // handle movements to left and right
    if (this.cursors.right.isDown) {
      this.body.setVelocityX(80);
      this.setFlipX(false);
      this.anims.play(this.marioSize + "MarioWalk", true);
    } else if (this.cursors.left.isDown) {
      this.body.setVelocityX(-80);
      this.setFlipX(true);
    } else {
      this.body.setVelocity(0, 0);
      this.anims.stop();
    }

    // handle jumping
    if (this.jumpKey.isDown) {
      this.body.setVelocityY(-200);
    }
  }
}
