/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2019 - 2020 Digitsensitive
 * @description  Dare Devil Denis: Denis
 * @license      {@link https://github.com/digitsensitive/phaser3-typescript/blob/master/LICENSE.md | MIT License}
 */

export class Denis extends Phaser.GameObjects.Sprite {
  // variables
  private acceleration: number;
  private isJumping: boolean;
  private isDying: boolean;
  private isVulnerable: boolean;
  private vulnerableCounter: number;

  // input
  private keys: Map<string, Phaser.Input.Keyboard.Key>;

  public getKeys(): Map<string, Phaser.Input.Keyboard.Key> {
    return this.keys;
  }

  constructor(params) {
    super(params.scene, params.x, params.y, params.key, params.frame);

    this.initSprite();
    this.scene.add.existing(this);
  }

  private initSprite() {
    // variables
    this.acceleration = 500;
    this.isJumping = false;
    this.isDying = false;
    this.isVulnerable = true;
    this.vulnerableCounter = 100;

    // sprite
    this.setOrigin(0.5, 0.5);
    this.setFlipX(false);
    this.setScale(2);

    // input
    this.keys = new Map([
      ["RIGHT", this.addKey("RIGHT")],
      ["JUMP", this.addKey("SPACE")]
    ]);

    // physics
    this.scene.physics.world.enable(this);
    this.body.setSize(37, 26);
    this.body.maxVelocity.x = 300;
    this.body.maxVelocity.y = 300;
  }

  private addKey(key: string): Phaser.Input.Keyboard.Key {
    return this.scene.input.keyboard.addKey(key);
  }

  update(): void {
    if (!this.isDying) {
      this.handleInput();
      this.handleAnimations();
    }

    if (this.x > this.scene.sys.canvas.width) {
      this.x = 40;
      this.y += 140;
    }
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
    }

    if (this.keys.get("RIGHT").isDown) {
      this.body.setAccelerationX(this.acceleration);
      this.setFlipX(false);
    } else {
      this.body.setVelocityX(0);
      this.body.setAccelerationX(0);
    }

    // handle jumping
    if (this.keys.get("JUMP").isDown && !this.isJumping) {
      this.body.setVelocityY(-250);
      this.isJumping = true;
    }
  }
  private handleAnimations(): void {
    if (this.body.velocity.y !== 0) {
      // denis is jumping or falling
      this.anims.stop();
    } else if (this.body.velocity.x !== 0) {
      // check if denis is making a quick direction change

      if (this.body.velocity.x > 0) {
        this.anims.play("denisWalk", true);
      }
    } else {
      // dario is standing still
      this.anims.stop();
    }
  }
}
