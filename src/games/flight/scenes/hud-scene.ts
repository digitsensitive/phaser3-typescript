/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2019 - 2020 Digitsensitive
 * @description  43' Hud Scene
 * @license      {@link https://github.com/digitsensitive/phaser3-typescript/blob/master/LICENSE.md | MIT License}
 */

export class HUDScene extends Phaser.Scene {
  private textElements: Map<string, Phaser.GameObjects.BitmapText>;

  constructor() {
    super({
      key: "HUDScene"
    });
  }

  create(): void {
    this.textElements = new Map([
      ["SCORE", this.addText(40, 8, `${this.registry.get("score")}`)]
    ]);

    // create events
    const level = this.scene.get("GameScene");

    level.events.on("scoreChanged", this.updateScore, this);
  }

  private addText(
    x: number,
    y: number,
    value: string
  ): Phaser.GameObjects.BitmapText {
    return this.add.bitmapText(x, y, "font", value, 8);
  }

  private updateScore() {
    this.textElements
      .get("SCORE")
      .setText(`${this.registry.get("score")}`)
      .setX(40 - 8 * (this.registry.get("score").toString().length - 1));
  }
}
