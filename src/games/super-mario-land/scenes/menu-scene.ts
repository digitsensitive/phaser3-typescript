/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2019 Digitsensitive
 * @description  Tank: Menu Scene
 * @license      Digitsensitive
 */

export class MenuScene extends Phaser.Scene {
  private startKey: Phaser.Input.Keyboard.Key;
  private bitmapTexts: Phaser.GameObjects.BitmapText[] = [];

  constructor() {
    super({
      key: "MenuScene"
    });
  }

  init(): void {
    this.startKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.S
    );
    this.startKey.isDown = false;
  }

  create(): void {
    this.bitmapTexts.push(
      this.add.bitmapText(
        this.sys.canvas.width / 2 - 50,
        this.sys.canvas.height / 2,
        "font",
        "PRESS S TO PLAY",
        12
      )
    );

    this.bitmapTexts.push(
      this.add.bitmapText(
        this.sys.canvas.width / 2 - 40,
        this.sys.canvas.height / 2 - 40,
        "font",
        "Super Mario Land",
        12
      )
    );
  }

  update(): void {
    if (this.startKey.isDown) {
      this.scene.start("GameScene");
    }
  }
}
