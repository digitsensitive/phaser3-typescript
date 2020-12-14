/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2019 - 2020 Digitsensitive
 * @description  Arcadians: Zell
 * @license      {@link https://github.com/digitsensitive/phaser3-typescript/blob/master/LICENSE.md | MIT License}
 */

import { Enemy } from "./enemy";
import { EnemyWaitingState } from "./states/waiting-state";

export class Zell extends Enemy {
  constructor(params) {
    super(params);

    // set specific variables for Zell
    this.dyingScoreValue = 100;
    this.livePoints = 1;

    // set the current state of Zell
    this.currentState = new EnemyWaitingState();
    this.currentState.setContext(this, this.scene);
    this.currentState.enter();
  }

  update(): void {
    // animate
    this.anims.play("zellFly", true);

    // update the current state

    // we make use of the state pattern (a behavioral design)
    this.currentState.update();

    // here we update the position in formation constantly (even if in attack state),
    // so that we can keep track of the correct position in the formation.
    // be aware, that we do not change the actual position!
    this.updatePositionInFormation();
  }
}
