/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2020 Digitsensitive
 * @description  Factory Method: Factory Method Scene
 * @license      Digitsensitive
 */

import { Enemy } from "../objects/enemy";
import {
  BobbieEnemyFactory,
  WallaceEnemyFactory,
  KanyeEnemyFactory,
} from "../services/enemy-factory";

export class FactoryMethodScene extends Phaser.Scene {
  private bobbieEnemyFactory: BobbieEnemyFactory;
  private wallaceEnemyFactory: WallaceEnemyFactory;
  private kanyeEnemyFactory: KanyeEnemyFactory;

  private enemies: Phaser.GameObjects.Group;

  constructor() {
    super({
      key: "FactoryMethodScene",
    });
  }

  init(): void {
    this.bobbieEnemyFactory = new BobbieEnemyFactory();
    this.wallaceEnemyFactory = new WallaceEnemyFactory();
    this.kanyeEnemyFactory = new KanyeEnemyFactory();

    this.enemies = this.add.group({
      runChildUpdate: true,
    });
  }

  create(): void {
    this.enemies.add(
      this.bobbieEnemyFactory.create({ scene: this, x: 20, y: 20 })
    );
    this.enemies.add(
      this.wallaceEnemyFactory.create({ scene: this, x: 20, y: 60 })
    );
    this.enemies.add(
      this.kanyeEnemyFactory.create({ scene: this, x: 20, y: 100 })
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
