/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2019 - 2020 Digitsensitive
 * @description  Arcadians: HUD Scene
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
        "HIGHSCORE",
        this.addText(220, 8, `HIGHSCORE ${this.registry.get("highscore")}`)
      ],
      ["LIVES", this.addText(20, 230, `LIVES ${this.registry.get("lives")}`)],
      ["SCORE", this.addText(20, 8, `SCORE ${this.registry.get("score")}`)]
    ]);

    // create events
    const level = this.scene.get("GameScene");
    level.events.on("scoreChanged", this.updateScore, this);
    level.events.on("highscoreChanged", this.updateHighscore, this);
    level.events.on("livesChanged", this.updateLives, this);
  }

  private addText(
    x: number,
    y: number,
    value: string
  ): Phaser.GameObjects.BitmapText {
    return this.add.bitmapText(x, y, "beeb", value, 8);
  }

  private updateScore() {
    this.textElements
      .get("SCORE")
      .setText(`SCORE ${this.registry.get("score")}`)
      .setX(40 - 8 * (this.registry.get("score").toString().length - 1));
  }

  private updateHighscore() {
    this.textElements
      .get("HIGHSCORE")
      .setText(`HIGHSCORE ${this.registry.get("highscore")}`)
      .setX(200 - 8 * (this.registry.get("highscore").toString().length - 1));
  }

  private updateLives() {
    this.textElements
      .get("LIVES")
      .setText(`LIVES ${this.registry.get("lives")}`);
  }
}
