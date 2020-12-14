/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2020 Digitsensitive
 * @description  Dungeon: Game Scene
 * @license      {@link https://github.com/digitsensitive/phaser3-typescript/blob/master/LICENSE.md | MIT License}
 */

import { Player } from "../objects/player";
import { Goomba } from "../objects/goomba";

export class GameScene extends Phaser.Scene {
  // tilemap
  private map: Phaser.Tilemaps.Tilemap;
  private tileset: Phaser.Tilemaps.Tileset;
  private backgroundLayer: Phaser.Tilemaps.StaticTilemapLayer;
  private foregroundLayer: Phaser.Tilemaps.StaticTilemapLayer;

  // game objects
  private enemies: Phaser.GameObjects.Group;
  private player: Player;

  constructor() {
    super({
      key: "GameScene"
    });
  }

  init(): void {}

  create(): void {
    // *****************************************************************
    // SETUP TILEMAP
    // *****************************************************************

    // create our tilemap from Tiled JSON
    this.map = this.make.tilemap({
      data: [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [7, 7, 7, 7, 7, 7, 7, 7],
        [7, 7, 7, 7, 7, 7, 7, 7],
        [7, 7, 7, 7, 7, 7, 7, 7],
        [7, 7, 7, 7, 7, 7, 7, 7],
        [7, 7, 7, 7, 7, 7, 7, 7],
        [7, 7, 7, 7, 7, 7, 7, 7],
        [7, 7, 7, 7, 7, 7, 7, 7],
        [1, 1, 1, 1, 1, 1, 1, 1]
      ],
      tileWidth: 18,
      tileHeight: 18
    });

    // add our tileset and layers to our tilemap
    this.tileset = this.map.addTilesetImage("tiles");
    const layer = this.map.createStaticLayer(0, this.tileset, 0, 0);

    // *****************************************************************
    // GAME OBJECTS
    // *****************************************************************
    this.enemies = this.add.group({
      runChildUpdate: true
    });

    this.player = new Player({
      scene: this,
      x: 1,
      y: 1,
      key: "player"
    });

    this.enemies.add(
      new Goomba({
        scene: this,
        x: 200,
        y: 50,
        key: "goomba"
      })
    );

    // *****************************************************************
    // COLLIDERS
    // *****************************************************************
  }

  update(): void {
    this.player.update();
  }
}
