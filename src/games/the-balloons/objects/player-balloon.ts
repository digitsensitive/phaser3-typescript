/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 Digitsensitive
 * @description  The Balloons: Player Balloon
 * @license      Digitsensitive
 */

export class PlayerBalloon extends Phaser.GameObjects.Sprite {
  private currentScene: Phaser.Scene;
  private playerParams = {
    width: 15,
    height: 24
  };

  constructor(params) {
    super(params.scene, params.x, params.y, params.key);

    this.initVariables(params);
    this.initSprite();
    this.initTweens();

    this.currentScene.add.existing(this);
  }

  private initVariables(params): void {
    this.currentScene = params.scene;
  }

  private initSprite(): void {
    this.width = this.playerParams.width;
    this.height = this.playerParams.height;
    this.setOrigin(0, 0);
  }

  private initTweens(): void {
    this.currentScene.tweens.add({
      targets: this,
      x: 2,
      y: 2,
      duration: 500,
      ease: "Power2",
      yoyo: true,
      loop: -1
    });
  }
}
