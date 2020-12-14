/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2019 - 2020 Digitsensitive
 * @description  Arcadians: Player
 * @license      {@link https://github.com/digitsensitive/phaser3-typescript/blob/master/LICENSE.md | MIT License}
 */

import { Bullet } from "./bullet";

export class Player extends Phaser.GameObjects.Sprite {
  body: Phaser.Physics.Arcade.Body;
  private bullets: Phaser.GameObjects.Group;
  private isActivated: boolean;
  private isDying: boolean;
  private keys: Map<string, Phaser.Input.Keyboard.Key>;

  public getBullets(): Phaser.GameObjects.Group {
    return this.bullets;
  }

  constructor(params) {
    super(params.scene, params.x, params.y, params.key, params.frame);

    this.initVariables();
    this.initSprite();
    this.initInput();
    this.initPhysics();

    this.scene.add.existing(this);
  }

  private initVariables(): void {
    this.bullets = this.scene.add.group({
      runChildUpdate: true
    });

    this.isActivated = false;
    this.isDying = false;
  }

  private initSprite() {
    this.setOrigin(0, 0);
    this.setFrame(0);
    this.setScale(2);
  }

  private initInput() {
    this.keys = new Map([
      ["LEFT", this.addKey("LEFT")],
      ["RIGHT", this.addKey("RIGHT")],
      ["SHOOT", this.addKey("SPACE")]
    ]);
  }

  private initPhysics(): void {
    this.scene.physics.world.enable(this);
    this.body.setSize(this.width, this.height);
  }

  private addKey(key: string): Phaser.Input.Keyboard.Key {
    return this.scene.input.keyboard.addKey(key);
  }

  update(): void {
    if (!this.isDying) {
      this.handleInput();
      this.handleShooting();
    }
  }

  private handleInput() {
    if (this.keys.get("RIGHT").isDown && this.x < 250) {
      this.x += 1;
    } else if (this.keys.get("LEFT").isDown && this.x > 60) {
      this.x -= 1;
    }
  }

  private handleShooting(): void {
    if (this.keys.get("SHOOT").isDown && this.bullets.getLength() === 0) {
      this.bullets.add(
        new Bullet({
          scene: this.scene,
          x: this.x,
          y: this.y - this.height,
          key: "bullet",
          speed: -200
        })
      );
    }
  }

  private gotHit(): void {
    this.scene.registry.values.lives -= 1;
    this.scene.events.emit("livesChanged");
  }
}
