/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 Digitsensitive
 * @description  River Raid: Level Parser
 * @license      Digitsensitive
 */

import { LEVELDATA } from "../const/levelData";
import { CONST } from "../const/levelData";

export class LevelParser {
  private gameHeight: number;
  private gameWidth: number;

  constructor(aScene: any) {
    this.gameHeight = aScene.sys.canvas.height;
    this.gameWidth = aScene.sys.canvas.width;
  }

  public parseMapSection(aLevelSection: any, aIndex: number): {} {
    let mapObject = { tiles: [], bridges: [], boats: [] };

    let levelSection = LEVELDATA.find(
      section => section.SHORTNAME === aLevelSection
    );

    // parse level data
    let tiles = levelSection.DATA;
    let bridges = levelSection.BRIDGES;
    let boats = levelSection.BOATS;

    // put all the tiles into separate arrays
    for (let y = 0; y < tiles.length; y++) {
      for (let x = 0; x < tiles[y].length; x++) {
        let tile = tiles[y][x];
        let xPos = x * CONST.TILESIZE;
        let yPos = y * CONST.TILESIZE - aIndex * this.gameHeight;
        if (tile !== 0) {
          mapObject.tiles.push({
            x: xPos,
            y: yPos,
            frame: tile
          });
        }
      }
    }

    // put all the bridges in separate array
    for (let i = 0; i < bridges.length; i++) {
      mapObject.bridges.push({
        x: bridges[i].x * CONST.TILESIZE,
        y: bridges[i].y * CONST.TILESIZE - aIndex * this.gameHeight
      });
    }

    // put all the objects in separate array
    for (let i = 0; i < boats; i++) {
      mapObject.boats.push(this.createBoat(aIndex, tiles));
    }

    return mapObject;
  }

  private createBoat(aSectionIndex: number, aTiles: number[][]): object {
    let object = {};
    let x = 0;
    let y = 0;
    // create random x and y position for the object
    do {
      x = Math.floor(Math.random() * this.gameWidth / CONST.TILESIZE) + 0;
      y = Math.floor(Math.random() * this.gameHeight / CONST.TILESIZE) + 0;

      object = {
        x: x * CONST.TILESIZE,
        y: y * CONST.TILESIZE - aSectionIndex * this.gameHeight
      };
    } while (!this.overlap(aTiles[y][x]));

    return object;
  }

  private overlap(aNumber: number): boolean {
    if (aNumber === 1) {
      return false;
    } else {
      return true;
    }
  }
}
