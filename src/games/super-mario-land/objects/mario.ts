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
    this.handleAnimations();
  }

  private handleInput() {
    // evaluate if player is on the floor or on object
    // if neither of that, set the player to be jumping
    if (
      this.body.onFloor() ||
      this.body.touching.down ||
      this.body.blocked.down
    ) {
      this.isJumping = false;
      this.body.setVelocityY(0);
    }

    // handle movements to left and right
    if (this.keys.get("RIGHT").isDown) {
      this.body.setAccelerationX(this.acceleration);
      this.setFlipX(false);
    } else if (this.keys.get("LEFT").isDown) {
      this.body.setAccelerationX(-this.acceleration);
      this.setFlipX(true);
    } else {
      this.body.setVelocityX(0);
      this.body.setAccelerationX(0);
    }

    // handle jumping
    if (this.keys.get("JUMP").isDown && !this.isJumping) {
      this.body.setVelocityY(-180);
      this.isJumping = true;
    }
  }

  private handleAnimations(): void {
    if (this.body.velocity.y !== 0) {
      // mario is jumping or falling
      this.anims.stop();
      if (this.marioSize === "small") {
        this.setFrame(4);
      } else {
        this.setFrame(10);
      }
    } else if (this.body.velocity.x !== 0) {
      // mario is moving horizontal

      // check if mario is making a quick direction change
      if (
        (this.body.velocity.x < 0 && this.body.acceleration.x > 0) ||
        (this.body.velocity.x > 0 && this.body.acceleration.x < 0)
      ) {
        if (this.marioSize === "small") {
          this.setFrame(5);
        } else {
          this.setFrame(11);
        }
      }

      if (this.body.velocity.x > 0) {
        this.anims.play(this.marioSize + "MarioWalk", true);
      } else {
        this.anims.play(this.marioSize + "MarioWalk", true);
      }
    } else {
      // mario is standing still
      this.anims.stop();
      if (this.marioSize === "small") {
        this.setFrame(0);
      } else {
        if (this.keys.get("DOWN").isDown) {
          this.setFrame(13);
        } else {
          this.setFrame(6);
        }
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
