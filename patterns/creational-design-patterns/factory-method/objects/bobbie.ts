/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2020 digitsensitive
 * @description  Factory Method: Bobbie
 * @license      Digitsensitive
 */

import { Enemy } from "./enemy";

export class Bobbie extends Enemy {
  constructor(params) {
    super(params);
    this.dexterity = 4;
    this.intelligence = 4;
    this.strength = 7;
    this.setTint(0x32a881);
  }
}
