/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2019 - 2020 Digitsensitive
 * @description  Graphics Helper
 * @license      {@link https://github.com/digitsensitive/phaser3-typescript/blob/master/LICENSE.md | MIT License}
 */

interface IGraphicsParams {
  graphic: Phaser.GameObjects.Graphics;
  width: number;
  height: number;
  zoom: number;
  physics: boolean;
  pixels: number[][];
}

/**
 * This is a very simple class to help create graphics out of pixels.
 */
export class GraphicsHelper {
  private scene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  /**
   * This functions takes parameters to create a graphic object.
   * You can set the width and height of the object, the zoom factor,
   * if physics is enabled or not and of course the pixels you want to draw
   * @param params
   */
  public create(params: IGraphicsParams): void {
    let graphic = params.graphic;

    // basic graphic
    graphic.clear();

    // pixels
    for (let i = 0; i < params.pixels.length; i++) {
      graphic.fillStyle(params.pixels[i][2], params.pixels[i][3]);
      graphic.fillRect(
        params.pixels[i][0] * params.zoom,
        params.pixels[i][1] * params.zoom,
        params.zoom,
        params.zoom
      );
    }

    // physics
    if (params.physics) {
      this.scene.physics.world.enable(graphic);
      graphic.body.setSize(
        params.width * params.zoom,
        params.height * params.zoom
      );
      graphic.body.setOffset(-params.width * params.zoom, 0);
      graphic.body.allowGravity = false;
    }
  }
}
