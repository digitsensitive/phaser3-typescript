/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2019 - 2020 Digitsensitive
 * @description  Princess: Player
 * @license      {@link https://github.com/digitsensitive/phaser3-typescript/blob/master/LICENSE.md | MIT License}
 */

import { GameObject } from "./gameobject";
import { GameSettings } from "../const";

export class Player extends GameObject {
  private gridPosition: Phaser.Geom.Point;

  constructor(params) {
    super(params);

    this.gridPosition = new Phaser.Geom.Point(params.x, params.y);
    this.updateRealPositionOnGrid();
  }

  public update() {
    this.updateRealPositionOnGrid();
  }

  public updateRealPositionOnGrid(): void {
    this.x = this.gridPosition.x * GameSettings.TILESIZE;
    this.y = this.gridPosition.y * GameSettings.TILESIZE;
  }

  /*
  public tweenTo(x: number, y: number): void {
    this.scene.add.tween({
      targets: this,
      props: {
        x: x,
        y: y
      },
      duration: 30,
      ease: "Power0",
      yoyo: false
    });
  }*/
}
