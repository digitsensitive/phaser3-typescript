/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2019 Digitsensitive
 * @description  Super Mario Land: Game Scene
 * @license      Digitsensitive
 */

import { Box } from "../objects/box";
import { Brick } from "../objects/brick";
import { Goomba } from "../objects/goomba";
import { Mario } from "../objects/mario";
import { Platform } from "../objects/platform";

export class GameScene extends Phaser.Scene {
  // tilemap
  private map: Phaser.Tilemaps.Tilemap;
  private tileset: Phaser.Tilemaps.Tileset;
  private backgroundLayer: Phaser.Tilemaps.StaticTilemapLayer;
  private foregroundLayer: Phaser.Tilemaps.StaticTilemapLayer;

  // game objects
  private boxes: Phaser.GameObjects.Group;
  private bricks: Phaser.GameObjects.Group;
  private enemies: Phaser.GameObjects.Group;
  private platforms: Phaser.GameObjects.Group;
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
    this.foregroundLayer.setName("foregroundLayer");

    // set collision for tiles with the property collide set to true
    this.foregroundLayer.setCollisionByProperty({ collide: true });

    // game objects
    this.boxes = this.add.group({
      classType: Box,
      runChildUpdate: true
    });

    this.bricks = this.add.group({
      classType: Brick,
      runChildUpdate: true
    });

    this.enemies = this.add.group({
      runChildUpdate: true
    });

    this.platforms = this.add.group({
      classType: Platform,
      runChildUpdate: true
    });

    this.loadObjectsFromTilemap();

    // add colliders
    this.physics.add.collider(this.player, this.foregroundLayer);
    this.physics.add.collider(this.player, this.boxes);
    this.physics.add.collider(this.player, this.bricks);
    this.physics.add.overlap(
      this.player,
      this.enemies,
      this.handlePlayerEnemyCollision,
      null,
      this
    );

    this.physics.add.collider(
      this.player,
      this.platforms,
      this.handlePlayerOnPlatform,
      null,
      this
    );

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

      if (object.type === "goomba") {
        this.enemies.add(
          new Goomba({
            scene: this,
            x: object.x,
            y: object.y,
            key: "goomba"
          })
        );
      }

      if (object.type === "boxWithCoin") {
        this.boxes.add(
          new Box({
            scene: this,
            x: object.x,
            y: object.y,
            key: "boxQuestion",
            insideBox: "coin"
          })
        );
      }

      if (object.type === "boxWithRotatingCoin") {
        this.boxes.add(
          new Box({
            scene: this,
            x: object.x,
            y: object.y,
            key: "boxQuestion",
            insideBox: "rotatingCoin"
          })
        );
      }

      if (object.type === "brick") {
        this.boxes.add(
          new Brick({
            scene: this,
            x: object.x,
            y: object.y,
            key: "brick"
          })
        );
      }

      if (object.type === "platformMovingUpAndDown") {
        this.platforms.add(
          new Platform({
            scene: this,
            x: object.x,
            y: object.y,
            key: "platform",
            tweenProps: {
              y: {
                value: 50,
                duration: 1500,
                ease: "Power0"
              }
            }
          })
        );
      }

      if (object.type === "platformMovingLeftAndRight") {
        this.platforms.add(
          new Platform({
            scene: this,
            x: object.x,
            y: object.y,
            key: "platform",
            tweenProps: {
              x: {
                value: object.x + 50,
                duration: 1200,
                ease: "Power0"
              }
            }
          })
        );
      }
    });
  }

  // TODO!!!
  private handlePlayerOnPlatform(player, platform): void {
    if (
      platform.body.moves &&
      platform.body.touching.up &&
      player.body.touching.down
    ) {
    }
  }

  private handlePlayerEnemyCollision(player, enemy): void {
    if (player.body.touching.down && enemy.body.touching.up) {
      this.add.tween({
        targets: player,
        props: { y: player.y - 5 },
        duration: 50,
        ease: "Power2",
        yoyo: false
      });
      enemy.gotHitOnHead();
      this.add.tween({
        targets: enemy,
        props: { alpha: 0 },
        duration: 1000,
        ease: "Power0",
        yoyo: false,
        onComplete: function() {
          enemy.destroy();
        }
      });
    } else {
      // player got hit
      player.gotHit();
    }
  }
}
