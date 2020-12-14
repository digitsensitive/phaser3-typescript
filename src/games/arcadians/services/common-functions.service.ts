/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2019 - 2020 digitsensitive
 * @description  Common Functions Service
 *               A Simple Service with useful common functions.
 * @version      1.0.0
 * @license      {@link https://github.com/digitsensitive/phaser3-typescript/blob/master/LICENSE.md | MIT License}
 */

export abstract class CommonFunctionsService {
  public static setBitmapTextToCenter(
    scene: Phaser.Scene,
    bitmapText: Phaser.GameObjects.BitmapText
  ): void {
    bitmapText.x = this.getCenterXPositionOfBitmapText(scene, bitmapText.width);
    bitmapText.y = this.getCenterYPositionOfBitmapText(
      scene,
      bitmapText.height
    );
  }

  public static getCenterXPositionOfBitmapText(
    scene: Phaser.Scene,
    width: number
  ): number {
    return scene.sys.canvas.width / 2 - width / 2;
  }

  public static getCenterYPositionOfBitmapText(
    scene: Phaser.Scene,
    height: number
  ): number {
    return scene.sys.canvas.height / 2 - height / 2;
  }
}
