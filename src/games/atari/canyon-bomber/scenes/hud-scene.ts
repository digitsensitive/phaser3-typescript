/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2019 - 2020 Digitsensitive
 * @description  Canyon Bomber: Hud Scene
 * @license      {@link https://github.com/digitsensitive/phaser3-typescript/blob/master/LICENSE.md | MIT License}
 */

export class HUDScene extends Phaser.Scene {
  private textElements: Map<string, Phaser.GameObjects.BitmapText>;
  private timer: Phaser.Time.TimerEvent;

  constructor() {
    super({
      key: "HUDScene"
    });
  }

  create(): void {
    this.textElements = new Map([
      [
        "BLACK SCORE",
        this.addText(10, 5, `SCORE ${this.registry.get("blackScore")}`)
      ],
      [
        "BLACK MISSES LEFT",
        this.addText(10, 15, `MISSES LEFT ${this.registry.get("blackMisses")}`)
      ],
      [
        "WHITE SCORE",
        this.addText(170, 5, `SCORE ${this.registry.get("whiteScore")}`)
      ],
      [
        "WHITE MISSES LEFT",
        this.addText(170, 15, `MISSES LEFT ${this.registry.get("whiteMisses")}`)
      ]
    ]);

    // create events
    const level = this.scene.get("GameScene");
    level.events.on("blackScoreChanged", this.updateBlackScore, this);
    level.events.on("blackMissedChanged", this.updateBlackMissed, this);
    level.events.on("whiteScoreChanged", this.updateWhiteScore, this);
    level.events.on("whiteMissedChanged", this.updateWhiteMissed, this);
  }

  private addText(
    x: number,
    y: number,
    value: string
  ): Phaser.GameObjects.BitmapText {
    return this.add.bitmapText(x, y, "font", value, 8);
  }

  private updateBlackScore() {
    this.textElements
      .get("BLACK SCORE")
      .setText(`SCORE ${this.registry.get("blackScore")}`)
      .setX(10);
  }

  private updateBlackMissed() {
    this.textElements
      .get("BLACK MISSES LEFT")
      .setText(`MISSES LEFT ${this.registry.get("blackMisses")}`)
      .setX(10);
  }

  private updateWhiteScore() {
    this.textElements
      .get("WHITE SCORE")
      .setText(`SCORE ${this.registry.get("whiteScore")}`)
      .setX(170);
  }

  private updateWhiteMissed() {
    this.textElements
      .get("WHITE MISSES LEFT")
      .setText(`MISSES LEFT ${this.registry.get("whiteMisses")}`)
      .setX(170);
  }
}
