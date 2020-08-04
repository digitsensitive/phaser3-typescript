/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2020 digitsensitive
 * @description  Factory Method: Kanye
 * @license      Digitsensitive
 */

import { Enemy } from "./enemy";

export class Kanye extends Enemy {
  constructor(params) {
    super(params);
    this.dexterity = 8;
    this.intelligence = 2;
    this.strength = 4;
    this.setTint(0x3495eb);
  }
}
