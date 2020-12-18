import { IPlatformConstructor } from '../interfaces/platform.interface';

export class Platform extends Phaser.GameObjects.Image {
  body: Phaser.Physics.Arcade.Body;

  // variables
  private currentScene: Phaser.Scene;
  private tweenProps: any;

  constructor(aParams: IPlatformConstructor) {
    super(aParams.scene, aParams.x, aParams.y, aParams.texture, aParams.frame);

    // variables
    this.currentScene = aParams.scene;
    this.tweenProps = aParams.tweenProps;

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
      ease: 'Power0',
      yoyo: true,
      repeat: -1
    });
  }

  update(): void {}
}
