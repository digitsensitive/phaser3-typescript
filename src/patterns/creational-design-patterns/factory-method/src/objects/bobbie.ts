import { ImageConstructor } from '../interfaces/image.interface';
import { Enemy } from './enemy';

export class Bobbie extends Enemy {
  constructor(params: ImageConstructor) {
    super(params);
    this.dexterity = 4;
    this.intelligence = 4;
    this.strength = 7;
    this.setTint(0x32a881);
  }
}
