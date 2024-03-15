import { CONST } from '../const/const';
import { GraphicsConstructor } from '../interfaces/graphics.interface';

export class Apple extends Phaser.GameObjects.Graphics {
  constructor(params: GraphicsConstructor) {
    super(params.scene, params.options);
    this.x = params.options.x;
    this.y = params.options.y;
    this.fillStyle(0x61e85b, 0.8);
    this.fillRect(
      CONST.FIELD_SIZE,
      CONST.FIELD_SIZE,
      CONST.FIELD_SIZE,
      CONST.FIELD_SIZE
    );
    this.scene.add.existing(this);
  }

  /**
   * Randomly generate new apple position on the field
   * @param _rndX [Random X Position]
   * @param _rndY [Random Y Position]
   */
  public newApplePosition(_rndX: number, _rndY: number): void {
    this.x = _rndX;
    this.y = _rndY;
  }
}
