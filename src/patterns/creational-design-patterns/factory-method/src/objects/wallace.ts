import { ImageConstructor } from '../interfaces/image.interface';
import { Enemy } from './enemy';

export class Wallace extends Enemy {
  constructor(params: ImageConstructor) {
    super(params);
    this.dexterity = 3;
    this.intelligence = 8;
    this.strength = 4;
  }
}
