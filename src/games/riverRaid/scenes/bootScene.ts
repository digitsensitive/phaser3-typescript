/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 Digitsensitive
 * @description  River Raid: Boot Scene
 * @license      Digitsensitive
 */
import { CONST } from "../const/levelData";

export class BootScene extends Phaser.Scene {
  constructor() {
    super({
      key: "BootScene"
    });
  }

  preload(): void {
    this.load.spritesheet(
      "landscape",
      "./assets/games/riverRaid/landscape.png",
      {
        frameWidth: CONST.TILESIZE,
        frameHeight: CONST.TILESIZE
      }
    );
    this.load.spritesheet("player", "./assets/games/riverRaid/player.png", {
      frameWidth: CONST.TILESIZE,
      frameHeight: CONST.TILESIZE
    });
    this.load.spritesheet("boat", "./assets/games/riverRaid/boat.png", {
      frameWidth: CONST.TILESIZE,
      frameHeight: CONST.TILESIZE
    });
    this.load.spritesheet("bridge", "./assets/games/riverRaid/bridge.png", {
      frameWidth: CONST.TILESIZE,
      frameHeight: CONST.TILESIZE
    });
  }

  update(): void {
    this.scene.start("MainMenuScene");
  }
}
