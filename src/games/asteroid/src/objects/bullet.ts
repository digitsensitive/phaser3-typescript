import { IBulletConstructor } from '../interfaces/bullet.interface';

export class Bullet extends Phaser.GameObjects.Graphics {
  body: Phaser.Physics.Arcade.Body;

  private colors: number[];
  private selectedColor: number;
  private velocity: Phaser.Math.Vector2;
  private lifeSpan: number;
  private isOffScreen: boolean;

  public getBody(): any {
    return this.body;
  }

  constructor(aParams: IBulletConstructor) {
    super(aParams.scene, aParams.options);

    // variables
    this.colors = [];
    this.colors.push(0x3ae0c4);
    this.colors.push(0x39e066);
    this.colors.push(0xe08639);
    let rndColor = Phaser.Math.RND.between(0, 2);
    this.selectedColor = this.colors[rndColor];
    this.lifeSpan = 100;
    this.isOffScreen = false;

    // init bullet
    this.x = aParams.options.x;
    this.y = aParams.options.y;
    this.velocity = new Phaser.Math.Vector2(
      15 * Math.cos(aParams.rotation - Math.PI / 2),
      15 * Math.sin(aParams.rotation - Math.PI / 2)
    );

    // define bullet graphics and draw it
    this.fillStyle(this.selectedColor, 1);
    this.fillCircle(0, 0, 3);

    // physics
    this.scene.physics.world.enable(this);
    this.body.allowGravity = false;
    this.body.setCircle(3);
    this.body.setOffset(-3, -3);
    this.scene.add.existing(this);
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
