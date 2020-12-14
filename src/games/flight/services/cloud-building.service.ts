/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2019 - 2020 Digitsensitive
 * @description  43' Cloud Building Service
 * @license      {@link https://github.com/digitsensitive/phaser3-typescript/blob/master/LICENSE.md | MIT License}
 */

import { Cloud } from "../objects/cloud";

export class CloudBuildingService {
  private possibleNumberOfCloudsRange: [number, number];
  private cloudXPositionRange: [number, number];
  private cloudYPositionRange: [number, number];

  constructor() {
    // init predefined values
    this.possibleNumberOfCloudsRange = [3, 40];
    this.cloudXPositionRange = [-60, 60];
    this.cloudYPositionRange = [-60, 60];
  }

  public createNewGroup(scene: Phaser.Scene): Cloud[] {
    // create empty cloud array
    let clouds: Cloud[] = [];

    // pick a random number of clouds
    const numberOfClouds = Phaser.Math.Between(
      this.possibleNumberOfCloudsRange[0],
      this.possibleNumberOfCloudsRange[1]
    );

    // pick a random x position
    const randomXPosition = Phaser.Math.Between(0, scene.sys.canvas.width);

    // create the cloud images
    for (let i = 0; i < numberOfClouds; i++) {
      const randomCloudXPosition = Phaser.Math.Between(
        this.cloudXPositionRange[0],
        this.cloudXPositionRange[1]
      );
      const randomCloudYPosition = Phaser.Math.Between(
        -100 + this.cloudYPositionRange[0],
        this.cloudYPositionRange[1]
      );

      let cloud = new Cloud({
        scene: scene,
        x: randomXPosition + randomCloudXPosition,
        y: -100 + randomCloudYPosition,
        key: "cloud"
      });

      clouds.push(cloud);
    }

    return clouds;
  }
}
