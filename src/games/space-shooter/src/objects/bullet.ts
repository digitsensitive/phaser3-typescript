import { IBulletConstructor } from '../interfaces/bullet.interface';

export class Bullet extends Phaser.GameObjects.Graphics {
  body: Phaser.Physics.Arcade.Body;

  private color: number;
  private velocity: Phaser.Math.Vector2;
  private lifeSpan: number;
  private isOffScreen: boolean;

  public getBody(): any {
    return this.body;
  }

  constructor(aParams: IBulletConstructor) {
    super(aParams.scene, aParams.options);

    this.initVariables();
    this.initGraphics();
    this.initPhysics();
    this.initBullet(aParams.options.x, aParams.options.y, aParams.rotation);

    this.scene.add.existing(this);
  }

  private initVariables(): void {
    this.color = 0xffffff;
    this.lifeSpan = 100;
    this.isOffScreen = false;
  }

  private initGraphics(): void {
    this.fillStyle(this.color, 1);
    this.fillCircle(0, 0, 3);
  }

  private initPhysics(): void {
    this.scene.physics.world.enable(this);
    this.body.allowGravity = false;
    this.body.setCircle(3);
    this.body.setOffset(-3, -3);
    this.body.setMaxVelocity(20, 20);
  }

  private initBullet(x: number, y: number, rotation: number): void {
    this.x = x;
    this.y = y;
    this.velocity = new Phaser.Math.Vector2(
      this.body.maxVelocity.x * Math.cos(rotation - Math.PI / 2),
      this.body.maxVelocity.y * Math.sin(rotation - Math.PI / 2)
    );
  }

  update(): void {
    // apple velocity to position
    this.x += this.velocity.x;
    this.y += this.velocity.y;

    if (this.lifeSpan < 0 || this.isOffScreen) {
      this.setActive(false);
    } else {
      this.lifeSpan--;
    }

    this.checkIfOffScreen();
  }

  private checkIfOffScreen(): void {
    if (
      this.x > this.scene.sys.canvas.width + 1 ||
      this.y > this.scene.sys.canvas.height + 1
    ) {
      this.isOffScreen = true;
    }
  }
}
