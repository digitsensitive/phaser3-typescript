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
  private acceleration: number;
  private isJumping: boolean;

  // input
  private keys: Map<string, Phaser.Input.Keyboard.Key>;

  constructor(params) {
    super(params.scene, params.x, params.y, params.key, params.frame);

    this.currentScene = params.scene;
    this.initSprite();
    this.currentScene.add.existing(this);
  }

  private initSprite() {
    // variables
    this.marioSize = "small";
    this.acceleration = 500;
    this.isJumping = false;

    // sprite
    this.setOrigin(0.5, 0.5);
    this.setFlipX(false);

    // input
    this.keys = new Map([
      [
        "LEFT",
        this.currentScene.input.keyboard.addKey(
          Phaser.Input.Keyboard.KeyCodes.LEFT
        )
      ],
      [
        "RIGHT",
        this.currentScene.input.keyboard.addKey(
          Phaser.Input.Keyboard.KeyCodes.RIGHT
        )
      ],
      [
        "DOWN",
        this.currentScene.input.keyboard.addKey(
          Phaser.Input.Keyboard.KeyCodes.DOWN
        )
      ],
      [
        "JUMP",
        this.currentScene.input.keyboard.addKey(
          Phaser.Input.Keyboard.KeyCodes.SPACE
        )
      ]
    ]);

    // physics
    this.currentScene.physics.world.enable(this);
    this.body.setSize(7, 15);
    this.body.maxVelocity.x = 50;
    this.body.maxVelocity.y = 180;
  }

  update(): void {
    this.handleInput();
  }

  private handleInput() {
    // evaluate if player is on the floor
    // if not on the floor, set the player to be jumping
    if (this.body.onFloor()) {
      this.isJumping = false;
    } else {
      this.isJumping = true;
    }

    // handle movements to left and right
    if (this.keys.get("RIGHT").isDown) {
      this.body.setAccelerationX(this.acceleration);
      this.setFlipX(false);
      if (!this.isJumping) {
        this.anims.play(this.marioSize + "MarioWalk", true);
      }
    } else if (this.keys.get("LEFT").isDown) {
      this.body.setAccelerationX(-this.acceleration);
      this.setFlipX(true);
      if (!this.isJumping) {
        this.anims.play(this.marioSize + "MarioWalk", true);
      }
    } else {
      this.body.setVelocityX(0);
      this.body.setAccelerationX(0);
      this.anims.stop();
      if (!this.isJumping) {
        this.setFrame(0);
      }
    }

    // handle jumping
    if (this.keys.get("JUMP").isDown && !this.isJumping) {
      this.body.setVelocityY(-180);
      this.anims.stop();
      this.setFrame(4);
    }
  }
}
