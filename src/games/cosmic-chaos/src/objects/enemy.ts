import { EnemyConstructor } from '../interfaces/enemy.interface';

export class Enemy extends Phaser.GameObjects.Sprite {
  protected value: number;

  constructor(params: EnemyConstructor) {
    super(params.scene, params.x, params.y, params.texture, params.frame);

    this.scene.add.existing(this);
  }

  public getValue(): number {
    return this.value;
  }
}
