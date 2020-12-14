/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2019 - 2020 Digitsensitive
 * @description  Flight: Player
 * @license      {@link https://github.com/digitsensitive/phaser3-typescript/blob/master/LICENSE.md | MIT License}
 */

import { Bullet } from "./bullet";

export class Player extends Phaser.GameObjects.Sprite {
  // variables
  private velocityChange: number;
  private maxSpeed: number;
  private bullets: Phaser.GameObjects.Group;
  private lastShoot: number;

  // input
  private keys: Map<string, Phaser.Input.Keyboard.Key>;

  public getKeys(): Map<string, Phaser.Input.Keyboard.Key> {
    return this.keys;
  }

  constructor(params) {
    super(params.scene, params.x, params.y, params.key, params.frame);

    this.initVariables();
    this.initSprite();
    this.initPhysics();
    params.scene.add.existing(this);
  }

  private initVariables() {
    this.bullets = this.scene.add.group({
      runChildUpdate: true
    });
    this.lastShoot = 0;
    this.velocityChange = 5;
    this.maxSpeed = 100;
  }

  private initSprite() {
    // sprite
    this.setOrigin(0, 0);

    // input
    this.keys = new Map([
      ["LEFT", this.addKey("LEFT")],
      ["RIGHT", this.addKey("RIGHT")],
      ["DOWN", this.addKey("DOWN")],
      ["UP", this.addKey("UP")],
      ["SHOOT", this.addKey("S")]
    ]);
  }

  private initPhysics() {
    // enable physics
    this.scene.physics.world.enable(this);

    // set physics values
    this.body.setMaxSpeed(this.maxSpeed);
  }

  private addKey(key: string): Phaser.Input.Keyboard.Key {
    return this.scene.input.keyboard.addKey(key);
  }

  update(): void {
    this.checkBorder();
    this.handleInput();
    this.handleAnimations();
    this.handleShooting();
  }

  private checkBorder() {
    if (this.x < 0 || this.x > this.scene.sys.canvas.width) {
      this.body.velocity.x = 0;
    }
  }

  private handleInput() {
    // handle movements left and right
    if (this.keys.get("LEFT").isDown) {
      this.body.velocity.x -= this.velocityChange;
    } else if (this.keys.get("RIGHT").isDown) {
      this.body.velocity.x += this.velocityChange;
    } else {
      if (Math.abs(this.body.velocity.x) > 0.5) {
        this.body.velocity.x *= 0.8;
      } else {
        this.body.velocity.x = 0;
      }
    }

    // handle movements up an down
    if (this.keys.get("UP").isDown) {
      this.body.velocity.y -= this.velocityChange;
    } else if (this.keys.get("DOWN").isDown) {
      this.body.velocity.y += this.velocityChange;
    } else {
      this.body.velocity.y *= 0.95;
    }
  }

  private handleAnimations(): void {
    if (Math.abs(this.body.velocity.x) > 0) {
      this.setFlipX(false);
      if (this.body.velocity.x > 0) {
        this.setFlipX(true);
      }
      this.anims.play("playerTurn", true);
    } else {
      this.anims.play("playerFly", true);
    }
  }

  private handleShooting(): void {
    if (this.keys.get("SHOOT").isDown && this.scene.time.now > this.lastShoot) {
      if (this.bullets.getLength() < 1) {
        this.bullets.add(
          new Bullet({
            scene: this.scene,
            x: this.x + this.width - 10,
            y: this.y,
            key: "bullet",
            bulletProperties: {
              speed: -800
            }
          })
        );
        this.bullets.add(
          new Bullet({
            scene: this.scene,
            x: this.x + 10,
            y: this.y,
            key: "bullet",
            bulletProperties: {
              speed: -800
            }
          })
        );

        this.lastShoot = this.scene.time.now;
      }
    }
  }
}
