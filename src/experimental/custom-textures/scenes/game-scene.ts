/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2020 Digitsensitive
 * @description  Custom Textures: Game Scene
 * @license      {@link https://github.com/digitsensitive/phaser3-typescript/blob/master/LICENSE.md | MIT License}
 */

export class GameScene extends Phaser.Scene {
  private diamond: Phaser.GameObjects.Image;
  private heart: Phaser.GameObjects.Image;

  constructor() {
    super({
      key: "GameScene"
    });
  }

  create(): void {
    this.diamond = this.add.image(75, 75, "diamond").setScale(4);
    this.heart = this.add.image(125, 75, "heart").setScale(4);
  }

  update(): void {}
}
