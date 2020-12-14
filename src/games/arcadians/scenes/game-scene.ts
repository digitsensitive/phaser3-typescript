/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2019 - 2020 Digitsensitive
 * @description  Arcadians: Game Scene
 * @license      {@link https://github.com/digitsensitive/phaser3-typescript/blob/master/LICENSE.md | MIT License}
 */

import { Enemy } from "../objects/enemy/enemy";
import { LEVELS } from "../const/levels";
import { Player } from "../objects/player";
import { Soren } from "../objects/enemy/soren";
import { Zell } from "../objects/enemy/zell";

export class GameScene extends Phaser.Scene {
  private enemies: Phaser.GameObjects.Group;
  private player: Player;
  private timerToPickRandomEnemyToFight: Phaser.Time.TimerEvent;

  constructor() {
    super({
      key: "GameScene"
    });
  }

  init(): void {
    this.enemies = this.add.group({ runChildUpdate: true });
  }

  create(): void {
    // loop through current level
    let currentLevel = LEVELS[this.registry.get("currentLevel")].data;

    // create enemies
    for (let y = 0; y < currentLevel.length; y++) {
      for (let x = 0; x < currentLevel[y].length; x++) {
        let currentEnemyType = currentLevel[y][x];

        if (currentEnemyType === 0) {
          continue;
        } else {
          if (currentEnemyType === 1) {
            this.enemies.add(
              new Zell({
                scene: this,
                key: "zell",
                x: 75 + x * 15,
                y: 50 + y * 20
              })
            );
          } else if (currentEnemyType === 2) {
            this.enemies.add(
              new Soren({
                scene: this,
                key: "soren",
                x: 75 + x * 15,
                y: 50 + y * 20
              })
            );
          }
        }
      }
    }
    // create player
    this.player = new Player({
      scene: this,
      key: "player",
      x: 150,
      y: 200
    });

    // *****************************************************************
    // COLLIDERS
    // *****************************************************************
    this.physics.add.overlap(
      this.player.getBullets(),
      this.enemies,
      this.bulletHitEnemy,
      null,
      this
    );

    this.physics.add.overlap(
      this.player,
      this.enemies,
      this.playerHitEnemy,
      null,
      this
    );

    // *****************************************************************
    // TIMER
    // *****************************************************************

    this.timerToPickRandomEnemyToFight = this.time.addEvent({
      delay: Phaser.Math.RND.between(6000, 8000),
      callback: this.pickRandomEnemyToFight,
      callbackScope: this,
      loop: true
    });
  }

  update(): void {
    if (this.player.active) {
      this.player.update();

      this.enemies.children.each((enemy: Enemy) => {
        enemy.update();
      }, this);
    }

    if (this.registry.get("lives") < 0 || this.enemies.getLength() === 0) {
      this.scene.start("MainMenuScene");
      this.scene.stop("HUDScene");
    }
  }

  private bulletHitEnemy(bullet, enemy): void {
    if (enemy.visible) {
      // destroy the current bullet
      bullet.destroy();

      // call the got hit function of the enemy
      enemy.gotHit();

      // shake the camera
      this.cameras.main.shake(300, 0.003);
    }
  }

  private playerHitEnemy(player, enemy): void {
    // kill the player
    player.gotHit();

    // kill the enemy
    enemy.destroy();

    // shake the camera
    this.cameras.main.shake(300, 0.003);
  }

  private pickRandomEnemyToFight(): void {
    let GetAll = Phaser.Utils.Array.GetAll;
    let GetRandom = Phaser.Utils.Array.GetRandom;
    let numberOfEnemies = Phaser.Math.RND.integerInRange(1, 2);

    for (let i = 0; i < numberOfEnemies; i++) {
      let enemy = GetRandom(
        GetAll(this.enemies.getChildren(), "isAttacking", false)
      );
      enemy.setAttacking();
    }
  }
}
