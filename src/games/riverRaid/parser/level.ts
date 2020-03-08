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
    let mapSectionData = { mapData: [], objects: [] };

    // fetch level data
    let levelSection = LEVELDATA.find(
      section => section.SHORTNAME === aLevelSection
    );

    let mapData = levelSection.MAPDATA;
    let objects = levelSection.OBJECTS;

    // get map data and put into array
    for (let y = 0; y < mapData.length; y++) {
      for (let x = 0; x < mapData[y].length; x++) {
        let tile = mapData[y][x];
        let xPos = x * CONST.TILESIZE;
        let yPos = y * CONST.TILESIZE - aIndex * this.gameHeight;
        if (tile !== 0) {
          mapSectionData.mapData.push({
            x: xPos,
            y: yPos,
            frame: tile
          });
        }
      }
    }

    // get objects and put into array
    for (let i = 0; i < objects.length; i++) {
      if (objects[i].random) {
        mapSectionData.objects.push(
          this.createObject(objects[i].type, aIndex, mapData)
        );
      } else {
        mapSectionData.objects.push({
          type: objects[i].type,
          x: objects[i].x * CONST.TILESIZE,
          y: objects[i].y * CONST.TILESIZE - aIndex * this.gameHeight
        });
      }
    }

    return mapSectionData;
  }

  private createObject(
    aType: string,
    aSectionIndex: number,
    aTiles: number[][]
  ): object {
    let object = {};
    let x = 0;
    let y = 0;
    // create random x and y position for the object
    do {
      x = Math.floor(Math.random() * this.gameWidth / CONST.TILESIZE) + 0;
      y = Math.floor(Math.random() * this.gameHeight / CONST.TILESIZE) + 0;

      object = {
        type: aType,
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
