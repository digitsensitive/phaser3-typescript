/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2019 - 2020 Digitsensitive
 * @description  Canyon Bomber: Player
 * @license      {@link https://github.com/digitsensitive/phaser3-typescript/blob/master/LICENSE.md | MIT License}
 */

import { Shoot } from "./shoot";

export class Player extends Phaser.GameObjects.Graphics {
  private width: number;
  private height: number;
  private speed: number;
  private isMovingRight: boolean;
  private shoot: Shoot;
  private color: number;
  private shootingKey: Phaser.Input.Keyboard.Key;

  constructor(params) {
    super(params.scene, params.options);

    // init graphics
    this.x = params.options.xPos;
    this.y = params.options.yPos;
    this.width = params.options.width;
    this.height = params.options.height;
    this.color = params.options.color;
    this.speed = 30;
    this.isMovingRight = params.options.movingRight;

    this.lineStyle(1, this.color, 1);
    this.fillStyle(this.color, 1);
    this.fillRect(0, 0, this.width, this.height);

    this.shoot = new Shoot({
      scene: this.scene,
      options: { color: this.color, xPos: this.x, yPos: this.y }
    });
    this.shoot.setVisible(false);

    // input
    this.shootingKey = this.scene.input.keyboard.addKey(params.options.key);

    // physics
    this.scene.physics.world.enable(this);
    this.body.allowGravity = false;
    this.body.setSize(this.width, this.height);
    this.scene.add.existing(this);
  }

  update(): void {
    if (this.shootingKey.isDown && !this.shoot.visible) {
      this.shoot.restart(
        this.x + this.width / 2,
        this.y + this.height / 2,
        this.isMovingRight
      );
    }

    if (this.x > this.scene.sys.canvas.width - this.width) {
      if (this.isMovingRight) {
        this.y += 20;
      }
      this.isMovingRight = false;
    } else if (this.x < 0) {
      if (!this.isMovingRight) {
        this.y -= 20;
      }
      this.isMovingRight = true;
    }

    if (this.isMovingRight) {
      this.body.setVelocityX(this.speed);
    } else {
      this.body.setVelocityX(-this.speed);
    }

    if (this.shoot.visible) {
      this.shoot.update();

      if (
        this.shoot.getHits() > 5 ||
        this.shoot.y > this.scene.sys.canvas.height
      ) {
        if (this.shoot.y > this.scene.sys.canvas.height) {
          if (this.color === 0x000000) {
            this.scene.registry.values.blackMisses -= 1;
            this.scene.events.emit("blackMissedChanged");
          } else {
            this.scene.registry.values.whiteMisses -= 1;
            this.scene.events.emit("whiteMissedChanged");
          }
        }
        this.shoot.setVisible(false);
      }
    }
  }

  public getShoot(): Shoot {
    return this.shoot;
  }
}
