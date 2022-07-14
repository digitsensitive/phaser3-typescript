
export class Button extends Phaser.GameObjects.Image {
	// variables
	protected tweenDown: Phaser.Tweens.Tween;
	protected tweenUp: Phaser.Tweens.Tween;
	protected soundPress: Phaser.Sound.BaseSound;
	private isClick: boolean;

  constructor(aParams: IButtonConstructor) {
    super(aParams.scene, aParams.x, aParams.y, aParams.texture, aParams.frame);
		// variables
		this.isClick = false;
		this.soundPress = this.scene.sound.add(aParams.soundPress);
		this.setInteractive({ useHandCursor: true });
		this.initTween();
		this.initListenEvent();
    this.scene.add.existing(this);
  }
	update(...args: any[]): void {
		
	}
	protected initTween(){
    this.tweenDown = this.scene.tweens.add({
			targets: this,
			scaleX: 0.9,
			scaleY: 0.9,
			ease: 'Sine.easeInOut',
			duration: 100,
			repeat: 0,
			paused: true
		})
		
		this.tweenUp = this.scene.tweens.add({
			targets: this,
			scaleX: 1,
			scaleY: 1,
			ease: 'Sine.easeInOut',
			duration: 100,
			repeat: 0,
			paused: true,
			onComplete: () => {
				this.isClick = false;
				this.handleOnPress();
			}
		})
  }

  private initListenEvent(){
    this.on(Phaser.Input.Events.POINTER_UP, () => {
			this.tweenUp.play();
    });

		this.on(Phaser.Input.Events.POINTER_DOWN, () => {
			this.isClick = true;
			this.tweenDown.play();
			// play audio click
			if(!this.scene.registry.get('muteSound'))
				this.soundPress.play();
    });
		
		this.on(Phaser.Input.Events.POINTER_OUT, () => {
			if(this.isClick)
				this.tweenUp.play();
    });
  }

	public handleOnPress(){

	}

}
