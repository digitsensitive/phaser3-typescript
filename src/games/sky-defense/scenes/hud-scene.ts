export class HUDScene extends Phaser.Scene {
  private textElements: Map<string, Phaser.GameObjects.BitmapText>;
  private timer: Phaser.Time.TimerEvent;

  constructor() {
    super({
      key: "HUDScene",
    });
  }

  create(): void {
    this.textElements = new Map([
      ["LIFE", this.addText(5, 5, `LIFE: ${this.registry.get("life")}`)],
      ["SCORE", this.addText(120, 5, `SCORE: ${this.registry.get("score")}`)],
    ]);

    // create events
    const level = this.scene.get("GameScene");
    level.events.on("lifeChanged", this.updateLife, this);
    level.events.on("scoreChanged", this.updateScore, this);
  }

  private addText(
    x: number,
    y: number,
    value: string
  ): Phaser.GameObjects.BitmapText {
    return this.add.bitmapText(x, y, "font", value, 8);
  }

  private updateLife() {
    this.textElements.get("LIFE").setText(`LIFE: ${this.registry.get("life")}`);
  }

  private updateScore() {
    this.textElements
      .get("SCORE")
      .setText(`SCORE: ${this.registry.get("score")}`);
  }
}
