/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 Digitsensitive
 * @description  Space Invaders: Player
 * @license      Digitsensitive
 */

import { Bullet } from "./bullet";

export class Player extends Phaser.GameObjects.Image {
  private bullets: Phaser.GameObjects.Group;
  private currentScene: Phaser.Scene;
  private cursors: CursorKeys;
  private flyingSpeed: number;
  private lastShoot: number;
  private shootingKey: Phaser.Input.Keyboard.Key;
  public getBullets(): Phaser.GameObjects.Group {
    return this.bullets;
  }

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
    this.bullets = this.currentScene.add.group({
      runChildUpdate: true
    });
    this.lastShoot = 0;
    this.flyingSpeed = 100;
  }

  private initImage(): void {
    this.setOrigin(0.5, 0.5);
  }

  private initInput(): void {
    this.cursors = this.currentScene.input.keyboard.createCursorKeys();
    this.shootingKey = this.currentScene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
  }

  private initPhysics(): void {
    this.currentScene.physics.world.enable(this);
    this.body.setSize(13, 8);
  }

  update(): void {
    this.handleFlying();
    this.handleShooting();
  }

  private handleFlying(): void {
    if (
      this.cursors.right.isDown &&
      this.x < this.currentScene.sys.canvas.width - this.width / 2
    ) {
      this.body.setVelocityX(this.flyingSpeed);
    } else if (this.cursors.left.isDown && this.x > this.width / 2) {
      this.body.setVelocityX(-this.flyingSpeed);
    } else {
      this.body.setVelocityX(0);
    }
  }

  private handleShooting(): void {
    if (
      this.shootingKey.isDown &&
      this.currentScene.time.now > this.lastShoot
    ) {
      if (this.bullets.getLength() < 1) {
        this.bullets.add(
          new Bullet({
            scene: this.currentScene,
            x: this.x,
            y: this.y - this.height,
            key: "bullet",
            bulletProperties: {
              speed: -300
            }
          })
        );

        this.lastShoot = this.currentScene.time.now + 500;
      }
    }
  }

  public gotHurt() {
    // update lives
    let currentLives = this.currentScene.registry.get("lives");
    this.currentScene.registry.set("lives", currentLives - 1);
    this.currentScene.events.emit("livesChanged");

    // reset position
    this.x = this.currentScene.sys.canvas.width / 2;
    this.y = this.currentScene.sys.canvas.height - 40;
  }
}
