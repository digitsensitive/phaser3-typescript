export class BootScene extends Phaser.Scene {
  private loadingBar: Phaser.GameObjects.Graphics;
  private progressBar: Phaser.GameObjects.Graphics;

  constructor() {
    super({
      key: 'BootScene'
    });
  }

  preload(): void {
    // set the background and create loading bar
    this.cameras.main.setBackgroundColor(0x1a1a2e);
    this.createLoadingbar();

    // pass value to change the loading bar fill
    this.load.on(
      'progress',
      function (value: number) {
        this.progressBar.clear();
        this.progressBar.fillStyle(0x00ff00, 1);
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
      'complete',
      function () {
        this.progressBar.destroy();
        this.loadingBar.destroy();
      },
      this
    );

    // Generate pixel art graphics
    this.generateGraphics();
  }

  update(): void {
    this.scene.start('MainMenuScene');
  }

  private createLoadingbar(): void {
    this.loadingBar = this.add.graphics();
    this.loadingBar.fillStyle(0x4444ff, 1);
    this.loadingBar.fillRect(
      this.cameras.main.width / 4 - 2,
      this.cameras.main.height / 2 - 18,
      this.cameras.main.width / 2 + 4,
      20
    );
    this.progressBar = this.add.graphics();
  }

  private generateGraphics(): void {
    // Generate frog texture
    const frogGraphics = this.make.graphics({ x: 0, y: 0, add: false });
    frogGraphics.fillStyle(0x00cc00, 1);
    frogGraphics.fillRect(0, 0, 16, 16);
    frogGraphics.fillStyle(0x00aa00, 1);
    frogGraphics.fillRect(2, 2, 4, 4);
    frogGraphics.fillRect(10, 2, 4, 4);
    frogGraphics.fillRect(4, 10, 8, 2);
    frogGraphics.generateTexture('frog', 16, 16);
    frogGraphics.destroy();

    // Generate car texture
    const carGraphics = this.make.graphics({ x: 0, y: 0, add: false });
    carGraphics.fillStyle(0xff0000, 1);
    carGraphics.fillRect(0, 0, 32, 16);
    carGraphics.fillStyle(0xffff00, 1);
    carGraphics.fillRect(4, 2, 4, 4);
    carGraphics.fillRect(20, 2, 4, 4);
    carGraphics.generateTexture('car', 32, 16);
    carGraphics.destroy();

    // Generate safe zone texture
    const safeGraphics = this.make.graphics({ x: 0, y: 0, add: false });
    safeGraphics.fillStyle(0x00ff00, 1);
    safeGraphics.fillRect(0, 0, 320, 40);
    safeGraphics.generateTexture('safe-zone', 320, 40);
    safeGraphics.destroy();
  }
}
