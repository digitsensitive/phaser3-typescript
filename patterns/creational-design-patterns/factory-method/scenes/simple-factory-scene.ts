/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2020 Digitsensitive
 * @description  Factory Method: Simple Factory Scene
 * @license      Digitsensitive
 */

import { SimpleEnemyFactory } from "../services/simple-enemy-factory";
import { Enemy } from "../objects/enemy";

export class SimpleFactoryScene extends Phaser.Scene {
  private enemyFactory: SimpleEnemyFactory;
  private enemies: Phaser.GameObjects.Group;

  constructor() {
    super({
      key: "SimpleFactoryScene",
    });
  }

  init(): void {
    this.enemyFactory = new SimpleEnemyFactory(this);

    this.enemies = this.add.group({
      runChildUpdate: true,
    });
  }

  create(): void {
    this.enemies.add(
      this.enemyFactory.create({ type: "bobbie", x: 20, y: 20 })
    );
    this.enemies.add(
      this.enemyFactory.create({ type: "wallace", x: 20, y: 60 })
    );
    this.enemies.add(
      this.enemyFactory.create({ type: "kanye", x: 20, y: 100 })
    );

    this.enemies.children.each((enemy: Enemy) => {
      this.add.bitmapText(
        enemy.x + 20,
        enemy.y - 3,
        "font",
        "D:" +
          enemy.getDexterity() +
          " " +
          "I:" +
          enemy.getIntelligence() +
          " " +
          "S:" +
          enemy.getStrength(),
        8
      );
    }, this);
  }
}
