/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2019 Digitsensitive
 * @description  Super Mario Land: Box
 * @license      Digitsensitive
 */

export class Box extends Phaser.GameObjects.Sprite {
  // variables
  private currentScene: Phaser.Scene;
  private boxContent: string;

  constructor(params) {
    super(params.scene, params.x, params.y, params.key, params.frame);

    // variables
    this.currentScene = params.scene;
    this.boxContent = params.insideBox;

    this.initSprite();
    this.currentScene.add.existing(this);
  }

  private initSprite() {
    // sprite
    this.setOrigin(0.5, 0.5);

    // physics
    this.currentScene.physics.world.enable(this);
    this.body.setAllowGravity(false);
    this.body.setImmovable(true);
  }

  update(): void {}
}
