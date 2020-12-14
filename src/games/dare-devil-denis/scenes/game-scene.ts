/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2019 - 2020 Digitsensitive
 * @description  Dare Devil Denis: Game Scene
 * @license      {@link https://github.com/digitsensitive/phaser3-typescript/blob/master/LICENSE.md | MIT License}
 */

import { Denis } from "../objects/denis";
import { Tile } from "../objects/tile";

export class GameScene extends Phaser.Scene {
  private denis: Denis;

  private terrain: Phaser.GameObjects.Group;

  constructor() {
    super({
      key: "GameScene"
    });
  }

  create(): void {
    this.terrain = this.add.group({
      runChildUpdate: true
    });

    for (let i = 0; i < 25; i++) {
      this.terrain.add(
        new Tile({ scene: this, x: i * 32, y: 148, key: "tile" })
      );

      this.terrain.add(
        new Tile({ scene: this, x: i * 32, y: 288, key: "tile" })
      );

      this.terrain.add(
        new Tile({ scene: this, x: i * 32, y: 428, key: "tile" })
      );

      this.terrain.add(
        new Tile({ scene: this, x: i * 32, y: 568, key: "tile" })
      );
    }

    this.denis = new Denis({
      scene: this,
      x: 40,
      y: 100,
      key: "denis"
    });

    // *****************************************************************
    // COLLIDERS
    // *****************************************************************
    this.physics.add.collider(this.denis, this.terrain);
  }

  update(): void {
    this.denis.update();
  }
}
