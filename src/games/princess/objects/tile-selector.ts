/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2019 - 2020 Digitsensitive
 * @description  Princess: Tile Selector
 * @license      {@link https://github.com/digitsensitive/phaser3-typescript/blob/master/LICENSE.md | MIT License}
 */

import { GameObject } from "./gameobject";
import { GameSettings } from "../const";

export class TileSelector extends GameObject {
  constructor(params) {
    super(params);

    this.scene.add.existing(this);
  }

  public updatePosition(tile: Phaser.Tilemaps.Tile): void {
    this.x = tile.x * GameSettings.TILESIZE;
    this.y = tile.y * GameSettings.TILESIZE;
  }
}
