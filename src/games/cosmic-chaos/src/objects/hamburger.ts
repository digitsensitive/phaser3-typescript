import { EnemyConstructor } from '../interfaces/enemy.interface';
import { Enemy } from './enemy';

export class Hamburger extends Enemy {
  constructor(params: EnemyConstructor) {
    super(params);

    this.value = 20;
  }

  update(): void {
    this.x += 1;

    if (this.x > this.scene.game.canvas.width) {
      this.x = 0;
    }
  }
}
