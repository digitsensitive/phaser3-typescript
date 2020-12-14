/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2019 - 2020 Digitsensitive
 * @description  43' Game Scene
 * @license      {@link https://github.com/digitsensitive/phaser3-typescript/blob/master/LICENSE.md | MIT License}
 */

import { Player } from "../objects/player";
import { CloudBuildingService } from "../services/cloud-building.service";
import { Cloud } from "../objects/cloud";

export class GameScene extends Phaser.Scene {
  // game objects
  private background: Phaser.GameObjects.TileSprite;
  private player: Player;
  private clouds: Cloud[];

  // timers
  private cloudTimer: Phaser.Time.TimerEvent;

  // services
  private cloudBuildingInstance: CloudBuildingService;

  constructor() {
    super({
      key: "GameScene"
    });
  }

  init(): void {
    this.clouds = [];

    // services
    this.cloudBuildingInstance = new CloudBuildingService();
  }

  create(): void {
    this.background = this.add
      .tileSprite(0, 0, 256, 224, "background")
      .setOrigin(0, 0);

    this.player = new Player({
      scene: this,
      x: 100,
      y: 100,
      key: "player"
    });
    this.player.setDepth(1);

    // timer
    this.cloudTimer = this.time.addEvent({
      delay: 6000,
      callback: () => {
        let newClouds = this.cloudBuildingInstance.createNewGroup(this);
        this.clouds.concat(newClouds);
      },
      callbackScope: this,
      loop: true
    });
  }

  update(): void {
    this.background.tilePositionY -= 1;
    this.player.update();
  }
}
