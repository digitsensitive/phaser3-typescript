/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2020 Digitsensitive
 * @description  Custom Textures: Boot Scene
 * @license      {@link https://github.com/digitsensitive/phaser3-typescript/blob/master/LICENSE.md | MIT License}
 */

import { CustomTextureService } from "../services/custom-texture.service";

export class BootScene extends Phaser.Scene {
  constructor() {
    super({
      key: "BootScene"
    });
  }

  update(): void {
    // create custom textures
    this.createCustomTextures();

    // start game scene
    this.scene.start("GameScene");
  }

  private createCustomTextures(): void {
    CustomTextureService.create({
      graphic: new Phaser.GameObjects.Graphics(this),
      key: "diamond",
      colors: [0xffffff, 0xef7aff, 0x87ff8f],
      pixels: [
        [0, 0, 0, 1, 2, 0, 0, 0],
        [0, 0, 1, 1, 2, 2, 0, 0],
        [0, 1, 1, 1, 2, 2, 2, 0],
        [1, 1, 1, 1, 2, 2, 2, 2],
        [2, 2, 2, 2, 3, 3, 3, 3],
        [0, 2, 2, 2, 3, 3, 3, 0],
        [0, 0, 2, 2, 3, 3, 0, 0],
        [0, 0, 0, 2, 3, 0, 0, 0]
      ]
    });

    CustomTextureService.create({
      graphic: new Phaser.GameObjects.Graphics(this),
      key: "heart",
      colors: [0xff5b43, 0xffffff],
      pixels: [
        [0, 1, 1, 0, 0, 1, 1, 0],
        [1, 2, 2, 1, 1, 1, 1, 1],
        [1, 2, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
        [0, 1, 1, 1, 1, 1, 1, 0],
        [0, 0, 1, 1, 1, 1, 0, 0],
        [0, 0, 0, 1, 1, 0, 0, 0]
      ]
    });
  }
}
