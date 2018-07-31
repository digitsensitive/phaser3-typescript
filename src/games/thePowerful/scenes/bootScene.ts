/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 Digitsensitive
 * @description  The Powerful: Boot Scene
 * @license      Digitsensitive
 */

import { AnimationHelper } from "../helper/animation-helper";

export class BootScene extends Phaser.Scene {
  private loadingBar: Phaser.GameObjects.Graphics;
  private progressBar: Phaser.GameObjects.Graphics;

  private animationHelperInstance: AnimationHelper;

  constructor() {
    super({
      key: "BootScene"
    });
  }

  preload(): void {
    // set the background and create loading bar
    this.cameras.main.setBackgroundColor(0x98d687);
    this.createLoadingbar();

    // pass value to change the loading bar fill
    this.load.on(
      "progress",
      function(value) {
        this.progressBar.clear();
        this.progressBar.fillStyle(0xfff6d3, 1);
        this.progressBar.fillRect(
          this.cameras.main.width / 4,
          this.cameras.main.height / 2 - 16,
          (this.cameras.main.width / 2) * value,
          16
        );
      },
      this
    );

    // delete bar graphics, when loading complete
    this.load.on(
      "complete",
      function() {
        this.animationHelperInstance = new AnimationHelper(
          this,
          this.cache.json.get("animationJSON")
        );
        this.progressBar.destroy();
        this.loadingBar.destroy();
      },
      this
    );

    // load out package
    this.load.pack(
      "preload",
      "./src/games/thePowerful/assets/pack.json",
      "preload"
    );
  }

  create(): void {
    Phaser.GameObjects.BitmapText["ParseFromAtlas"](
      this,
      "powerful",
      "atlas",
      "powerful",
      "powerfulXML"
    );
    this.initRegistry();
    this.scene.launch("HeadUpDisplayScene");
    this.scene.start("GameScene");
    this.scene.bringToTop("HeadUpDisplayScene");
  }

  private createLoadingbar(): void {
    this.loadingBar = this.add.graphics();
    this.loadingBar.fillStyle(0x5dae47, 1);
    this.loadingBar.fillRect(
      this.cameras.main.width / 4 - 2,
      this.cameras.main.height / 2 - 18,
      this.cameras.main.width / 2 + 4,
      20
    );
    this.progressBar = this.add.graphics();
  }

  /**
   * Build-in global game data manager to exchange data between scenes.
   * Here we initialize our variables with a key.
   */
  private initRegistry(): void {
    this.registry.set("newGame", true);
    this.registry.set("health", 3);
    this.registry.set("coins", 0);
    this.registry.set("load", "Level1");
    this.registry.set("currentCoins", 0);
    this.registry.set("spawn", "spawnCenter");
  }
}
