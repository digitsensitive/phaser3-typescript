/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 Digitsensitive
 * @description  The Powerful: Head Up Display Scene
 * @license      Digitsensitive
 */

export class HeadUpDisplayScene extends Phaser.Scene {
  private bitmapTexts: Phaser.GameObjects.BitmapText[];

  constructor() {
    super({
      key: "HeadUpDisplayScene"
    });
  }

  init(): void {
    this.bitmapTexts = [];
  }

  create(): void {
    // create bitmap texts
    this.bitmapTexts.push(
      this.add.bitmapText(
        150,
        10,
        "powerful",
        `Health: ${this.registry.get("health")}`,
        8
      )
    );
    this.bitmapTexts.push(
      this.add.bitmapText(
        10,
        10,
        "powerful",
        `Coins: ${this.registry.get("coins")}`,
        8
      )
    );

    // create events
    const level = this.scene.get("GameScene");
    level.events.on("coinStatusChanged", this.updateCoins, this);
  }
  update(): void {}

  private updateCoins() {
    this.bitmapTexts[1].setText(`Coins: ${this.registry.get("coins")}`);
  }
}
