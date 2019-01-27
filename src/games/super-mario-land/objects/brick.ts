/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2019 Digitsensitive
 * @description  Super Mario Land: Brick
 * @license      Digitsensitive
 */

export class Brick extends Phaser.GameObjects.Sprite {
  // variables
  private currentScene: Phaser.Scene;

  constructor(params) {
    super(params.scene, params.x, params.y, params.key, params.frame);

    // variables
    this.currentScene = params.scene;

    this.initSprite();
    this.currentScene.add.existing(this);
  }

  private initSprite() {
    // sprite
    this.setOrigin(0, 0);
    this.setFrame(0);

    // physics
    this.currentScene.physics.world.enable(this);
    this.body.setSize(8, 8);
    this.body.setAllowGravity(false);
    this.body.setImmovable(true);
  }

  update(): void {
    if (this.body.touching.down && this.active) {
      for (let i = -2; i < 2; i++) {
        let brick = this.currentScene.add
          .sprite(this.x, this.y, "brick")
          .setOrigin(0, 0)
          .setDisplaySize(4, 4);
        this.currentScene.physics.world.enable(brick);
        brick.body.setVelocity(40 * i, -40 * i);
        brick.body.setSize(4, 4);
      }

      this.destroy();
      this.currentScene.registry.values.coins += 1;
      this.currentScene.events.emit("coinsChanged");
      this.currentScene.registry.values.score += 100;
      this.currentScene.events.emit("scoreChanged");
    }
  }
}
