/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2019 - 2020 Digitsensitive
 * @description  Arcadians: Enemy State
 * @license      {@link https://github.com/digitsensitive/phaser3-typescript/blob/master/LICENSE.md | MIT License}
 */

import { Enemy } from "../enemy";

export abstract class EnemyState {
  protected enemy: Enemy;
  protected scene: Phaser.Scene;

  constructor() {}

  public setContext(enemy: Enemy, scene: Phaser.Scene) {
    this.enemy = enemy;
    this.scene = scene;
  }

  public abstract enter(): void;

  public abstract update(): void;

  public abstract exit(): void;
}
