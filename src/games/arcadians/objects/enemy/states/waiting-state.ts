/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2019 - 2020 Digitsensitive
 * @description  Arcadians: Enemy Waiting State
 * @license      {@link https://github.com/digitsensitive/phaser3-typescript/blob/master/LICENSE.md | MIT License}
 */

import { EnemyState } from "./enemy-state";
import { EnemyAttackState } from "./attack-state";

export class EnemyWaitingState extends EnemyState {
  public enter(): void {}

  public update(): void {
    // update position manually
    this.enemy.x += this.enemy.getCurrentSpeed();

    if (this.enemy.getIsAttacking()) {
      this.enemy.transitionTo(new EnemyAttackState());
    }
  }

  public exit(): void {}
}
