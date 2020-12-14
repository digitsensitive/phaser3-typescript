/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2019 - 2020 Digitsensitive
 * @description  Princess: Princess
 * @license      {@link https://github.com/digitsensitive/phaser3-typescript/blob/master/LICENSE.md | MIT License}
 */

import { GameObject } from "./gameobject";

export class Princess extends GameObject {
  constructor(params) {
    super(params);

    this.scene.add.existing(this);
  }
}
