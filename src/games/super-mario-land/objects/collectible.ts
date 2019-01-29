/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2019 Digitsensitive
 * @description  Super Mario Land: Collectible
 * @license      Digitsensitive
 */

export class Collectible extends Phaser.GameObjects.Sprite {
  // variables
  private currentScene: Phaser.Scene;
  private points: number;

  constructor(params) {
    super(params.scene, params.x, params.y, params.key, params.frame);

    // variables
    this.currentScene = params.scene;
    this.points = params.points;
    this.initSprite();
    this.currentScene.add.existing(this);
  }

  private initSprite() {
    // sprite
    this.setOrigin(0, 0);
    this.setFrame(0);

    // physics
    this.currentScene.physics.world.enable(this);
    this.body.setSize(8, 8);
    this.body.setAllowGravity(false);
  }

  update(): void {}

  private collected(): void {
    this.destroy();
    this.currentScene.registry.values.score += this.points;
    this.currentScene.events.emit("scoreChanged");
  }
}
