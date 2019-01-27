/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2019 Digitsensitive
 * @description  Super Mario Land: Enemy
 * @license      Digitsensitive
 */

export class Enemy extends Phaser.GameObjects.Sprite {
  // variables
  protected currentScene: Phaser.Scene;

  constructor(params) {
    super(params.scene, params.x, params.y, params.key, params.frame);

    // variables
    this.currentScene = params.scene;
    this.initSprite();
    this.currentScene.add.existing(this);
  }

  protected initSprite() {
    // sprite
    this.setOrigin(0, 0);
    this.setFrame(0);

    // physics
    this.currentScene.physics.world.enable(this);
    this.body.setSize(8, 8);
  }
}
