/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 - 2019 digitsensitive
 * @description  Asteroid: Bullet
 * @license      Digitsensitive
 */

export class Bullet extends Phaser.GameObjects.Graphics {
  private colors: number[];
  private selectedColor: number;
  private velocity: Phaser.Math.Vector2;
  private lifeSpan: number;
  private isOffScreen: boolean;
  public getBody(): any {
    return this.body;
  }

  constructor(scene, params) {
    super(scene, params);

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
    this.x = params.x;
    this.y = params.y;
    this.velocity = new Phaser.Math.Vector2(
      15 * Math.cos(params.rotation - Math.PI / 2),
      15 * Math.sin(params.rotation - Math.PI / 2)
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
