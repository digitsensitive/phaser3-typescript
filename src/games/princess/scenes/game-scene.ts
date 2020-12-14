/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2019 - 2020 Digitsensitive
 * @description  Princess: Game Scene
 * @license      {@link https://github.com/digitsensitive/phaser3-typescript/blob/master/LICENSE.md | MIT License}
 */

import { AStarFinder } from "astar-typescript";
import { GameSettings } from "../const";
import { Player } from "../objects/player";
import { Princess } from "../objects/princess";
import { TileSelector } from "../objects/tile-selector";

export class GameScene extends Phaser.Scene {
  // astar
  private aStarInstance: AStarFinder;
  private pathway: number[][];

  // game objects
  private pathImages: Phaser.GameObjects.Group;
  private player: Player;
  private princess: Princess;
  private tileSelector: TileSelector;

  // tilemap
  private layer: Phaser.Tilemaps.DynamicTilemapLayer;
  private map: Phaser.Tilemaps.Tilemap;
  private tileset: Phaser.Tilemaps.Tileset;

  // input
  private pauseKey: Phaser.Input.Keyboard.Key;

  constructor() {
    super({
      key: "GameScene"
    });
  }

  init(): void {
    this.initInput();
    this.initTilemap();
    this.initAStar();
  }

  private initInput(): void {
    this.pauseKey = this.input.keyboard.addKey("P");
  }

  private initTilemap(): void {
    // create tilemap from csv file
    this.map = this.make.tilemap({
      key: "map",
      tileWidth: GameSettings.TILESIZE,
      tileHeight: GameSettings.TILESIZE
    });
    this.tileset = this.map.addTilesetImage("tiles");
    this.layer = this.map.createDynamicLayer(0, this.tileset, 0, 0);
  }

  private initAStar(): void {
    // extract the pure data from the layer
    let newArray: number[][] = [];
    let mapData = this.map.layer.data;
    let mapDataLength = mapData.length;

    for (let y = 0; y < mapDataLength; y++) {
      newArray[y] = [];
      for (let x = 0; x < 9; x++) {
        newArray[y][x] = mapData[y][x].index;
      }
    }

    this.aStarInstance = new AStarFinder({
      grid: {
        matrix: newArray
      },
      diagonalAllowed: false,
      includeEndNode: false,
      includeStartNode: false
    });
  }

  create(): void {
    // create game objects
    this.player = new Player({
      scene: this,
      x: 1,
      y: 2,
      key: "player"
    });

    this.princess = new Princess({
      scene: this,
      x: 7 * GameSettings.TILESIZE,
      y: 7 * GameSettings.TILESIZE,
      key: "princess"
    });

    this.tileSelector = new TileSelector({
      scene: this,
      x: 0,
      y: 0,
      key: "marker"
    });

    this.pathImages = this.add.group();

    this.pathway = this.aStarInstance.findPath(
      {
        x: this.princess.x / GameSettings.TILESIZE,
        y: this.princess.y / GameSettings.TILESIZE
      },
      {
        x: this.player.x / GameSettings.TILESIZE,
        y: this.player.y / GameSettings.TILESIZE
      }
    );
  }

  update(): void {
    this.player.update();

    // keyboard check
    if (Phaser.Input.Keyboard.JustDown(this.pauseKey)) {
      this.scene.pause();
      this.scene.launch("PauseScene");
    }

    let tile = this.layer.getTileAtWorldXY(
      this.input.activePointer.worldX,
      this.input.activePointer.worldY
    );
    if (
      this.input.activePointer.prevPosition.x !==
        this.input.activePointer.position.x ||
      this.input.activePointer.prevPosition.y !==
        this.input.activePointer.position.y
    ) {
      this.tileSelector.updatePosition(tile);
    }

    if (this.input.activePointer.isDown) {
      if (tile.index === 8 || tile.index === 9) {
        this.map.removeTile(tile);
        this.map.putTileAt(0, tile.x, tile.y);
        this.recalculatePath();
      }
    }

    if (this.pathway) {
      for (let p of this.pathway) {
        this.pathImages.add(
          this.add
            .image(
              p[0] * GameSettings.TILESIZE,
              p[1] * GameSettings.TILESIZE,
              "path"
            )
            .setOrigin(0, 0)
        );
      }
    }
  }

  public recalculatePath(): void {
    let newArray: number[][] = [];
    let pureData = this.map.layer.data;

    for (let y = 0; y < pureData.length; y++) {
      newArray[y] = [];
      for (let x = 0; x < 9; x++) {
        newArray[y][x] = pureData[y][x].index;
      }
    }

    this.aStarInstance = new AStarFinder({
      grid: {
        matrix: newArray
      },
      diagonalAllowed: false,
      includeEndNode: false,
      includeStartNode: false
    });

    this.pathway = this.aStarInstance.findPath(
      {
        x: this.princess.x / GameSettings.TILESIZE,
        y: this.princess.y / GameSettings.TILESIZE
      },
      {
        x: this.player.x / GameSettings.TILESIZE,
        y: this.player.y / GameSettings.TILESIZE
      }
    );
    this.pathImages.clear(true);
  }
}
