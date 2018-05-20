/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 Digitsensitive
 * @description  River Raid: Bullet
 * @license      Digitsensitive
 */

export class Bullet extends Phaser.GameObjects.Graphics {
  private colors: number[];
  private selectedColor: number;
  private velocity: Phaser.Math.Vector2;
  private lifespan: number;

  constructor(scene, params) {
    super(scene, params);

    // variables
    this.lifespan = 50;

    // choose random color from a set with colors
    this.colors = [];
    this.colors.push(0x3ae0c4);
    this.colors.push(0x39e066);
    this.colors.push(0xe08639);
    let rndColor = Phaser.Math.RND.between(0, 2);
    this.selectedColor = this.colors[rndColor];

    // init bullet
    this.x = params.x + 3;
    this.y = params.y + 3;
    this.velocity = new Phaser.Math.Vector2(0, -2);

    // define bullet graphics and draw it
    this.fillStyle(this.selectedColor, 1);
    this.fillRect(0, 0, 1, 1);

    // physics
    scene.physics.world.enable(this);
    this.body.allowGravity = false;
    this.body.setSize(1, 1);
    scene.add.existing(this);
  }

  update(): void {
    // apple velocity to position
    this.y += this.velocity.y;

    // reduce lifespan
    this.lifespan--;

    if (this.lifespan < 0) {
      this.setActive(false);
    }
  }
}
