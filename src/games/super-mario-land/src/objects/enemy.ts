import { ISpriteConstructor } from '../interfaces/sprite.interface';

export class Enemy extends Phaser.GameObjects.Sprite {
  body: Phaser.Physics.Arcade.Body;

  // variables
  protected currentScene: Phaser.Scene;
  protected isActivated: boolean;
  protected isDying: boolean;
  protected speed: number;
  protected dyingScoreValue: number;

  constructor(aParams: ISpriteConstructor) {
    super(aParams.scene, aParams.x, aParams.y, aParams.texture, aParams.frame);

    // variables
    this.currentScene = aParams.scene;
    this.initSprite();
    this.currentScene.add.existing(this);
  }

  protected initSprite() {
    // variables
    this.isActivated = false;
    this.isDying = false;

    // sprite
    this.setOrigin(0, 0);
    this.setFrame(0);

    // physics
    this.currentScene.physics.world.enable(this);
    this.body.setSize(8, 8);
  }

  protected showAndAddScore(): void {
    this.currentScene.registry.values.score += this.dyingScoreValue;
    this.currentScene.events.emit('scoreChanged');

    let scoreText = this.currentScene.add
      .dynamicBitmapText(
        this.x,
        this.y - 20,
        'font',
        this.dyingScoreValue.toString(),
        4
      )
      .setOrigin(0, 0);

    this.currentScene.add.tween({
      targets: scoreText,
      props: { y: scoreText.y - 25 },
      duration: 800,
      ease: 'Power0',
      yoyo: false,
      onComplete: function () {
        scoreText.destroy();
      }
    });
  }
}
