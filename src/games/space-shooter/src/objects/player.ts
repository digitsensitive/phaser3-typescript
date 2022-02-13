import { IImageConstructor } from '../interfaces/image.interface';
import { Bullet } from './bullet';

export class Player extends Phaser.GameObjects.Image {
  body: Phaser.Physics.Arcade.Body;

  private bullets: Bullet[];
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  private isShooting: boolean;
  private rotationSpeed: number = 0.05;
  private shootKey: Phaser.Input.Keyboard.Key;

  constructor(aParams: IImageConstructor) {
    super(aParams.scene, aParams.x, aParams.y, aParams.texture, aParams.frame);

    this.initImage();
    this.initVariables();
    this.initInput();
    this.initPhysics();
    this.scene.add.existing(this);
  }

  private initImage(): void {
    this.setScale(0.5);
  }

  private initVariables(): void {
    this.bullets = [];
    this.isShooting = false;
  }

  private initInput(): void {
    this.cursors = this.scene.input.keyboard.createCursorKeys();
    this.shootKey = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
  }

  private initPhysics(): void {
    this.scene.physics.world.enable(this);
  }

  update(): void {
    if (this.active) {
      this.handleInput();
    }
    this.updateBullets();
  }

  private handleInput(): void {
    // rotating
    if (this.cursors.right.isDown) {
      this.rotation += this.rotationSpeed;
    } else if (this.cursors.left.isDown) {
      this.rotation -= this.rotationSpeed;
    }

    // shooting
    if (this.shootKey.isDown && !this.isShooting) {
      this.doubleShoot();
      this.isShooting = true;
    }

    if (this.shootKey.isUp) {
      this.isShooting = false;
    }
  }

  private doubleShoot(): void {
    this.bullets.push(
      new Bullet({
        scene: this.scene,
        rotation: this.rotation,
        options: {
          x: this.x + Math.cos(this.rotation) * 20,
          y: this.y + Math.sin(this.rotation) * 20
        }
      }),
      new Bullet({
        scene: this.scene,
        rotation: this.rotation,
        options: {
          x: this.x - Math.cos(this.rotation) * 20,
          y: this.y - Math.sin(this.rotation) * 20
        }
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
