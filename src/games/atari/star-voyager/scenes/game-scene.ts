/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2019 - 2020 Digitsensitive
 * @description  Star Voyager: Game Scene
 * @license      {@link https://github.com/digitsensitive/phaser3-typescript/blob/master/LICENSE.md | MIT License}
 */

import { Enemy } from "../objects/enemy";
import { PhotonTorpedo } from "../objects/photon-torpedo";
import { Star } from "../objects/star";
import { StarPortal } from "../objects/star-portal";

export class GameScene extends Phaser.Scene {
  // objects
  private enemies: Enemy[];
  private newStarPortal: StarPortal;
  private stars: Star[];
  private photonTorpedo: PhotonTorpedo;

  // input
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  private shootingKey: Phaser.Input.Keyboard.Key;

  // timer
  private spawnEnemyTimer: Phaser.Time.TimerEvent;

  // unsorted
  private lastShootOrigin: string;
  private controls: Phaser.Cameras.Controls.SmoothedKeyControl;

  constructor() {
    super({
      key: "GameScene"
    });
  }

  init(): void {
    // init input
    this.cursors = this.input.keyboard.createCursorKeys();
    this.shootingKey = this.input.keyboard.addKey("SPACE");

    // init camera
    var controlConfig = {
      camera: this.cameras.main,
      left: this.cursors.left,
      right: this.cursors.right,
      up: this.cursors.up,
      down: this.cursors.down,
      acceleration: 0.02,
      drag: 0.0005,
      maxSpeed: 0.15
    };

    this.controls = new Phaser.Cameras.Controls.SmoothedKeyControl(
      controlConfig
    );

    this.cameras.main.setBounds(0, 0, 1152, 960).setZoom(1);
    this.cameras.main.scrollX = 384;
    this.cameras.main.scrollY = 320;

    // init variables
    this.lastShootOrigin = "RIGHT";
  }

  create(): void {
    // create objects
    this.enemies = [];

    this.newStarPortal = new StarPortal({
      scene: this,
      x: 500,
      y: 500,
      width: 4,
      height: 5
    });

    this.stars = [];
    for (let i = 0; i < 200; i++) {
      let newStar = new Star({
        scene: this,
        x: Phaser.Math.Between(-25, 25),
        y: Phaser.Math.Between(-25, 25),
        z: Phaser.Math.Between(1, 32)
      });

      this.stars.push(newStar);
    }

    this.photonTorpedo = new PhotonTorpedo({ scene: this }).setActive(false);

    // timer

    this.spawnEnemyTimer = this.time.addEvent({
      delay: 10000,
      callback: this.spawnEnemy,
      callbackScope: this,
      loop: true
    });
  }

  update(time, delta): void {
    this.events.emit("miniMapPlayerPositionChanged", [
      this.cameras.main.scrollX,
      this.cameras.main.scrollY
    ]);

    this.newStarPortal.update();
    this.controls.update(delta);
    this.stars.forEach((star: Star) => {
      if (star.visible) {
        star.update();
      } else {
        star.reset();
        star.setVisible(true);
      }
    });

    this.enemies.forEach((enemy: Enemy) => {
      if (enemy.visible) {
        enemy.update();

        if (
          Phaser.Geom.Intersects.RectangleToRectangle(
            enemy.body,
            this.photonTorpedo.body
          )
        ) {
          enemy.setVisible(false);
          // update enemy hits
          this.registry.values.enemyHits += 1;
          this.events.emit("enemyHitChanged");
        }
      } else {
        enemy.kill();
      }
    });

    this.handleShooting();

    if (this.photonTorpedo.active) {
      this.photonTorpedo.update();
    }

    // check collisions
    if (
      Phaser.Geom.Intersects.RectangleToRectangle(
        this.newStarPortal.body,
        this.photonTorpedo.body
      )
    ) {
      this.newStarPortal.setVisible(false);
    }
  }

  private handleShooting(): void {
    if (this.shootingKey.isDown && !this.photonTorpedo.active) {
      // update energy level
      this.registry.values.energyLevel -= 1;
      this.events.emit("energyLevelChanged");

      if (this.registry.values.energyLevel === 0) {
        // game over
      }

      if (this.lastShootOrigin === "RIGHT") {
        this.lastShootOrigin = "LEFT";
      } else {
        this.lastShootOrigin = "RIGHT";
      }
      this.photonTorpedo.activate(this.lastShootOrigin);
    }
  }

  private spawnEnemy(): void {
    // clean enemies first
    for (let i = this.enemies.length - 1; i >= 0; i--) {
      if (!this.enemies[i].visible) {
        this.enemies.splice(i, 1);
      }
    }

    let newEnemy = new Enemy({
      scene: this,
      x: Phaser.Math.Between(
        this.cameras.main.scrollX,
        this.cameras.main.scrollX + this.sys.canvas.width
      ),
      y: Phaser.Math.Between(
        this.cameras.main.scrollY,
        this.cameras.main.scrollY + this.sys.canvas.height
      )
    });

    this.enemies.push(newEnemy);
  }
}
