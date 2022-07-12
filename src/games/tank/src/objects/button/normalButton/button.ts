
export class Button extends Phaser.GameObjects.Image {
	// variables
  protected currentScene: Phaser.Scene;
	protected tweenDown: Phaser.Tweens.Tween;
	protected tweenUp: Phaser.Tweens.Tween;
	protected soundPress: Phaser.Sound.BaseSound;
	private isClick: boolean;

  constructor(aParams: IButtonConstructor) {
    super(aParams.scene, aParams.x, aParams.y, aParams.texture, aParams.frame);
		// variables
    this.currentScene = aParams.scene;
		this.isClick = false;
		this.soundPress = this.currentScene.sound.add(aParams.soundPress);
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
				this.isClick = false;
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
			console.log("onPress", this.currentScene.registry.get('muteSound'));
			this.isClick = true;
			if(!this.currentScene.registry.get('muteSound'))
				this.soundPress.play();
			this.tweenDown.play();
    });
		this.on('pointerout', () => {
			if(this.isClick)
				this.tweenUp.play();
    });
  }

	public handleOnPress(){

	}

}
