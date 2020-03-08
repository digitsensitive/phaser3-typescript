/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 Digitsensitive
 * @description  River Raid: Player
 * @license      Digitsensitive
 */

import { Bullet } from "../objects/bullet";
import { CONST } from "../const/levelData";

export class Player extends Phaser.GameObjects.Sprite {
  private currentScene: Phaser.Scene;
  private isShooting: boolean;
  private bullets: Bullet[];
  private anim: Phaser.Tweens.Tween[];

  private cursors: any;
  private shootKey: Phaser.Input.Keyboard.Key;

  public getBullets(): Bullet[] {
    return this.bullets;
  }

  constructor(params) {
    super(params.scene, params.x, params.y, params.key, params.frame);

    // variables
    this.currentScene = params.scene;
    this.isShooting = false;
    this.bullets = [];

    // image
    this.setOrigin(0, 0);

    // physics
    this.currentScene.physics.world.enable(this);
    this.body.setSize(CONST.TILESIZE, CONST.TILESIZE);

    // animations & tweens
    this.anim = [];
    this.anim.push(
      params.scene.tweens.add({
        targets: this,
        duration: 1000,
        scaleX: 1.2,
        scaleY: 1.2
      })
    );

    // input
    this.cursors = this.currentScene.input.keyboard.createCursorKeys();
    this.shootKey = this.currentScene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );

    this.currentScene.add.existing(this);
  }

  update(): void {
    if (this.active) {
      this.handleInput();
      this.updateBullets();
    } else {
      this.setFrame(3);
      this.body.setVelocityX(0);
      this.body.setVelocityY(0);
    }
  }

  private handleInput(): void {
    if (this.cursors.right.isDown) {
      this.body.setVelocityX(35);
      this.setFrame(2);
    } else if (this.cursors.left.isDown) {
      this.body.setVelocityX(-35);
      this.setFrame(1);
    } else {
      this.body.setVelocityX(0);
      this.setFrame(0);
    }

    if (this.shootKey.isDown && !this.isShooting) {
      this.shoot();
      this.isShooting = true;
    }

    if (this.shootKey.isUp) {
      this.isShooting = false;
    }
  }

  private shoot(): void {
    this.bullets.push(
      new Bullet(this.currentScene, {
        x: this.x,
        y: this.y
      })
    );
  }

  private updateBullets(): void {
    for (let i = 0; i < this.bullets.length; i++) {
      if (this.bullets[i].active) {
        this.bullets[i].update();
      } else {
        this.bullets[i].destroy();
        this.bullets.splice(i, 1);
      }
    }
  }
}
