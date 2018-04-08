/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 Digitsensitive
 * @description  Snake: Apple
 * @license      Digitsensitive
 */

export class Apple extends Phaser.GameObjects.Graphics {
  constructor(scene, params) {
    super(scene, params);
    this.x = params.xPos;
    this.y = params.yPos;
    this.fillStyle(0x61e85b, 0.8);
    this.fillRect(params.fSize, params.fSize, params.fSize, params.fSize);
    scene.add.existing(this);
  }

  /**
   * Randomly generate new apple position on the field
   */
  public newApplePosition(_rndX, _rndY): void {
    this.x = _rndX;
    this.y = _rndY;
  }
}
