/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2019 - 2020 Digitsensitive
 * @description  Arcadians: Boot Scene
 * @license      {@link https://github.com/digitsensitive/phaser3-typescript/blob/master/LICENSE.md | MIT License}
 */

import { CustomTextureService } from "../services/custom-texture.service";
import { AnimationCreatorService } from "../services/animation-creator.service";

export class BootScene extends Phaser.Scene {
  // services
  private animationCreatorInstance: AnimationCreatorService;

  private loadingBar: Phaser.GameObjects.Graphics;
  private progressBar: Phaser.GameObjects.Graphics;

  constructor() {
    super({
      key: "BootScene"
    });
  }

  preload(): void {
    // set the background, create the loading and progress bar and init values
    // with the global data manager (= this.registry)
    this.createLoadingGraphics();

    // pass value to change the loading bar fill
    this.load.on(
      "progress",
      function(value) {
        this.progressBar.clear();
        this.progressBar.fillStyle(0x88e453, 1);
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
        this.animationCreatorInstance = new AnimationCreatorService(
          this,
          this.cache.json.get("animations")
        );
        this.progressBar.destroy();
        this.loadingBar.destroy();
      },
      this
    );

    // load our package
    this.load.pack("preload", "../assets/pack.json", "preload");
  }

  update(): void {
    // create custom textures
    this.createCustomTextures();

    // start main menu
    this.scene.start("MainMenuScene");
  }

  private createLoadingGraphics(): void {
    this.loadingBar = this.add.graphics();
    this.loadingBar.fillStyle(0xffffff, 1);
    this.loadingBar.fillRect(
      this.cameras.main.width / 4 - 2,
      this.cameras.main.height / 2 - 18,
      this.cameras.main.width / 2 + 4,
      20
    );
    this.progressBar = this.add.graphics();
  }

  private createCustomTextures(): void {
    CustomTextureService.create({
      graphic: new Phaser.GameObjects.Graphics(this),
      key: "player",
      colors: [0x1238d8, 0x128364],
      pixels: [
        [0, 0, 1, 1, 0, 0],
        [0, 0, 1, 1, 0, 0],
        [0, 1, 2, 2, 1, 0],
        [1, 0, 1, 1, 0, 1],
        [0, 0, 1, 1, 0, 0],
        [0, 1, 1, 1, 1, 0],
        [0, 1, 1, 1, 1, 0],
        [0, 0, 2, 2, 0, 0]
      ]
    });

    CustomTextureService.create({
      graphic: new Phaser.GameObjects.Graphics(this),
      key: "bullet",
      colors: [0x1238d8, 0x128364],
      pixels: [
        [0, 0, 2, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0]
      ]
    });

    CustomTextureService.create({
      graphic: new Phaser.GameObjects.Graphics(this),
      key: "soren",
      colors: [0xd9c700, 0x422264],
      pixels: [
        [0, 2, 0, 0, 2, 0, 2, 0, 0, 2, 0],
        [2, 0, 0, 0, 2, 0, 2, 0, 0, 0, 2],
        [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
        [2, 0, 0, 2, 1, 2, 1, 2, 0, 0, 2],
        [2, 2, 0, 2, 1, 2, 1, 2, 0, 2, 2],
        [2, 2, 0, 2, 2, 2, 2, 2, 0, 2, 2],
        [2, 0, 0, 0, 2, 2, 2, 0, 0, 0, 2],
        [0, 2, 0, 0, 0, 2, 0, 0, 0, 2, 0]
      ]
    });
  }
}
