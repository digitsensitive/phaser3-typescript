/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 Digitsensitive
 * @description  Coin Runner: Coin
 * @license      Digitsensitive
 */

export class Coin extends Phaser.GameObjects.Image {
  private lastPosition: string;
  private moveToBottom: boolean = true;
  private changePositionTimer: Phaser.Time.TimerEvent;
  constructor(params) {
    super(params.scene, params.x, params.y, params.key);

    // variables
    this.setFieldSide();

    // image
    this.initImage();

    // events
    this.initEvents(params);

    params.scene.add.existing(this);
  }

  private initImage(): void {
    this.setScale(1);
    this.setSize(56, 56);
    this.setAlpha(1, 1, 1, 1);
    this.setBlendMode(0);
    this.setDepth(0);
    this.setFlip(false, false);
    this.setOrigin(0, 0);
  }

  private initEvents(params): void {
    this.changePositionTimer = params.scene.time.addEvent({
      delay: 2000,
      callback: this.changePosition,
      callbackScope: this,
      loop: true
    });
  }

  update(): void {}

  public changePosition(): void {
    this.setNewPosition();
    this.setFieldSide();

    this.changePositionTimer.reset({
      delay: 2000,
      callback: this.changePosition,
      callbackScope: this,
      loop: true
    });
  }

  private setNewPosition(): void {
    if (this.lastPosition == "right") {
      this.x = Phaser.Math.RND.integerInRange(100, 384);
    } else {
      this.x = Phaser.Math.RND.integerInRange(385, 700);
    }
    this.y = Phaser.Math.RND.integerInRange(100, 500);
  }

  private setFieldSide(): void {
    if (this.x <= 384) {
      this.lastPosition = "left";
    } else {
      this.lastPosition = "right";
    }
  }
}
