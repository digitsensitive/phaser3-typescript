import { Bullet } from './bullet';
import { IImageConstructor } from '../interfaces/image.interface';

export class Player extends Phaser.GameObjects.Image {
  body: Phaser.Physics.Arcade.Body;

  private bullets: Phaser.GameObjects.Group;
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  private flyingSpeed: number;
  private lastShoot: number;
  private shootingKey: Phaser.Input.Keyboard.Key;
  private emitter!: Phaser.GameObjects.Particles.ParticleEmitter;

  public getBullets(): Phaser.GameObjects.Group {
    return this.bullets;
  }

  constructor(aParams: IImageConstructor) {
    super(aParams.scene, aParams.x, aParams.y, aParams.texture);

    this.initVariables();
    this.initImage();
    this.initInput();
    this.initPhysics();
    this.initParticles();
    this.scene.add.existing(this);
  }

  private initParticles(){
    var particles = this.scene.add.particles('flares');

    this.emitter = particles.createEmitter({
        frame: 'red',
        lifespan: 200,
        speed: { min: 10, max: 50 },
        angle: {min: 80, max: 100},
        gravityY: 300,
        scale: { start: 0.1, end: 0 },
        quantity: 1,
        blendMode: 'ADD'
    });
    this.emitter.startFollow(this,0,6);
  }

  private initVariables(): void {
    this.bullets = this.scene.add.group({
      runChildUpdate: true
    });
    this.lastShoot = 0;
    this.flyingSpeed = 100;
  }

  private initImage(): void {
    this.setOrigin(0.5, 0.5);
  }

  private initInput(): void {
    this.cursors = this.scene.input.keyboard.createCursorKeys();
    this.shootingKey = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
  }

  private initPhysics(): void {
    this.scene.physics.world.enable(this);
    this.body.setSize(13, 8);
  }

  update(): void {
    this.handleFlying();
    this.handleShooting();
  }

  private handleFlying(): void {
    if (
      this.cursors.right.isDown &&
      this.x < this.scene.sys.canvas.width - this.width / 2
    ) {
      this.body.setVelocityX(this.flyingSpeed);
    } else if (this.cursors.left.isDown && this.x > this.width / 2) {
      this.body.setVelocityX(-this.flyingSpeed);
    } else {
      this.body.setVelocityX(0);
    }
  }

  private handleShooting(): void {
    if (this.shootingKey.isDown && this.scene.time.now > this.lastShoot) {
      if (this.bullets.getLength() < 1) {
        this.bullets.add(
          new Bullet({
            scene: this.scene,
            bulletProperties: {
              speed: -300
            },
            x: this.x,
            y: this.y - this.height,
            texture: 'bullet'
          })
        );

        this.lastShoot = this.scene.time.now + 500;
      }
    }
  }

  public gotHurt() {
    // update lives
    let currentLives = this.scene.registry.get('lives');
    this.scene.registry.set('lives', currentLives - 1);
    this.scene.events.emit('livesChanged');

    // reset position
    this.x = this.scene.sys.canvas.width / 2;
    this.y = this.scene.sys.canvas.height - 40;
  }
}
