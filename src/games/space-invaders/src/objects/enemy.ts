import { Bullet } from './bullet';
import { ISpriteConstructor } from '../interfaces/sprite.interface';

export class Enemy extends Phaser.GameObjects.Sprite {
  body: Phaser.Physics.Arcade.Body;

  private bullets: Phaser.GameObjects.Group;
  private dyingTime: number;
  private enemyTint: number;
  private enemyType: string;
  private hurtingTime: number;
  private isHurt: boolean;
  private lives: number;
  private moveTween: Phaser.Tweens.Tween;
  private reloadTime: number;
  private valueKill: number;

  public getBullets(): Phaser.GameObjects.Group {
    return this.bullets;
  }

  constructor(aParams: ISpriteConstructor) {
    super(aParams.scene, aParams.x, aParams.y, aParams.texture);

    this.initVariables(aParams.texture);
    this.initImage();
    this.initPhysics();

    this.initTweens();

    this.scene.add.existing(this);
  }

  private initVariables(textureType: string): void {
    this.bullets = this.scene.add.group({
      maxSize: 10,
      runChildUpdate: true
    });
    this.enemyType = textureType;
    this.hurtingTime = 200;
    this.isHurt = false;

    // set the characteristics of the specific enemy
    switch (this.enemyType) {
      case 'octopus':
        this.dyingTime = 100;
        this.enemyTint = 0xffffff;
        this.lives = 1;
        this.reloadTime = 9000;
        this.valueKill = 20;
        break;

      case 'crab':
        this.dyingTime = 120;
        this.enemyTint = 0x42a4aa;
        this.lives = 2;
        this.reloadTime = 10000;
        this.valueKill = 40;
        break;

      case 'squid':
        this.dyingTime = 140;
        this.enemyTint = 0x4a4e4d;
        this.lives = 2;
        this.reloadTime = 12000;
        this.valueKill = 60;

        break;
    }
  }

  private initImage(): void {
    this.setOrigin(0.5, 0.5);
    this.setActive(true);
    this.setTint(this.enemyTint);
  }

  private initPhysics(): void {
    this.scene.physics.world.enable(this);
    this.body.setSize(12, 8);
  }

  private initTweens(): void {
    this.moveTween = this.scene.tweens.add({
      targets: this,
      x: this.x + 50,
      ease: 'Power0',
      duration: 6000,
      yoyo: true,
      repeat: -1
    });
  }

  update(): void {
    if (this.active) {
      this.anims.play(this.enemyType + 'Fly', true);

      if (Phaser.Math.RND.between(0, this.reloadTime) === 0) {
        this.bullets.add(
          new Bullet({
            scene: this.scene,
            bulletProperties: {
              speed: 100
            },
            x: this.x,
            y: this.y,
            texture: 'bullet'
          })
        );
      }

      if (this.isHurt) {
        this.setTint(0xfc8a75);
        this.setScale(0.8);
        this.setAlpha(0.8);
        if (this.hurtingTime > 0) {
          this.hurtingTime -= 10;
        } else {
          this.setTint(this.enemyTint);
          this.setScale(1);
          this.setAlpha(1);
          this.isHurt = false;
          this.hurtingTime = 200;
        }
      }
    } else {
      this.anims.play(this.enemyType + 'Dead');

      if (this.dyingTime > 0) {
        this.dyingTime -= 10;
      } else {
        this.addPoints();
        this.destroy();
      }
    }
  }

  public gotHurt(): void {
    this.lives -= 1;
    if (this.lives === 0) {
      this.setActive(false);
      var particles = this.scene.add.particles('flares').createEmitter({
          frame: 'yellow',
          x: this.x,
          y: this.y,
          lifespan: 200,
          speed: { min: 10, max: 50 },
          angle: {min: 0, max: 360},
          scale: { start: 0.1, end: 0 },
          quantity: 1,
          maxParticles: 10,
          blendMode: 'ADD'
      });
    } else {
      this.isHurt = true;
    }
  }

  private addPoints(): void {
    let getCurrentPoints = this.scene.registry.get('points');
    this.scene.registry.set('points', getCurrentPoints + this.valueKill);
    this.scene.events.emit('pointsChanged');
  }
}
