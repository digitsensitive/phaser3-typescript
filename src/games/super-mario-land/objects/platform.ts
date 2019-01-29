/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2019 Digitsensitive
 * @description  Super Mario Land: Platform
 * @license      Digitsensitive
 */

export class Platform extends Phaser.GameObjects.Image {
  // variables
  private currentScene: Phaser.Scene;
  private tweenProps: any;

  constructor(params) {
    super(params.scene, params.x, params.y, params.key, params.frame);

    // variables
    this.currentScene = params.scene;
    this.tweenProps = params.tweenProps;

    this.initImage();
    this.initTween();
    this.currentScene.add.existing(this);
  }

  private initImage(): void {
    // image
    this.setOrigin(0, 0);
    this.setFrame(0);

    // physics
    this.currentScene.physics.world.enable(this);
    this.body.setSize(24, 5);
    this.body.setAllowGravity(false);
    this.body.setImmovable(true);
  }

  private initTween(): void {
    this.currentScene.tweens.add({
      targets: this,
      props: this.tweenProps,
      ease: "Power0",
      yoyo: true,
      repeat: -1
    });
  }

  update(): void {}
}
