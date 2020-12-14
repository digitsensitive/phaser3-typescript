/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2019 - 2020 Digitsensitive
 * @description  Draw: Boot Scene
 * @license      {@link https://github.com/digitsensitive/phaser3-typescript/blob/master/LICENSE.md | MIT License}
 */

export class BootScene extends Phaser.Scene {
  private loadingBar: Phaser.GameObjects.Graphics;
  private progressBar: Phaser.GameObjects.Graphics;

  constructor() {
    super({
      key: "BootScene"
    });
  }

  preload(): void {
    // create the loading and progress bar
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
        this.progressBar.destroy();
        this.loadingBar.destroy();
      },
      this
    );

    // load our package
    this.load.pack("drawPackage", "./assets/pack.json", "drawPackage");
  }

  init(): void {
    this.initRegistry();
  }

  update(): void {
    this.scene.start("SpriteEditorScene");
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

  private initRegistry(): void {
    this.registry.set("currentColor", 0);
  }
}
