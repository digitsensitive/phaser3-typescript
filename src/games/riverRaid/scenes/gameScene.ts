/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 Digitsensitive
 * @description  River Raid: Game Scene
 * @license      Digitsensitive
 */

import { Boat } from "../objects/boat";
import { Bridge } from "../objects/bridge";
import { Player } from "../objects/player";
import { LevelParser } from "../parser/level";
import { Tile } from "../objects/tile";

export class GameScene extends Phaser.Scene {
  // level
  private levelParser: LevelParser;
  private arrayWithMapKeys: string[];

  // objects
  private player: Player;
  private groundTiles: Tile[];
  private enemyBoats: Phaser.GameObjects.Group;
  private bridges: Phaser.GameObjects.Group;

  // variables
  private currentSegment: number;
  private listWithNumberTilesPerSegment: number[];

  constructor() {
    super({
      key: "GameScene"
    });
  }

  init(): void {
    this.levelParser = new LevelParser(this);
    this.arrayWithMapKeys = ["ORS", "ORM", "ORL", "TRL"];
    this.listWithNumberTilesPerSegment = [];
    this.currentSegment = 0;
  }

  create(): void {
    // add game objects groups and push objects
    this.groundTiles = [];
    this.bridges = this.add.group({ classType: Bridge });
    this.enemyBoats = this.add.group({ classType: Boat });

    this.pushNewLevelSection(0);
    this.pushNewLevelSection(1);

    this.player = new Player({
      scene: this,
      x: this.sys.canvas.width / 2 - 3,
      y: this.sys.canvas.height - 10,
      key: "player"
    });
  }

  update(): void {
    if (
      this.listWithNumberTilesPerSegment[0] === 0 &&
      this.listWithNumberTilesPerSegment.length !== 0
    ) {
      this.pushNewLevelSection(1);
      this.listWithNumberTilesPerSegment.splice(0, 1);
    }

    this.player.update();

    this.enemyBoats.children.each(function(boat) {
      boat.update();
    }, this);

    this.bridges.children.each(function(bridge) {
      bridge.update();
    }, this);

    for (let i = this.groundTiles.length - 1; i >= 0; i--) {
      this.groundTiles[i].update();

      if (this.groundTiles[i].y > this.sys.canvas.height) {
        this.groundTiles[i].setActive(false);
        this.listWithNumberTilesPerSegment[0]--;
        this.groundTiles.splice(i, 1);
      }
    }

    //check collision player vs. ground tiles
    this.physics.overlap(
      this.player,
      this.groundTiles,
      this.collidePlayerAndGroundTile,
      null,
      this
    );

    // check collision enemies vs. bullets
    this.physics.overlap(
      this.enemyBoats,
      this.player.getBullets(),
      this.collideEnemyBoatsWithBullet,
      null,
      this
    );

    // check collision bridges vs. bullets
    this.physics.overlap(
      this.bridges,
      this.player.getBullets(),
      this.collideBridgesWithBullet,
      null,
      this
    );

    // check collision player vs. enemies
    this.physics.overlap(
      this.player,
      this.enemyBoats,
      this.collidePlayerWithEnemyBoats,
      null,
      this
    );

    if (!this.player.active) {
      this.scene.start("MainMenuScene");
    }
  }

  private collidePlayerAndGroundTile(): void {
    this.player.setActive(false);
  }

  private collideEnemyBoatsWithBullet(aEnemy: Boat, aBullet: any): void {
    if (aEnemy.active) {
      aEnemy.setActive(false);
      aBullet.setActive(false);
    }
  }

  private collidePlayerWithEnemyBoats(aEnemy: Boat): void {
    aEnemy.setActive(false);
    this.player.setActive(false);
  }

  private collideBridgesWithBullet(aBridge: Bridge, aBullet: any): void {
    aBridge.setActive(false);
    aBullet.setActive(false);
  }

  private pushNewLevelSection(aNumber: number): void {
    // choose a random section (with two exceptions)
    let section = "";
    if (this.currentSegment === 0) {
      section = "START";
      this.currentSegment++;
    } else if (this.currentSegment === 5) {
      section = "BRIDGE";
      this.currentSegment = 1;
    } else {
      section = this.arrayWithMapKeys[
        Math.floor(Math.random() * this.arrayWithMapKeys.length)
      ];
      this.currentSegment++;
    }

    // parse level data for the selected section
    let data = [];
    data[0] = this.levelParser.parseMapSection(section, aNumber);

    let mapData = data[0].mapData;
    let objects = data[0].objects;

    // push number of ground tiles into list
    // this number is necessary to track if the segment is gone
    this.listWithNumberTilesPerSegment.push(mapData.length);

    // make out of the parsed level data the actual sprites
    for (let j = 0; j < mapData.length; j++) {
      this.groundTiles.push(
        new Tile({
          scene: this,
          x: mapData[j].x,
          y: mapData[j].y,
          key: "landscape",
          frame: mapData[j].frame
        })
      );
    }

    for (let j = 0; j < objects.length; j++) {
      if (objects[j].type === "boat") {
        this.enemyBoats.add(
          new Boat({
            scene: this,
            x: objects[j].x,
            y: objects[j].y,
            key: "boat"
          })
        );
      } else if (objects[j].type === "bridge") {
        this.bridges.add(
          new Bridge({
            scene: this,
            x: objects[j].x,
            y: objects[j].y,
            key: "bridge"
          })
        );
      } else if (objects[j].type === "helicopter") {
      } else if (objects[j].type === "health") {
      }
    }
  }
}
