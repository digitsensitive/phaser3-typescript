/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2019 Digitsensitive
 * @description  Super Mario Land: Game Scene
 * @license      Digitsensitive
 */

export class GameScene extends Phaser.Scene {
  private map: Phaser.Tilemaps.Tilemap;
  private tileset: Phaser.Tilemaps.Tileset;
  private layer: Phaser.Tilemaps.StaticTilemapLayer;

  constructor() {
    super({
      key: "GameScene"
    });
  }

  init(): void {}

  create(): void {
    // create tilemap from tiled JSON
    this.map = this.make.tilemap({ key: "level1" });

    this.tileset = this.map.addTilesetImage("tiles");
    this.layer = this.map.createStaticLayer("tileLayer", this.tileset, 0, 0);
  }

  update(): void {}
}
