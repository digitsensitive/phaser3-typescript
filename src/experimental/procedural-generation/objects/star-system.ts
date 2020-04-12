/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2020 Digitsensitive
 * @description  Prodecural Generation: Star System
 * @license      Digitsensitive
 */

import { GALAXY } from "../const/galaxy";
import { IStarSystemConstructor } from "../interfaces/interfaces";

export class StarSystem {
  private circle: Phaser.GameObjects.Arc;
  private starSystemExists: boolean;
  private position: Phaser.Math.Vector2;
  private radius: number;
  private color: number;
  private alpha: number;
  private rnd: Phaser.Math.RandomDataGenerator;
  private scene: Phaser.Scene;

  constructor(params: IStarSystemConstructor) {
    this.scene = params.scene;
    this.position = new Phaser.Math.Vector2(params.x, params.y);
    // Create a random seed, which depends on the x and y value
    // So we get for each x and y value the same seed
    let seed = 1586603672891738926694102 * this.position.x * this.position.y;

    // Push that seed into the random data generator of Phaser
    this.rnd = new Phaser.Math.RandomDataGenerator([seed.toString()]);

    // Check if the star systems exist or not
    this.starSystemExists = this.rnd.between(0, 20) === 1 ? true : false;

    // Only if the star systems exist, we should create it
    if (this.starSystemExists) {
      // Generate a random radius
      this.radius = this.rnd.between(0, 8);

      // Generate a random color
      this.color =
        GALAXY.planetColors[
          this.rnd.between(0, GALAXY.planetColors.length - 1)
        ];

      // Generate random alpha
      this.alpha = this.rnd.realInRange(0.5, 1);

      // Create circle
      this.circle = this.scene.add
        .circle(
          this.position.x,
          this.position.y,
          this.radius,
          this.color,
          this.alpha
        )
        .setInteractive();
    }
  }

  public isStarSystemAlive(): boolean {
    return this.starSystemExists;
  }
}
