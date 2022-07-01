import { IRectangleConstructor } from '../interfaces/interfaces';

export class Ball extends Phaser.GameObjects.Rectangle {
  body: Phaser.Physics.Arcade.Body;
  emitter!: Phaser.GameObjects.Particles.ParticleEmitter;
  constructor(aParams: IRectangleConstructor) {
    super(
      aParams.scene,
      aParams.x,
      aParams.y,
      aParams.width,
      aParams.height,
      aParams.fillColor,
      aParams.fillAlpha
    );

    this.initRectangle();
    this.initPhysics();
    this.initPractices();
    this.scene.add.existing(this);
  }

  private initRectangle(): void {
    this.setOrigin(0);
    this.width = 10;
    this.height = 10;
    this.setFillStyle(0xffffff);
  }

  private initPhysics(): void {
    this.scene.physics.world.enable(this);
    this.body.setBounce(1, 1);
    this.body.setCollideWorldBounds();
  }

  private initPractices(): void {
    const particles = this.scene.add.particles('redParticle');
    this.emitter = particles.createEmitter({
      speed: 100,
      scale: { start: 0.1, end: 0 },
      blendMode: 'ADD'
    }).stop();
    this.emitter.startFollow(this, 5,5);
  }

  public applyInitVelocity(): void {
    this.body.setVelocity(Phaser.Math.RND.between(-200, 200), 200);
    this.body.speed = 800;
    this.emitter.start()
  }
}
