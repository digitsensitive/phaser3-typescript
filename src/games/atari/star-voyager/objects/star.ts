/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2019 - 2020 Digitsensitive
 * @description  Star Voyager: Star
 * @license      {@link https://github.com/digitsensitive/phaser3-typescript/blob/master/LICENSE.md | MIT License}
 */

export class Star extends Phaser.GameObjects.Graphics {
  private changeX: number;
  private changeY: number;
  private color: number;

  constructor(params) {
    super(params.scene, params);

    // init graphics
    this.x = params.x;
    this.y = params.y;
    this.z = params.z;

    // variables
    /*this.changeX = this.scene.cameras.main.scrollX;
    this.changeY = this.scene.cameras.main.scrollY;*/
    this.color = 0xffffff;

    this.fillStyle(this.color, 1);
    this.fillRect(0, 0, 1, 1);

    // physics
    this.scene.physics.world.enable(this);
    this.body.allowGravity = false;
    this.body.setSize(1, 1);
    this.body.setOffset(0, 0);
    this.scene.add.existing(this);
  }

  update(): void {
    let px =
      this.x * (128 / this.z) +
      this.scene.cameras.main.scrollX +
      this.scene.sys.canvas.width * 0.5;
    let py =
      this.y * (128 / this.z) +
      this.scene.cameras.main.scrollY +
      this.scene.sys.canvas.height * 0.5;
    this.z -= 0.2;
    if (this.z <= 0) {
      this.setVisible(false);
    }

    /*this.changeX = this.scene.cameras.main.scrollX - this.changeX;
    this.changeY = this.scene.cameras.main.scrollY - this.changeY;*/

    this.clear();
    this.fillStyle(this.color, 1);
    this.setAlpha(1 - this.z / 32);
    this.fillCircle(px, py, (1 - this.z / 32) * 2);
  }

  public reset(): void {
    this.x = Phaser.Math.Between(-25, 25);
    this.y = Phaser.Math.Between(-25, 25);
    this.z = 32;
  }
}
