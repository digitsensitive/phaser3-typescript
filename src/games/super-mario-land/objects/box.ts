/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2019 Digitsensitive
 * @description  Super Mario Land: Box
 * @license      Digitsensitive
 */

export class Box extends Phaser.GameObjects.Sprite {
  // variables
  private currentScene: Phaser.Scene;
  private boxContent: string;
  private content: Phaser.GameObjects.Sprite;

  constructor(params) {
    super(params.scene, params.x, params.y, params.key, params.frame);

    // variables
    this.currentScene = params.scene;
    this.boxContent = params.insideBox;

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
      let timeline = this.currentScene.tweens.createTimeline({});

      timeline.add({
        targets: this,
        props: { y: this.y - 10 },
        duration: 60,
        ease: "Power0",
        yoyo: true,
        onComplete: function() {
          this.targets[0].active = false;
          this.targets[0].setFrame(1);
        }
      });

      this.content = this.currentScene.add
        .sprite(this.x, this.y - 8, this.boxContent)
        .setOrigin(0, 0)
        .play(this.boxContent);

      timeline.add({
        targets: this.content,
        props: { y: this.y - 40, alpha: 1 },
        delay: 0,
        duration: 700,
        ease: "Power0",
        onComplete: function() {
          this.targets[0].destroy();
        }
      });

      timeline.play();

      this.currentScene.registry.values.coins += 1;
      this.currentScene.events.emit("coinsChanged");
      this.currentScene.registry.values.score += 100;
      this.currentScene.events.emit("scoreChanged");
    }
  }
}
