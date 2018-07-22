/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 Digitsensitive
 * @description  Coin Runner: Coin
 * @license      Digitsensitive
 */

export class Coin extends Phaser.GameObjects.Image {
  private centerOfScreen: number;
  private changePositionTimer: Phaser.Time.TimerEvent;
  private currentScene: Phaser.Scene;
  private lastPosition: string;

  constructor(params) {
    super(params.scene, params.x, params.y, params.key);

    this.initVariables(params);
    this.initImage();
    this.initEvents();

    this.currentScene.add.existing(this);
  }

  private initVariables(params): void {
    this.currentScene = params.scene;
    this.centerOfScreen = this.currentScene.sys.canvas.width / 2;
    this.changePositionTimer = null;
    this.setFieldSide();
  }

  private initImage(): void {
    this.setOrigin(0.5, 0.5);
  }

  private initEvents(): void {
    this.changePositionTimer = this.currentScene.time.addEvent({
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
      this.x = Phaser.Math.RND.integerInRange(100, this.centerOfScreen);
    } else {
      this.x = Phaser.Math.RND.integerInRange(385, 700);
    }
    this.y = Phaser.Math.RND.integerInRange(100, 500);
  }

  private setFieldSide(): void {
    if (this.x <= this.centerOfScreen) {
      this.lastPosition = "left";
    } else {
      this.lastPosition = "right";
    }
  }
}
