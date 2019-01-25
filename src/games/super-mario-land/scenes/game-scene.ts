/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2019 Digitsensitive
 * @description  Super Mario Land: Game Scene
 * @license      Digitsensitive
 */

import { Mario } from "../objects/mario";

export class GameScene extends Phaser.Scene {
  // tilemap
  private map: Phaser.Tilemaps.Tilemap;
  private tileset: Phaser.Tilemaps.Tileset;
  private backgroundLayer: Phaser.Tilemaps.StaticTilemapLayer;
  private foregroundLayer: Phaser.Tilemaps.StaticTilemapLayer;

  // game objects
  private player: Mario;

  constructor() {
    super({
      key: "GameScene"
    });
  }

  init(): void {}

  create(): void {
    // tilemap
    // create our tilemap from Tiled JSON
    this.map = this.make.tilemap({ key: "level1" });

    // add our tileset and layers to our tilemap
    this.tileset = this.map.addTilesetImage("tiles");
    this.backgroundLayer = this.map.createStaticLayer(
      "backgroundLayer",
      this.tileset,
      0,
      0
    );
    this.foregroundLayer = this.map.createStaticLayer(
      "foregroundLayer",
      this.tileset,
      0,
      0
    );

    // set collision for tiles with the property collide set to true
    this.foregroundLayer.setCollisionByProperty({ collide: true });

    // game objects
    this.loadObjectsFromTilemap();

    // add colliders
    this.physics.add.collider(this.player, this.foregroundLayer);

    // set our main camera
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setBounds(
      0,
      0,
      this.map.widthInPixels,
      this.map.heightInPixels
    );
  }

  update(): void {
    this.player.update();
  }

  private loadObjectsFromTilemap(): void {
    // get the object layer in the tilemap named 'objects'
    const objects = this.map.getObjectLayer("objects").objects as any[];

    objects.forEach(object => {
      if (object.type === "player") {
        this.player = new Mario({
          scene: this,
          x: object.x,
          y: object.y,
          key: "mario"
        });
      }
    });
  }
}
