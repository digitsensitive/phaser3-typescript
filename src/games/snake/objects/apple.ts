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

  constructor() {
    this.appleGraphic = null;
  }

  /**
   * Randomly generate new apple position on the field
   */
  public spawnApple(params): void {
    // generate new random position
    let randX =
      Phaser.Math.RND.between(1, params.hFields - 1) * params.fieldSize;
    let randY =
      Phaser.Math.RND.between(1, params.vFields - 1) * params.fieldSize;

    if (this.appleGraphic) {
      this.appleGraphic.x = randX;
      this.appleGraphic.y = randY;
    } else {
      this.appleGraphic = params.scene.add
        .graphics({
          x: randX,
          y: randY,
          fillStyle: { color: "0x61e85b", alpha: 0.8 }
        })
        .fillRect(
          params.fieldSize,
          params.fieldSize,
          params.fieldSize,
          params.fieldSize
        );
    }
  }
}
