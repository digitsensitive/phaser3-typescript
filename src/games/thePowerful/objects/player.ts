/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 Digitsensitive
 * @description  The Powerful: Player
 * @license      Digitsensitive
 */

import { Sword } from "./sword";

export class Player extends Phaser.GameObjects.Sprite {
  private animationSuffix: string;
  private attackCooldown: number;
  private attackKey: Phaser.Input.Keyboard.Key;
  private currentScene: Phaser.Scene;
  private cursors: any;
  private isAttacking: boolean;
  private lastDirection: string;
  private swordSprite: Phaser.GameObjects.Sprite;
  private walkingSpeed: number = 60;

  constructor(params) {
    super(params.scene, params.x, params.y, "atlas", "player1");

    this.initVariables({ scene: params.scene, number: params.number });
    this.initImage();
    this.initPhysics();
    this.initInput();

    params.scene.add.existing(this);
  }

  /**
   * VARIABLE customizations
   */
  private initVariables(params): void {
    this.animationSuffix = "";
    this.attackCooldown = 20;
    this.currentScene = params.scene;
    this.isAttacking = false;
    this.lastDirection = "";
    this.swordSprite = null;
    this.anims.play("playerWalkDown");
  }

  /**
   * SPRITE customizations
   */
  private initImage(): void {
    this.setScale(1);
    this.setSize(16, 16);
    this.setAlpha(1);
    this.setFlip(false, false);
    this.setOrigin(0, 0);
    this.setAngle(0);
  }

  /**
   * PHYSICS customizations
   */
  private initPhysics(): void {
    this.currentScene.physics.world.enable(this);
    this.body.setSize(14, 14);
  }

  /**
   * INPUT customizations
   */
  private initInput(): void {
    this.cursors = this.currentScene.input.keyboard.createCursorKeys();
    this.attackKey = this.currentScene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
  }

  update(): void {
    this.handleInput();
  }

  private handleInput(): void {
    if (
      this.cursors.right.isDown &&
      !this.cursors.up.isDown &&
      !this.cursors.down.isDown &&
      !this.isAttacking
    ) {
      this.body.setVelocityX(this.walkingSpeed);
      this.anims.play("playerWalkRight", true);
      this.lastDirection = "Right";
      this.setFlipX(false);
    } else if (
      this.cursors.left.isDown &&
      !this.cursors.up.isDown &&
      !this.cursors.down.isDown &&
      !this.isAttacking
    ) {
      this.body.setVelocityX(-this.walkingSpeed);
      this.anims.play("playerWalkLeft", true);
      this.lastDirection = "Left";
      this.setFlipX(true);
    } else {
      this.body.setVelocityX(0);
    }

    if (
      this.cursors.up.isDown &&
      !this.cursors.left.isDown &&
      !this.cursors.right.isDown &&
      !this.isAttacking
    ) {
      this.body.setVelocityY(-this.walkingSpeed);
      this.lastDirection = "Up";
      this.anims.play("playerWalkUp", true);
    } else if (
      this.cursors.down.isDown &&
      !this.cursors.left.isDown &&
      !this.cursors.right.isDown &&
      !this.isAttacking
    ) {
      this.body.setVelocityY(this.walkingSpeed);
      this.lastDirection = "Down";
      this.anims.play("playerWalkDown", true);
    } else {
      this.body.setVelocityY(0);
    }

    if (this.attackKey.isDown && !this.isAttacking) {
      this.isAttacking = true;
      this.swordSprite = new Sword({
        scene: this.currentScene,
        x: this.getPositionHitbox()[0],
        y: this.getPositionHitbox()[1],
        frame: this.getPositionHitbox()[2],
        flipHorizontal: this.getPositionHitbox()[3],
        flipVertical: this.getPositionHitbox()[4]
      });
      this.anims.play("playerAttack" + this.lastDirection);
    } else if (this.isAttacking) {
      this.attackCooldown--;
      if (this.attackCooldown < 0) {
        this.isAttacking = false;
        this.swordSprite.destroy();
        this.attackCooldown = 20;
        this.anims.play("playerWalk" + this.lastDirection);
      }
    }
  }

  private getPositionHitbox(): any[] {
    let hitbox = [];

    switch (this.lastDirection) {
      case "Left": {
        hitbox.push(this.x - 16);
        hitbox.push(this.y);
        hitbox.push("playerSword2");
        hitbox.push(true);
        hitbox.push(false);
        break;
      }
      case "Right": {
        hitbox.push(this.x + 16);
        hitbox.push(this.y);
        hitbox.push("playerSword2");
        hitbox.push(false);
        hitbox.push(false);
        break;
      }
      case "Up": {
        hitbox.push(this.x);
        hitbox.push(this.y - 16);
        hitbox.push("playerSword1");
        hitbox.push(false);
        hitbox.push(true);
        break;
      }
      case "Down": {
        hitbox.push(this.x);
        hitbox.push(this.y + 16);
        hitbox.push("playerSword1");
        hitbox.push(false);
        hitbox.push(false);
        break;
      }
    }

    return hitbox;
  }
}
