import { CONST } from '../const/const';
import { ICellConstructor } from '../interfaces/graphics.interface';

export class Cell extends Phaser.GameObjects.Graphics {
  private value: number;

  constructor(aParams: ICellConstructor) {
    super(aParams.scene);

    this.fillStyle(CONST.FIELD_COLOR, CONST.FIELD_ALPHA);
    this.fillRect(aParams.x, aParams.y, CONST.CELLSIZE, CONST.CELLSIZE);

    this.setVisible(false);
    this.value = 0;
    this.scene.add.existing(this);
  }

  public getValue(): number {
    return this.value;
  }

  public setValue(value: number): void {
    this.value = value;
  }
}
