/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2019 - 2020 Digitsensitive
 * @description  Canyon Bomber: Rock
 * @license      {@link https://github.com/digitsensitive/phaser3-typescript/blob/master/LICENSE.md | MIT License}
 */

export class Rock extends Phaser.GameObjects.Graphics {
  private rockText: Phaser.GameObjects.BitmapText;
  private scoreValue: number;

  constructor(params) {
    super(params.scene, params);

    // variables
    this.scoreValue = params.score;

    // init graphics
    this.x = params.xPos;
    this.y = params.yPos;
    this.lineStyle(1, 0xffffff, 1);
    this.fillStyle(0xffffff, 1);
    this.fillCircle(0, 0, 6);

    // init game objects
    this.rockText = this.scene.add.bitmapText(
      this.x - 3,
      this.y - 3,
      "font",
      this.scoreValue.toString(),
      8
    );
    this.rockText.setDepth(4);

    // physics
    this.scene.physics.world.enable(this);
    this.body.allowGravity = false;
    this.body.setCircle(4);
    this.body.setOffset(-4, -4);
    this.scene.add.existing(this);
  }

  public tweenDown(): void {
    this.scene.add.tween({
      targets: this,
      props: { y: this.y + 13 },
      duration: 2,
      ease: "Power0",
      yoyo: false
    });
    this.scene.add.tween({
      targets: this.rockText,
      props: { y: this.rockText.y + 13 },
      duration: 2,
      ease: "Power0",
      yoyo: false
    });
    this.body.y += 13;
  }

  public tweenUp(): void {
    this.scene.add.tween({
      targets: this,
      props: { y: this.y - 13 },
      duration: 2,
      ease: "Power0",
      yoyo: false
    });
    this.scene.add.tween({
      targets: this.rockText,
      props: { y: this.rockText.y - 13 },
      duration: 2,
      ease: "Power0",
      yoyo: false
    });
    this.body.y -= 13;
  }

  public makeInvisible(): void {
    this.setVisible(false);
    this.rockText.setVisible(false);
  }

  public getScore(): number {
    return this.scoreValue;
  }

  public killRock(): void {
    this.rockText.destroy();
    this.destroy();
  }
}
