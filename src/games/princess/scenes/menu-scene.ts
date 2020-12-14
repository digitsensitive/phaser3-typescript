import { GameSettings } from "../const";

/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2019 - 2020 Digitsensitive
 * @description  Princess: Menu Scene
 * @license      {@link https://github.com/digitsensitive/phaser3-typescript/blob/master/LICENSE.md | MIT License}
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
        this.sys.canvas.width / 2 - 120,
        this.sys.canvas.height / 2,
        "font",
        "PRESS S TO PLAY",
        8
      )
    );

    this.bitmapTexts[0].x = this.getCenterXPositionOfBitmapText(
      this.bitmapTexts[0].width
    );

    this.bitmapTexts.push(
      this.add.bitmapText(
        this.sys.canvas.width / 2 - 118,
        this.sys.canvas.height / 2 - 49,
        "font",
        "PRINCESS",
        10
      )
    );

    this.bitmapTexts[1].x = this.getCenterXPositionOfBitmapText(
      this.bitmapTexts[1].width
    );
    this.bitmapTexts[1].setTintFill(0x416e12);

    this.bitmapTexts.push(
      this.add.bitmapText(
        this.sys.canvas.width / 2 - 120,
        this.sys.canvas.height / 2 - 50,
        "font",
        "PRINCESS",
        10
      )
    );

    this.bitmapTexts[2].x = this.getCenterXPositionOfBitmapText(
      this.bitmapTexts[2].width
    );

    this.drawColorPalette();
  }

  update(): void {
    if (this.startKey.isDown) {
      this.registry.set("playerCanMove", true);
      this.scene.start("GameScene");
    }
  }

  private drawColorPalette(): void {
    // Loop through the colors of the color palette and draw them on screen
    const numberColors = GameSettings.COLORS.length;
    for (let i = 0; i < numberColors; i++) {
      const graphics = this.add.graphics({
        lineStyle: { color: GameSettings.COLORS[i] }
      });

      const rect = new Phaser.Geom.Rectangle(
        1 + i * 1,
        i * 1,
        this.sys.canvas.width - (1 + i * 2),
        this.sys.canvas.height - (1 + i * 2)
      );
      graphics.strokeRectShape(rect);
    }
  }

  private getCenterXPositionOfBitmapText(width: number): number {
    return this.sys.canvas.width / 2 - width / 2;
  }
}
