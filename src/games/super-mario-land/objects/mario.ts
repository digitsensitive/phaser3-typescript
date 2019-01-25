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
      ["LEFT", this.addKey("LEFT")],
      ["RIGHT", this.addKey("RIGHT")],
      ["DOWN", this.addKey("DOWN")],
      ["JUMP", this.addKey("SPACE")]
    ]);

    // physics
    this.currentScene.physics.world.enable(this);
    this.adjustPhysicBodyToSmallSize();
    this.body.maxVelocity.x = 50;
    this.body.maxVelocity.y = 180;
  }

  private addKey(key: string): Phaser.Input.Keyboard.Key {
    return this.currentScene.input.keyboard.addKey(key);
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
    } else if (
      this.keys.get("DOWN").isDown &&
      !this.isJumping &&
      this.marioSize === "big"
    ) {
      this.body.setVelocityX(0);
      this.body.setAccelerationX(0);
      this.setFrame(13);
    } else {
      this.body.setVelocityX(0);
      this.body.setAccelerationX(0);
      this.anims.stop();
      if (!this.isJumping) {
        if (this.marioSize === "small") {
          this.setFrame(0);
        } else {
          this.setFrame(6);
        }
      }
    }

    // handle jumping
    if (this.keys.get("JUMP").isDown && !this.isJumping) {
      this.body.setVelocityY(-180);
      this.anims.stop();
      if (this.marioSize === "small") {
        this.setFrame(4);
      } else {
        this.setFrame(10);
      }
    }
  }

  private growMario(): void {
    this.marioSize = "big";
    this.adjustPhysicBodyToBigSize();
  }

  private shrinkMario(): void {
    this.marioSize = "small";
    this.adjustPhysicBodyToSmallSize();
  }

  private adjustPhysicBodyToSmallSize(): void {
    this.body.setSize(7, 12);
    this.body.setOffset(5, 4);
  }

  private adjustPhysicBodyToBigSize(): void {
    this.body.setSize(8, 16);
    this.body.setOffset(4, 0);
  }
}
