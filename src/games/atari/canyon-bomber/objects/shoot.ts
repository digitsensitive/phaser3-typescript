/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2019 - 2020 Digitsensitive
 * @description  Canyon Bomber: Shoot
 * @license      {@link https://github.com/digitsensitive/phaser3-typescript/blob/master/LICENSE.md | MIT License}
 */

export class Shoot extends Phaser.GameObjects.Graphics {
  private velocity: Phaser.Math.Vector2;
  private rocksHit: number;
  private color: number;

  constructor(params) {
    super(params.scene, params.options);
    this.rocksHit = 0;
    this.x = params.options.xPos;
    this.y = params.options.yPos;
    this.color = params.options.color;

    this.fillStyle(this.color, 2);
    this.fillRect(0, 0, 4, 4);

    // physics
    this.scene.physics.world.enable(this);
    this.body.allowGravity = true;
    this.body.setSize(4, 4);
    this.scene.add.existing(this);
  }

  update(): void {
    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }

  restart(newX: number, newY: number, direction: boolean): void {
    let directionCorrection = direction ? 1 : -1;
    this.setVisible(true);
    this.x = newX;
    this.y = newY;
    this.rocksHit = 0;

    this.body.velocity.y = 0;
    this.velocity = new Phaser.Math.Vector2(directionCorrection * 8, 2);
    this.velocity.scale(0.12);
  }

  public addAHit(): void {
    this.rocksHit += 1;
  }

  public getHits(): number {
    return this.rocksHit;
  }
}
