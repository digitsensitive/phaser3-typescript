
export class ToggleButton extends Phaser.GameObjects.Sprite {
  protected soundPress!: Phaser.Sound.BaseSound;

  // variables
  protected currentScene: Phaser.Scene;
  private tweenDown: Phaser.Tweens.Tween;
  private tweenUp: Phaser.Tweens.Tween;
	private numberOfFrames!: number;
  private isClick: boolean;

  constructor(aParams: IToggleButtonConstructor) {
    super(aParams.scene, aParams.x, aParams.y, aParams.texture, aParams.frame);

    // variables
    this.currentScene = aParams.scene;
		this.numberOfFrames = aParams.numberOfFrames;
    this.isClick = false;

    this.soundPress = this.currentScene.sound.add(aParams.soundPress);
    this.initSprite();
    this.initTween();
		this.onPress();
    this.currentScene.add.existing(this);
  }

  private initSprite() {
    // sprite
    this.setOrigin(0, 0);
  }
  private initTween(){
    this.tweenDown = this.currentScene.tweens.add({
			targets: this,
			scaleX: 0.9,
			scaleY: 0.9,
			ease: 'Sine.easeInOut',
			duration: 100,
			repeat: 0,
      paused: true
			})
    
    this.tweenUp = this.currentScene.tweens.add({
      targets: this,
      scaleX: 1,
      scaleY: 1,
      ease: 'Sine.easeInOut',
      duration: 100,
      repeat: 0,
      paused: true,
      onComplete: ()=>{
          this.isClick = false;
          let currentFrame = parseInt(this.frame.name);
          let nextFrame = currentFrame + 1;
          if(nextFrame > this.numberOfFrames - 1) nextFrame = 0;
          this.setFrame(nextFrame);
          this.handerOnPress();
      }
    })
  }

  private onPress(){
    this.setInteractive({ useHandCursor: true });
    this.on('pointerup', () => {
			this.tweenUp.play();
    });

    this.on('pointerdown', () => {
      this.isClick = true;
      if(!this.currentScene.registry.get('muteSound'))
        this.soundPress.play();
			this.tweenDown.play();
    });

    this.on('pointerout', () => {
      console.log('Press downside pressed on mouse over');
      if(this.isClick)
        this.tweenUp.play();
		})
  }

  protected handerOnPress(){

  }
}
