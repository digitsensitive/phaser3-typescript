/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 Digitsensitive
 * @description  River Raid: Game Scene
 * @license      Digitsensitive
 */

import { Boat } from "../objects/boat";
import { Player } from "../objects/player";
import { LevelParser } from "../parser/level";
import { Tile } from "../objects/tile";

export class GameScene extends Phaser.Scene {
  private levelParser: LevelParser;
  private arrayWithMapKeys: string[];
  private arrayWithMapData: any[];
  private groundTiles: Phaser.GameObjects.Group;
  private waterTiles: Phaser.GameObjects.Group;
  private enemyBoats: Phaser.GameObjects.Group;

  private currentMapPart: number;
  private player: Player;

  constructor() {
    super({
      key: "GameScene"
    });
  }

  init(): void {
    this.levelParser = new LevelParser(this);
    this.arrayWithMapKeys = ["ORS", "ORM", "ORS", "ORM", "ORS"];
    this.arrayWithMapData = [];

    for (let i = 0; i < 2; i++) {
      this.arrayWithMapData[i] = this.levelParser.parseMapSection(
        this.arrayWithMapKeys[i],
        i
      );
    }

    // add game objects groups and push objects
    this.groundTiles = this.add.group({ classType: Tile });
    this.waterTiles = this.add.group({ classType: Tile });
    this.enemyBoats = this.add.group({ classType: Boat });

    for (let i = 0; i < this.arrayWithMapData.length; i++) {
      for (let j = 0; j < this.arrayWithMapData[i].groundTiles.length; j++) {
        this.groundTiles.add(
          new Tile({
            scene: this,
            x: this.arrayWithMapData[i].groundTiles[j].x,
            y: this.arrayWithMapData[i].groundTiles[j].y,
            key: "landscape",
            frame: 1
          })
        );
      }

      for (let j = 0; j < this.arrayWithMapData[i].waterTiles.length; j++) {
        this.waterTiles.add(
          new Tile({
            scene: this,
            x: this.arrayWithMapData[i].waterTiles[j].x,
            y: this.arrayWithMapData[i].waterTiles[j].y,
            key: "landscape",
            frame: 0
          })
        );
      }

      for (let j = 0; j < this.arrayWithMapData[i].boats.length; j++) {
        this.enemyBoats.add(
          new Boat({
            scene: this,
            x: this.arrayWithMapData[i].boats[j].x,
            y: this.arrayWithMapData[i].boats[j].y,
            key: "boat"
          })
        );
      }
    }

    this.currentMapPart = 1;
  }

  create(): void {
    this.player = new Player({
      scene: this,
      x: this.sys.canvas.width / 2 - 3,
      y: this.sys.canvas.height - 10,
      key: "player"
    });

    this.cameras.main.setSize(96, 120);
    this.cameras.main.startFollow(this.player);
  }

  update(): void {
    this.player.update();

    /*  if (
      Math.floor(
        this.player.y % (this.currentMapPart * -this.sys.canvas.height)
      ) === 0
    ) {
      this.currentMapPart++;
      console.log("Hello");
    }*/

    this.enemyBoats.children.each(function(boat) {
      boat.update();
    }, this);

    // check collision player vs. ground tiles
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
    aEnemy.setActive(false);
    aBullet.setActive(false);
  }

  private collidePlayerWithEnemyBoats(aEnemy: Boat): void {
    aEnemy.setActive(false);
    this.player.setActive(false);
  }
}
