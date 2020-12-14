/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2019 - 2020 Digitsensitive
 * @description  Arcadians: Enemy Attack State
 * @license      {@link https://github.com/digitsensitive/phaser3-typescript/blob/master/LICENSE.md | MIT License}
 */

import { EnemyState } from "./enemy-state";
import { Enemy } from "../enemy";
import { EnemyWaitingState } from "./waiting-state";
import { Bullet } from "../../bullet";

export class EnemyAttackState extends EnemyState {
  private attackTween: Phaser.Tweens.Tween;
  private attackTimer: Phaser.Time.TimerEvent;

  public enter(): void {
    this.attackTimer = this.scene.time.addEvent({
      delay: Phaser.Math.RND.between(300, 1000),
      callback: this.createBullet,
      callbackScope: this,
      loop: true
    });
  }

  public update(): void {
    this.enemy.y += Phaser.Math.RND.between(0.4, 0.8);
    this.enemy.x += Phaser.Math.RND.between(-0.1, 0.1);

    if (this.enemy.y > this.scene.sys.canvas.height) {
      this.enemy.y = 0;
      this.enemy.x = this.enemy.getCurrentPositionInFormation().x;
      this.enemy.transitionTo(new EnemyWaitingState());
    }
  }

  private createBullet(): void {
    this.enemy.getBullets().add(
      new Bullet({
        scene: this.scene,
        x: this.enemy.x,
        y: this.enemy.y - this.enemy.height,
        key: "bullet",
        speed: 200
      })
    );
  }

  public exit(): void {
    this.attackTimer.destroy();
    this.enemy.setAttacking();
    this.attackTween = this.scene.add.tween({
      targets: this.enemy,
      duration: 500,
      ease: "Power0",
      props: {
        x: this.enemy.getCurrentPositionInFormation().x,
        y: this.enemy.getCurrentPositionInFormation().y
      },
      repeat: 0,
      yoyo: false,
      onComplete: () => {
        this.enemy.x = this.enemy.getCurrentPositionInFormation().x;
        this.enemy.y = this.enemy.getCurrentPositionInFormation().y;
      }
    });
  }
}
