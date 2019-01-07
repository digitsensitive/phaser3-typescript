/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2019 Digitsensitive
 * @description  Tank: Player
 * @license      Digitsensitive
 */

import { Tank } from "./children/tank";
import { Barrel } from "./children/barrel";
import { Bullet } from "../bullet";

export class Player extends Phaser.GameObjects.Container {
  private barrel: Barrel;
  private bullets: Phaser.GameObjects.Group;
  private currentScene: Phaser.Scene;
  private lastShoot: number;
  private shootingKey: Phaser.Input.Keyboard.Key;
  private tank: Tank;

  constructor(params) {
    super(params.scene, params.x, params.y, params.children);

    this.currentScene = params.scene;
    this.initContainer();
    this.currentScene.add.existing(this);
  }

  private initContainer() {
    // variables
    this.lastShoot = 0;

    // container children
    this.tank = new Tank({
      scene: this.currentScene,
      x: 0,
      y: 0,
      key: "tankBlue"
    });

    this.barrel = new Barrel({
      scene: this.currentScene,
      x: 0,
      y: 0,
      key: "barrelBlue"
    });

    this.add([this.tank, this.barrel]);

    // game objects
    this.bullets = this.currentScene.add.group({
      classType: Bullet,
      active: true,
      maxSize: 10,
      runChildUpdate: true
    });

    // input
    this.shootingKey = this.currentScene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
  }

  update(): void {
    this.updateContainerChildren();
    this.handleShooting();
  }

  private updateContainerChildren(): void {
    // update children
    this.iterate(function(child) {
      child.update();
    });

    // adjust barrel position
    this.barrel.x = this.tank.x;
    this.barrel.y = this.tank.y;
  }

  private handleShooting(): void {
    if (
      this.shootingKey.isDown &&
      this.currentScene.time.now > this.lastShoot
    ) {
      if (this.bullets.getLength() < 10) {
        this.bullets.add(
          new Bullet({
            scene: this.currentScene,
            x: this.barrel.getWorldTransformMatrix().tx,
            y: this.barrel.getWorldTransformMatrix().ty,
            key: "bullet",
            rotation: this.barrel.rotation
          })
        );

        this.lastShoot = this.currentScene.time.now + 400;
      }
    }
  }
}
