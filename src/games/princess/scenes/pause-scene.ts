/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2019 - 2020 Digitsensitive
 * @description  Princess: Pause Scene
 * @license      {@link https://github.com/digitsensitive/phaser3-typescript/blob/master/LICENSE.md | MIT License}
 */

export class PauseScene extends Phaser.Scene {
  // input
  private pauseKey: Phaser.Input.Keyboard.Key;

  constructor() {
    super({
      key: "PauseScene"
    });
  }

  init(): void {
    this.pauseKey = this.input.keyboard.addKey("P");
  }

  create(): void {
    this.add.rectangle(
      0,
      0,
      this.sys.canvas.clientWidth,
      this.sys.canvas.clientHeight,
      0x000000,
      0.6
    );

    let gamePausedText = this.add
      .bitmapText(0, this.sys.canvas.height / 2, "font", "GAME PAUSED!", 10)
      .setInteractive();

    gamePausedText.x = this.getCenterXPositionOfBitmapText(
      gamePausedText.width
    );
    gamePausedText.y -= gamePausedText.height / 2;
  }

  update(): void {
    if (Phaser.Input.Keyboard.JustDown(this.pauseKey)) {
      this.scene.resume("GameScene");
      this.scene.stop("PauseScene");
    }
  }
  private getCenterXPositionOfBitmapText(width: number): number {
    return this.sys.canvas.width / 2 - width / 2;
  }
}
