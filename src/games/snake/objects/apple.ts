/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 Digitsensitive
 * @description  Snake: Apple
 * @license      Digitsensitive
 */

export class Apple extends Phaser.GameObjects.Graphics {
  constructor(scene, params) {
    super(scene, params);
    this.x = Phaser.Math.RND.between(1, params.hFields - 1) * params.fSize;
    this.y = Phaser.Math.RND.between(1, params.vFields - 1) * params.fSize;
    this.fillStyle(0x61e85b, 0.8);
    this.fillRect(params.fSize, params.fSize, params.fSize, params.fSize);
    scene.add.existing(this);
  }

  /**
   * Randomly generate new apple position on the field
   */
  public newApplePosition(params): void {
    // generate new random position
    this.x = Phaser.Math.RND.between(1, params.hFields - 1) * params.fSize;
    this.y = Phaser.Math.RND.between(1, params.vFields - 1) * params.fSize;
  }
}
