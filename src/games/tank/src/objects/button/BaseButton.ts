
export class BaseButton extends Phaser.GameObjects.Image {
	// variables
	protected soundPress: Phaser.Sound.BaseSound;
	private isClick: boolean;

  constructor(aParams: IButtonConstructor) {
    super(aParams.scene, aParams.x, aParams.y, aParams.texture, aParams.frame);
		// variables
		this.isClick = false;
		this.soundPress = this.scene.sound.add(aParams.soundPress);
		this.setInteractive({ useHandCursor: true });
		this.initListenEvent();
    this.scene.add.existing(this);
  }

  protected TouchDown(){
    this.scene.tweens.add({
			targets: this,
			scaleX: 0.9,
			scaleY: 0.9,
			ease: 'Sine.easeInOut',
			duration: 100,
			repeat: 0,
			paused: true
		})
  }

  protected TouchUp(switchTexture?: Function){
    this.scene.tweens.add({
			targets: this,
			scaleX: 1,
			scaleY: 1,
			ease: 'Sine.easeInOut',
			duration: 100,
			repeat: 0,
			paused: true,
			onComplete: () => {
				console.log("onPressUp");
				this.isClick = false;
				this.handleOnPress();
        switchTexture();
			}
		})
  }

  protected initListenEvent(switchTexture? : Function){
    this.on(Phaser.Input.Events.POINTER_UP, () => {
			this.TouchUp(switchTexture);
    });

		this.on(Phaser.Input.Events.POINTER_DOWN, () => {
			console.log("Phaser.Input.Events.POINTER_DOWN");
			this.isClick = true;
			this.TouchDown();
			// play audio click
			if(!this.scene.registry.get('muteSound'))
				this.soundPress.play();
    });
		
		this.on(Phaser.Input.Events.POINTER_OUT, () => {
			if(this.isClick)
        this.TouchUp();
    });
  }

	public handleOnPress(){

	}

}
