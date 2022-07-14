import { angleParticleBullet } from "../helpers/helpers";

export class Bullet extends Phaser.GameObjects.Image {
  body: Phaser.Physics.Arcade.Body;
  private bulletSpeed: number;
  private damage!: number;

  // particle
  private fire: Phaser.GameObjects.Particles.ParticleEmitter;
  private darkSmoke: Phaser.GameObjects.Particles.ParticleEmitter;

  constructor(aParams: IBulletConstructor) {
    super(aParams.scene, aParams.x, aParams.y, aParams.texture);

    this.rotation = aParams.rotation;
    this.damage = aParams.damage;

    this.initVariables();
    this.initImage();
    this.initPhysics();
    this.createParticalBullet();
    this.scene.add.existing(this);
  }

  update(): void {
    this.fire.setAngle(angleParticleBullet(this.angle))
  }

  public getDamage(){
    return this.damage;
  }

  public destroyBullet() {
    this.fire.stop();
    this.darkSmoke.stop();
    this.destroy();
  }

  private initVariables(){
    // variables
    this.bulletSpeed = 1000;
  }

  private initPhysics(){
    // physics
    this.scene.physics.world.enable(this);
    this.scene.physics.velocityFromRotation(
      this.rotation - Math.PI / 2,
      this.bulletSpeed,
      this.body.velocity
    );
  }

  private initImage(): void {
    // image
    this.setOrigin(0.5, 0.5);
    this.setDepth(2);
  }

  private createParticalBullet(){
    this.fire = this.scene.add.particles('fire').createEmitter({
      speed: { min: 100, max: 200 },
      scale: { start: 0, end: 1, ease: 'Back.easeOut' },
      alpha: { start: 1, end: 0, ease: 'Quart.easeOut' },
      lifespan: 600,
      follow: this,
    });
    this.fire.reserve(1000);
    
    this.darkSmoke = this.scene.add.particles('dark-smoke').createEmitter({
      x: this.x,
      y: this.y,
      speed: { min: 20, max: 100 },
      angle: { min: 0, max: 360},
      scale: { start: 1, end: 0},
      alpha: { start: 0, end: 0.1},
      lifespan: 600,
      follow: this,
    });
    this.darkSmoke.reserve(1000);
  }
}
