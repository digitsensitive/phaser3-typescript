/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2020 Digitsensitive
 * @description  Dungeon: Main Menu Scene
 * @license      {@link https://github.com/digitsensitive/phaser3-typescript/blob/master/LICENSE.md | MIT License}
 */

import { CommonFunctionsService } from "../services/common-functions.service";

export class MainMenuScene extends Phaser.Scene {
  private infoText: Phaser.GameObjects.BitmapText;
  private startKey: Phaser.Input.Keyboard.Key;
  private titleText: Phaser.GameObjects.BitmapText;

  constructor() {
    super({
      key: "MainMenuScene"
    });
  }

  init(): void {
    this.startKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
    this.startKey.isDown = false;
    this.initGlobalDataManager();
  }

  create(): void {
    this.infoText = this.add.bitmapText(
      0,
      0,
      "beeb",
      "Press SPACE BAR to continue",
      8
    );

    CommonFunctionsService.setBitmapTextToCenter(this, this.infoText);

    this.add.tween({
      targets: this.infoText,
      duration: 800,
      ease: "Power0",
      props: { alpha: 0 },
      repeat: -1,
      yoyo: true
    });

    this.titleText = this.add.bitmapText(0, 50, "beeb", "Dungeon", 8);
    this.titleText.setTintFill(0x1238d8);
    this.titleText.x = CommonFunctionsService.getCenterXPositionOfBitmapText(
      this,
      this.titleText.width
    );
  }

  update(): void {
    if (this.startKey.isDown) {
      this.scene.start("HUDScene");
      this.scene.start("GameScene");
      this.scene.bringToTop("HUDScene");
    }
  }

  private initGlobalDataManager(): void {
    this.registry.set("currentLevel", 0);
    this.registry.set("highscore", 0);
    this.registry.set("lives", 2);
    this.registry.set("score", 0);
  }
}
