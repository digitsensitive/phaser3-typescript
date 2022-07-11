import { IImageConstructor } from '../../../interfaces/image.interface';

export class Button extends Phaser.GameObjects.Image {
	// variables
  protected currentScene: Phaser.Scene;
	protected tweenDown: Phaser.Tweens.Tween;
	protected tweenUp: Phaser.Tweens.Tween;


  constructor(aParams: IImageConstructor) {
    super(aParams.scene, aParams.x, aParams.y, aParams.texture, aParams.frame);
		// variables
    this.currentScene = aParams.scene;
		this.initTween();
		this.handerInput();
    this.scene.add.existing(this);
  }
	update(...args: any[]): void {
		
	}
	protected initTween(){
    this.tweenDown = this.currentScene.tweens.add({
			targets: this,
			scaleX: 0.9,
			scaleY: 0.9,
			ease: 'Sine.easeInOut',
			duration: 100,
			repeat: 0,
		})
      .pause();
		this.tweenUp = this.currentScene.tweens.add({
			targets: this,
			scaleX: 1,
			scaleY: 1,
			ease: 'Sine.easeInOut',
			duration: 100,
			repeat: 0,
			onComplete: () => {
				this.handleOnPress();
			}
		})
			.pause();
  }

  private handerInput(){
    this.setInteractive({ useHandCursor: true });
    this.on('pointerup', () => {
			this.tweenUp.play();
    });
		this.on('pointerdown', () => {
			this.tweenDown.play();
    });
  }

	public handleOnPress(){

	}

}
