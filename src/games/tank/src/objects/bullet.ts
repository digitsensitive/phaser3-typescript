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
    this.initImage();
    this.createParticalBullet();
    this.scene.add.existing(this);
  }
  public getDamage(){
    return this.damage;
  }
  private initImage(): void {
    // variables
    this.bulletSpeed = 1000;

    // image
    this.setOrigin(0.5, 0.5);
    this.setDepth(2);

    // physics
    this.scene.physics.world.enable(this);
    this.scene.physics.velocityFromRotation(
      this.rotation - Math.PI / 2,
      this.bulletSpeed,
      this.body.velocity
    );

    this.scene.scene.get('GameOverScene').events.on("start", () =>{
      console.log("GameOverScene started");
      this.destroyBullet();
    })
  }

  private createParticalBullet(){
    this.fire = this.scene.add.particles('fire').createEmitter({
      speed: { min: 100, max: 200 },
      // angle: { min: -85, max: -95 },
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

  update(): void {
    this.fire.setAngle({min: angleParticleBullet(this.angle)-5, max: angleParticleBullet(this.angle)+5})
    // console.log("update finished", this.angle);
  }

  public destroyBullet() {
    this.fire.stop();
    this.darkSmoke.stop();
    this.destroy();
  }
}
