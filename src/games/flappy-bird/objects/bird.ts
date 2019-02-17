/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 - 2019 digitsensitive
 * @description  Flappy Bird: Bird
 * @license      Digitsensitive
 */

export class Bird extends Phaser.GameObjects.Sprite {
  private jumpKey: Phaser.Input.Keyboard.Key;
  private anim: Phaser.Tweens.Tween[];
  private isDead: boolean = false;
  private isFlapping: boolean = false;

  public getDead(): boolean {
    return this.isDead;
  }

  public setDead(dead): void {
    this.isDead = dead;
  }

  constructor(params) {
    super(params.scene, params.x, params.y, params.key, params.frame);

    // image
    this.setScale(3);
    this.setOrigin(0, 0);

    // physics
    this.scene.physics.world.enable(this);
    this.body.setGravityY(1000);
    this.body.setSize(17, 12);

    // animations & tweens
    this.anim = [];
    this.anim.push(
      this.scene.tweens.add({
        targets: this,
        duration: 100,
        angle: -20
      })
    );

    // input
    this.jumpKey = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );

    this.scene.add.existing(this);
  }

  update(): void {
    this.handleAngleChange();
    this.handleInput();
    this.isOffTheScreen();
  }

  private handleAngleChange(): void {
    if (this.angle < 20) {
      this.angle += 1;
    }
  }

  private handleInput(): void {
    if (this.jumpKey.isDown && !this.isFlapping) {
      this.flap();
    } else if (this.jumpKey.isUp && this.isFlapping) {
      this.isFlapping = false;
    }
  }

  public flap(): void {
    this.isFlapping = true;
    this.body.setVelocityY(-350);
    this.anim[0].restart();
  }

  private isOffTheScreen(): void {
    if (this.y + this.height > this.scene.sys.canvas.height) {
      this.isDead = true;
    }
  }
}
