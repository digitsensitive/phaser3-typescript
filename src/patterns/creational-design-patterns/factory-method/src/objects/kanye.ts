import { ImageConstructor } from '../interfaces/image.interface';
import { Enemy } from './enemy';

export class Kanye extends Enemy {
  constructor(params: ImageConstructor) {
    super(params);
    this.dexterity = 8;
    this.intelligence = 2;
    this.strength = 4;
    this.setTint(0x3495eb);
  }
}
