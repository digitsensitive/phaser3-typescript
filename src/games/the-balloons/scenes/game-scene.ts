/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 Digitsensitive
 * @description  The Balloons: Game Scene
 * @license      Digitsensitive
 */

import { Player } from "../objects/player";
import { PlayerContainer } from "../objects/player-container";

export class GameScene extends Phaser.Scene {
  private playerContainer: Phaser.GameObjects.Container;
  private plattform: Phaser.Physics.Arcade.Image;
  private plattform2: Phaser.Physics.Arcade.Image;
  private plattform3: Phaser.Physics.Arcade.Image;

  constructor() {
    super({
      key: "GameScene"
    });
  }

  init(): void {}

  create(): void {
    this.playerContainer = new PlayerContainer({
      scene: this,
      x: 0,
      y: 0
    });
   
    this.plattform = this.physics.add.staticImage(40, 200, "plattform");
    this.plattform2 = this.physics.add.staticImage(216, 200, "plattform");
    this.plattform3 = this.physics.add.staticImage(120, 100, "plattform");

    this.physics.add.collider(this.playerContainer, [
      this.plattform,
      this.plattform2,
      this.plattform3
    ]);
  }

  update(): void {
    if (this.playerContainer.active) {
      this.playerContainer.update();
    }

    //this.physics.collide(this.playerContainer, this.plattform);
  }
}
