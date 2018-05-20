/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 Digitsensitive
 * @description  River Raid: Level Parser
 * @license      Digitsensitive
 */

import { LEVELDATA } from "../const/levelData";

export class LevelParser {
  private gameHeight: number;
  private gameWidth: number;

  constructor(aScene: any) {
    this.gameHeight = aScene.sys.canvas.height;
    this.gameWidth = aScene.sys.canvas.width;
  }

  public parseMapSection(aLevelSection: any, aIndex: number): {} {
    let mapObject = { groundTiles: [], waterTiles: [], boats: [] };

    let levelSection = LEVELDATA.find(
      section => section.SHORTNAME === aLevelSection
    );

    // parse level data
    let tiles = levelSection.DATA;
    let boats = levelSection.BOATS;

    // put all the tiles into separate arrays
    for (let y = 0; y < tiles.length; y++) {
      for (let x = 0; x < tiles[y].length; x++) {
        let tile = tiles[y][x];
        let xPos = x * 6;
        let yPos = y * 6 - aIndex * this.gameHeight;
        if (tile === 1) {
          mapObject.groundTiles.push({
            x: xPos,
            y: yPos
          });
        } else if (tile === 0) {
          mapObject.waterTiles.push({
            x: xPos,
            y: yPos
          });
        }
      }
    }

    // put all the objects in separate arrays
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
      x = Math.floor(Math.random() * this.gameWidth / 6) + 0;
      y = Math.floor(Math.random() * this.gameHeight / 6) + 0;

      object = {
        x: x * 6,
        y: y * 6 - aSectionIndex * this.gameHeight
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
