/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 Digitsensitive
 * @description  The Powerful: Game Scene
 * @license      Digitsensitive
 */

import { Coin } from "../objects/coin";
import { Enemy } from "../objects/enemy";
import { Player } from "../objects/player";

export class GameScene extends Phaser.Scene {
  private map: Phaser.Tilemaps.Tilemap;
  private tileset: Phaser.Tilemaps.Tileset;
  private layer: Phaser.Tilemaps.StaticTilemapLayer;

  private player: Player;
  private spawnpoints: any[];
  private enemies: Phaser.GameObjects.Group;
  private enemyAttack: Phaser.GameObjects.Group;
  private pickups: Phaser.GameObjects.Group;

  constructor() {
    super({
      key: "GameScene"
    });
  }

  create(): void {
    this.cameras.main.setPosition(0, 25);
    // point the variable at the registry which is assigned either at the Preload scene or just prior to level restart
    let load = this.registry.get("load");

    // load map based on registry value, set physics bounds, and create layer
    // let map
    this.map = this.make.tilemap({ key: `${load}Map` });
    this.physics.world.bounds.width = this.map.widthInPixels;
    this.physics.world.bounds.height = this.map.heightInPixels;
    this.tileset = this.map.addTilesetImage("tiles");
    this.layer = this.map.createStaticLayer("tileLayer", this.tileset, 0, 0);
    this.layer.setCollisionByProperty({ collide: true }); //make the layer collidable by the property set on the tileset in Tiled

    this.spawnpoints = []; //create an array to hold the spawnpoints populated by converObjects()
    //set up groups, tell group to run updates on its children, then call the object conversion method
    this.enemies = this.add.group(null);
    this.enemies.runChildUpdate = true;
    this.enemyAttack = this.add.group(null);
    this.enemyAttack.runChildUpdate = true;
    this.pickups = this.add.group(null);
    this.convertObjects();

    let spawn = this.spawnpoints[this.registry.get("spawn")]; //assign spawn variable that points to the currently loaded spawnpoint

    this.player = new Player({
      scene: this,
      x: spawn.x,
      y: spawn.y
    });

    if (this.registry.get("newGame") === true) {
      this.newGame();
    }

    // CREATE collisions
    this.physics.add.collider(this.player, this.layer);
    this.physics.add.collider(this.enemies, this.layer);
  }

  update(): void {
    this.player.update();
    this.physics.overlap(this.player, this.pickups, this.pickupObject);
    this.checkIfLevelChange();
  }

  private convertObjects(): void {
    // find the object layer in the tilemap named 'objects'
    const objects = this.map.getObjectLayer("objects").objects as any[];
    const level = this.registry.get("load");
    let numberOfCoins = 1;
    let numberOfEnemies = 1;
    let regName;

    objects.forEach(object => {
      if (object.type === "spawn") {
        this.spawnpoints[object.name] = {
          x: object.x + 8,
          y: object.y - 8
        };
      }
      if (object.name === "coin") {
        regName = `${level}_Coins_${numberOfCoins}`;
        if (this.registry.get(regName) !== "picked") {
          let coin = new Coin({
            scene: this,
            x: object.x + 4,
            y: object.y - 12,
            number: numberOfCoins
          });
          this.pickups.add(coin);
          this.registry.set(regName, "active");
        }
        numberOfCoins += 1;
      }
      if (object.name === "enemy") {
        console.log("enemy");
        regName = `${level}_Enemies_${numberOfEnemies}`;
        if (this.registry.get(regName) !== "dead") {
          let enemy = new Enemy({
            scene: this,
            x: object.x,
            y: object.y - 16,
            number: numberOfEnemies
          });
          this.enemies.add(enemy);
          this.registry.set(regName, "active");
        }
        numberOfEnemies += 1;
      }
    });
  }

  private newGame(): void {
    this.registry.set("newGame", false);
  }

  private checkIfLevelChange(): void {
    //check if outside bounds, if out of bounds set load and spawn registry to appropriate value from map then tell the Level to reload
    let prop = this.map.properties as any;
    if (this.player.y < 0) {
      this.registry.set("load", prop.loadUp);
      this.registry.set("spawn", prop.spawnUp);
      this.end("restart");
    } else if (this.player.y > this.physics.world.bounds.height) {
      this.registry.set("load", prop.loadDown);
      this.registry.set("spawn", prop.spawnDown);
      this.end("restart");
    }
  }

  private pickupObject(player, object): void {
    object.pickup();
  }

  end(type) {
    //restart the scene. You can place additional cleanup functions in here

    if (type === "restart") {
      this.scene.restart();
    }
  }
}
