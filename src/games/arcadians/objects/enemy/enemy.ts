/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2019 - 2020 Digitsensitive
 * @description  Arcadians: Enemy
 * @license      {@link https://github.com/digitsensitive/phaser3-typescript/blob/master/LICENSE.md | MIT License}
 */

import { EnemyState } from "./states/enemy-state";

export class Enemy extends Phaser.GameObjects.Sprite {
  body: Phaser.Physics.Arcade.Body;
  private bullets: Phaser.GameObjects.Group;
  protected currentState: EnemyState;
  protected dyingScoreValue: number;
  protected livePoints: number;
  protected currentPositionInFormation: Phaser.Math.Vector2;
  protected speedInFormation: number;
  protected currentDeltaMoveValue: number;
  protected maxDeltaMoveValue: number;
  protected isAttacking: boolean;

  public getCurrentSpeed(): number {
    return this.speedInFormation;
  }

  public getCurrentPositionInFormation(): Phaser.Math.Vector2 {
    return this.currentPositionInFormation;
  }

  public setAttacking(): void {
    this.isAttacking = !this.isAttacking;
  }

  public getIsAttacking(): boolean {
    return this.isAttacking;
  }

  public getBullets(): Phaser.GameObjects.Group {
    return this.bullets;
  }

  constructor(params) {
    super(params.scene, params.x, params.y, params.key, params.frame);

    this.initVariables();
    this.initSprite();
    this.initPhysics();

    this.scene.add.existing(this);
  }

  private initVariables() {
    this.bullets = this.scene.add.group({
      runChildUpdate: true
    });
    this.isAttacking = false;
    this.currentPositionInFormation = new Phaser.Math.Vector2(this.x, this.y);
    this.speedInFormation = -0.2;
    this.currentDeltaMoveValue = 0;
    this.maxDeltaMoveValue = 30;
  }

  private initSprite() {
    this.setOrigin(0, 0);
    this.setFrame(0);
    this.setScale(1);
  }

  private initPhysics(): void {
    this.scene.physics.world.enable(this);
    this.body.setSize(this.width, this.height);
  }

  update(): void {}

  protected updatePositionInFormation(): void {
    // update position manually
    this.currentPositionInFormation.x += this.speedInFormation;
    this.currentDeltaMoveValue += this.speedInFormation;

    if (Math.abs(this.currentDeltaMoveValue) > this.maxDeltaMoveValue) {
      this.speedInFormation = -this.speedInFormation;
    }
  }

  private gotHit(): void {
    this.livePoints -= 1;

    // short hit alpha yoyo tween
    this.scene.add.tween({
      targets: this,
      props: {
        alpha: 0
      },
      duration: 100,
      ease: "Power0",
      yoyo: true
    });

    // check if the enemy is dead
    if (this.livePoints === 0) {
      // show the score and add it to the main score
      this.showAndAddScore();

      // destroy the enemy
      this.destroy();
    }
  }

  private showAndAddScore(): void {
    // add the score to the main score
    this.scene.registry.values.score += this.dyingScoreValue;
    this.scene.events.emit("scoreChanged");

    // create text
    let scoreText = this.scene.add
      .bitmapText(
        this.x,
        this.y - 20,
        "beeb",
        this.dyingScoreValue.toString(),
        8
      )
      .setOrigin(0, 0);

    // add a nice tween to it
    this.scene.add.tween({
      targets: scoreText,
      props: {
        y: scoreText.y - 25,
        alpha: 0
      },
      duration: 800,
      ease: "Power0",
      yoyo: false,
      onComplete: function() {
        scoreText.destroy();
      }
    });
  }

  public transitionTo(newEnemyState: EnemyState): void {
    this.currentState.exit();
    this.currentState = newEnemyState;
    this.currentState.setContext(this, this.scene);
    this.currentState.enter();
  }
}
