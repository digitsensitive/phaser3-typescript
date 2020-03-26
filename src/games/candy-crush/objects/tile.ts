/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2020 digitsensitive
 * @description  Candy crush: Tile
 * @license      Digitsensitive
 */

export class Tile extends Phaser.GameObjects.Image {
  constructor(params) {
    super(params.scene, params.x, params.y, params.key, params.frame);

    // set image settings
    this.setOrigin(0, 0);
    this.setInteractive();

    this.scene.add.existing(this);
  }
}
