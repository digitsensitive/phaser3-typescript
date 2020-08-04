/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2020 digitsensitive
 * @description  Factory Method: Wallace
 * @license      Digitsensitive
 */

import { Enemy } from "./enemy";

export class Wallace extends Enemy {
  constructor(params) {
    super(params);
    this.dexterity = 3;
    this.intelligence = 8;
    this.strength = 4;
  }
}
