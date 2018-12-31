/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 Digitsensitive
 * @description  The Balloons: Player Main
 * @license      Digitsensitive
 */

export class PlayerMain extends Phaser.GameObjects.Sprite {
  private currentScene: Phaser.Scene;
  private playerParams = {
    width: 15,
    height: 24
  };

  constructor(params) {
    super(params.scene, params.x, params.y, params.key);

    this.initVariables(params);
    this.initSprite();

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
}
