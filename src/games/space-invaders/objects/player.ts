/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 - 2019 digitsensitive
 * @description  Space Invaders: Player
 * @license      Digitsensitive
 */

import { Bullet } from "./bullet";

export class Player extends Phaser.GameObjects.Image {
  private bullets: Phaser.GameObjects.Group;
  private cursors: Phaser.Input.Keyboard.CursorKeys;
  private flyingSpeed: number;
  private lastShoot: number;
  private shootingKey: Phaser.Input.Keyboard.Key;
  public getBullets(): Phaser.GameObjects.Group {
    return this.bullets;
  }

  constructor(params) {
    super(params.scene, params.x, params.y, params.key);

    this.initVariables();
    this.initImage();
    this.initInput();
    this.initPhysics();

    this.scene.add.existing(this);
  }

  private initVariables(): void {
    this.bullets = this.scene.add.group({
      runChildUpdate: true
    });
    this.lastShoot = 0;
    this.flyingSpeed = 100;
  }

  private initImage(): void {
    this.setOrigin(0.5, 0.5);
  }

  private initInput(): void {
    this.cursors = this.scene.input.keyboard.createCursorKeys();
    this.shootingKey = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
  }

  private initPhysics(): void {
    this.scene.physics.world.enable(this);
    this.body.setSize(13, 8);
  }

  update(): void {
    this.handleFlying();
    this.handleShooting();
  }

  private handleFlying(): void {
    if (
      this.cursors.right.isDown &&
      this.x < this.scene.sys.canvas.width - this.width / 2
    ) {
      this.body.setVelocityX(this.flyingSpeed);
    } else if (this.cursors.left.isDown && this.x > this.width / 2) {
      this.body.setVelocityX(-this.flyingSpeed);
    } else {
      this.body.setVelocityX(0);
    }
  }

  private handleShooting(): void {
    if (this.shootingKey.isDown && this.scene.time.now > this.lastShoot) {
      if (this.bullets.getLength() < 1) {
        this.bullets.add(
          new Bullet({
            scene: this.scene,
            x: this.x,
            y: this.y - this.height,
            key: "bullet",
            bulletProperties: {
              speed: -300
            }
          })
        );

        this.lastShoot = this.scene.time.now + 500;
      }
    }
  }

  public gotHurt() {
    // update lives
    let currentLives = this.scene.registry.get("lives");
    this.scene.registry.set("lives", currentLives - 1);
    this.scene.events.emit("livesChanged");

    // reset position
    this.x = this.scene.sys.canvas.width / 2;
    this.y = this.scene.sys.canvas.height - 40;
  }
}
