/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 Digitsensitive
 * @description  Snake: Main Menu Scene
 * @license      Digitsensitive
 */

export class MainMenuScene extends Phaser.Scene {
  private startText: Phaser.GameObjects.Text;
  private startKey: Phaser.Input.Keyboard.Key;

  constructor() {
    super({
      key: "MainMenuScene"
    });
  }

  init(): void {
    // add a start key "S"
    this.startKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.S
    );
  }

  create(): void {
    // create the start text "PRESS START"
    this.startText = this.add.text(
      this.sys.canvas.width / 2 - 50,
      this.sys.canvas.height / 2 - 10,
      "PRESS START [S]",
      {
        fontFamily: "Courier",
        fontSize: "12px",
        fontStyle: "",
        fill: "#4df24c"
      }
    );
  }

  update(): void {
    if (this.startKey.isDown) {
      this.scene.start("GameScene");
    }
  }
}
