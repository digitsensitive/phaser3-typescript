export class MenuScene extends Phaser.Scene {
  private startKey: Phaser.Input.Keyboard.Key;
  private bitmapTexts: Phaser.GameObjects.BitmapText[] = [];

  constructor() {
    super({
      key: 'MenuScene'
    });
  }

  init(): void {
    this.startKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.S
    );
    this.startKey.isDown = false;
    this.initRegistry();
  }

  create(): void {
    var guideText = this.add.bitmapText(
      this.sys.canvas.width / 2 ,
      this.sys.canvas.height / 2,
      'font',
      'PRESS S TO PLAY',
      8
    )
      .setScale(0,0)
      .setOrigin(0.5, 0.5)
      .setAlpha(0)

    this.bitmapTexts.push(
      guideText
    );
    var titleText = this.add.bitmapText(
      this.sys.canvas.width / 2 - 60,
      this.sys.canvas.height / 2 - 40,
      'font',
      'SPACE INVADERS',
      8
    ).setScale(0,0);
    this.bitmapTexts.push(
      titleText
    );

    this.tweens.add({
      targets: this.bitmapTexts,
      ease: 'Power1',
      duration: 2000,
      angle: 360,
      alpha: 1,
      scaleX: 1,
      scaleY: 1,
      yoyo: false,
      repeat: 0,
    });
  }

  update(): void {
    if (this.startKey.isDown) {
      this.tweens.add({
        targets: this.bitmapTexts[1],
        ease: 'Power1',
        duration: 1000,
        y: -10,
        yoyo: false,
        repeat: 0,
      });

      this.tweens.add({
        targets: this.bitmapTexts[0],
        ease: 'Power1',
        duration: 1000,
        y: this.cameras.main.height +10,
        yoyo: false,
        repeat: 0,
        onComplete: () => {
          this.scene.start('HUDScene');
          this.scene.start('GameScene');
          this.scene.bringToTop('HUDScene');
        }
      });
    }
  }

  /**
   * Build-in global game data manager to exchange data between scenes.
   * Here we initialize our variables with a key.
   */
  private initRegistry(): void {
    this.registry.set('points', 0);
    this.registry.set('lives', 3);
    this.registry.set('level', 1);
  }
}
