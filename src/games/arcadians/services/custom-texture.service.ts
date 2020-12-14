/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2019 - 2020 digitsensitive
 * @description  Custom Texture Service
 *               A Simple Service to create custom textures for game objects.
 * @version      1.0.0
 * @license      {@link https://github.com/digitsensitive/phaser3-typescript/blob/master/LICENSE.md | MIT License}
 */

interface ITextureParams {
  graphic: Phaser.GameObjects.Graphics;
  key: string;
  colors: number[];
  pixels: number[][];
}

export abstract class CustomTextureService {
  public static create(params: ITextureParams): void {
    params.graphic.clear();

    for (let y = 0; y < params.pixels.length; y++) {
      for (let x = 0; x < params.pixels[y].length; x++) {
        if (params.pixels[y][x] === 0) {
          continue;
        } else {
          params.graphic.fillStyle(params.colors[params.pixels[y][x] - 1], 1);
          params.graphic.fillRect(x, y, 1, 1);
        }
      }
    }

    params.graphic.generateTexture(
      params.key,
      params.pixels[0].length,
      params.pixels.length
    );
  }
}
