import { CONST } from "../const/const";

export class Cell extends Phaser.GameObjects.Graphics {
  private value: number;

  constructor(params) {
    super(params.scene, params.options);

    this.fillStyle(CONST.FIELD_COLOR, CONST.FIELD_ALPHA);
    this.fillRect(params.x, params.y, CONST.CELLSIZE, CONST.CELLSIZE);

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
