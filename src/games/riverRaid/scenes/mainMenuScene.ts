/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 Digitsensitive
 * @description  River Raid: Main Menu Scene
 * @license      Digitsensitive
 */

export class MainMenuScene extends Phaser.Scene {
  private startKey: Phaser.Input.Keyboard.Key;
  private bitmapTexts: Phaser.GameObjects.BitmapText[] = [];

  constructor() {
    super({
      key: "MainMenuScene"
    });
  }

  init(): void {
    this.startKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.S
    );
  }

  preload(): void {
    this.load.bitmapFont(
      "riverRaidFont",
      "./assets/games/riverRaid/riverRaidFont.png",
      "./assets/games/riverRaid/riverRaidFont.fnt"
    );
  }

  create(): void {
    this.bitmapTexts.push(
      this.add.bitmapText(
        this.sys.canvas.width / 2 - 40,
        this.sys.canvas.height / 2 - 20,
        "riverRaidFont",
        "RIVER RAID",
        8
      )
    );

    this.bitmapTexts.push(
      this.add.bitmapText(
        this.sys.canvas.width / 2 - 40,
        this.sys.canvas.height / 2 - 10,
        "riverRaidFont",
        "S: PLAY",
        8
      )
    );
  }

  update(): void {
    if (this.startKey.isDown) {
      this.scene.start("GameScene");
    }
  }
}
