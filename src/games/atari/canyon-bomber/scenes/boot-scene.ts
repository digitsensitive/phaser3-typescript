/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2019 - 2020 Digitsensitive
 * @description  Canyon Bomber: Boot Scene
 * @license      {@link https://github.com/digitsensitive/phaser3-typescript/blob/master/LICENSE.md | MIT License}
 */

export class BootScene extends Phaser.Scene {
  constructor() {
    super({
      key: "BootScene"
    });
  }

  preload(): void {
    this.initGlobalDataManager();

    // load out package
    this.load.pack(
      "preload",
      "./src/games/atari/canyon-bomber/assets/pack.json",
      "preload"
    );
  }

  update(): void {
    this.scene.start("HUDScene");
    this.scene.start("GameScene");
    this.scene.bringToTop("HUDScene");
  }

  private initGlobalDataManager(): void {
    this.registry.set("blackScore", 0);
    this.registry.set("blackMisses", 3);
    this.registry.set("whiteScore", 0);
    this.registry.set("whiteMisses", 3);
  }
}
