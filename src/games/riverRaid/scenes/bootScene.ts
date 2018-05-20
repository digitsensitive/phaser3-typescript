/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 Digitsensitive
 * @description  River Raid: Boot Scene
 * @license      Digitsensitive
 */

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
        frameWidth: 6,
        frameHeight: 6
      }
    );
    this.load.spritesheet("player", "./assets/games/riverRaid/player.png", {
      frameWidth: 6,
      frameHeight: 6
    });
    this.load.spritesheet("boat", "./assets/games/riverRaid/boat.png", {
      frameWidth: 6,
      frameHeight: 6
    });
  }

  update(): void {
    this.scene.start("MainMenuScene");
  }
}
