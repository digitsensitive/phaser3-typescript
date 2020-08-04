/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2020 digitsensitive
 * @description  Factory Method: Enemy Factory
 * @license      Digitsensitive
 */

import { Enemy } from "../objects/enemy";
import { Wallace } from "../objects/wallace";
import { Bobbie } from "../objects/bobbie";
import { Kanye } from "../objects/kanye";

export interface IEnemyFactoryCreate {
  scene: Phaser.Scene;
  x: number;
  y: number;
}

/**
 * Example of a factory methode pattern. We have a creation method in the
 * abstract base class. The subclasses implement the method.
 */
export abstract class EnemyFactory {
  constructor() {}

  protected logCreation(name: string): void {
    console.log(name + " created! ");
  }

  protected abstract create(params: IEnemyFactoryCreate): Enemy;
}

export class BobbieEnemyFactory extends EnemyFactory {
  constructor() {
    super();
  }

  public create(params: IEnemyFactoryCreate) {
    this.logCreation("Bobbie");
    return new Bobbie({
      scene: params.scene,
      x: params.x,
      y: params.y,
      key: "enemy",
    });
  }
}

export class WallaceEnemyFactory extends EnemyFactory {
  constructor() {
    super();
  }

  public create(params: IEnemyFactoryCreate) {
    this.logCreation("Wallace");
    return new Wallace({
      scene: params.scene,
      x: params.x,
      y: params.y,
      key: "enemy",
    });
  }
}

export class KanyeEnemyFactory extends EnemyFactory {
  constructor() {
    super();
  }

  public create(params: IEnemyFactoryCreate) {
    this.logCreation("Kanye");
    return new Kanye({
      scene: params.scene,
      x: params.x,
      y: params.y,
      key: "enemy",
    });
  }
}
