import { IImageConstructor } from '../../../interfaces/image.interface';

export class Button extends Phaser.GameObjects.Image {
	// variables
  protected currentScene: Phaser.Scene;
	tween: Phaser.Tweens.Tween;

  constructor(aParams: IImageConstructor) {
    super(aParams.scene, aParams.x, aParams.y, aParams.texture, aParams.frame);
		// variables
    this.currentScene = aParams.scene;
		this.initTween();
		this.onPress();
    this.scene.add.existing(this);
  }

	protected initTween(){
    this.tween = this.currentScene.tweens.add({
			targets: this,
			scaleX: 0.9,
			scaleY: 0.9,
			ease: 'Sine.easeInOut',
			duration: 100,
			yoyo: true,
			repeat: 0,
			onComplete: () => {
				this.handleOnPress();
			}
		})
      .pause();
  }

  private onPress(){
    this.setInteractive({ useHandCursor: true });
    this.on('pointerdown', () => {
			this.tween.play();
    });
  }

	public handleOnPress(){

	}

}
