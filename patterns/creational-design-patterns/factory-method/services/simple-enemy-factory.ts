/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2020 digitsensitive
 * @description  Factory Method: Simple Enemy Factory
 * @license      Digitsensitive
 */

import { Enemy } from "../objects/enemy";
import { Wallace } from "../objects/wallace";
import { Bobbie } from "../objects/bobbie";
import { Kanye } from "../objects/kanye";

export type EnemyTypes = "bobbie" | "wallace" | "kanye";

export interface IEnemyFactoryCreate {
  type: EnemyTypes;
  x: number;
  y: number;
}

/**
 * Example of a simple factory pattern
 * The class has one creation method with a switch-case statement.
 * Depending on parameters (enemy type) the method returns different
 * enemy types.
 */
export class SimpleEnemyFactory {
  private currentScene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    this.currentScene = scene;
  }

  public create(params: IEnemyFactoryCreate): Enemy {
    switch (params.type) {
      case "bobbie":
        return new Bobbie({
          scene: this.currentScene,
          x: params.x,
          y: params.y,
          key: "enemy",
        });

      case "wallace":
        return new Wallace({
          scene: this.currentScene,
          x: params.x,
          y: params.y,
          key: "enemy",
        });
      case "kanye":
        return new Kanye({
          scene: this.currentScene,
          x: params.x,
          y: params.y,
          key: "enemy",
        });
      default:
        break;
    }
  }
}
