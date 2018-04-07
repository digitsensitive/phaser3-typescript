/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 Digitsensitive
 * @description  Snake: Apple
 * @license      Digitsensitive
 */

export class Apple {
  private appleGraphic: Phaser.GameObjects.Graphics;
  public getGraphic(): Phaser.GameObjects.Graphics {
    return this.appleGraphic;
  }

  constructor(_scene) {
    // set variables
    this.appleGraphic = null;
  }

  /**
   * Function which randomly puts a new apple on the field
   */
  public spawnApple(_scene, _fieldSize, _hFields, _vFields): void {
    if (this.appleGraphic) {
      this.appleGraphic.x =
        Phaser.Math.RND.between(1, _hFields - 1) * _fieldSize;
      this.appleGraphic.y =
        Phaser.Math.RND.between(1, _vFields - 1) * _fieldSize;
    } else {
      this.appleGraphic = _scene.add
        .graphics({
          x: Phaser.Math.RND.between(1, _hFields - 1) * _fieldSize,
          y: Phaser.Math.RND.between(1, _vFields - 1) * _fieldSize,
          fillStyle: { color: "0x61e85b", alpha: 0.8 }
        })
        .fillRect(_fieldSize, _fieldSize, _fieldSize, _fieldSize);
    }
  }
}
