/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2019 Digitsensitive
 * @description  Super Mario Land: Brick
 * @license      Digitsensitive
 */

export class Brick extends Phaser.GameObjects.Sprite {
  // variables
  private currentScene: Phaser.Scene;
  protected destroyingValue: number;

  constructor(params) {
    super(params.scene, params.x, params.y, params.key, params.frame);

    // variables
    this.currentScene = params.scene;
    this.destroyingValue = params.value;
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
    if (this.body.touching.down) {
      // something touches the downside of the brick: probably mario?
      for (let i = -2; i < 2; i++) {
        // create smaller bricks
        let brick = this.currentScene.add
          .sprite(this.x, this.y, "brick")
          .setOrigin(0, 0)
          .setDisplaySize(4, 4);
        this.currentScene.physics.world.enable(brick);
        brick.body.setVelocity(40 * i, -40 * i);
        brick.body.setSize(4, 4);
      }

      // destroy brick
      this.destroy();

      // add some score for killing the brick
      this.currentScene.registry.values.score += this.destroyingValue;
      this.currentScene.events.emit("scoreChanged");
    }
  }
}
