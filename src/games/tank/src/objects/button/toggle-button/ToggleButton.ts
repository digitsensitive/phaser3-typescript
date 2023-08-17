
export class ToggleButton extends Phaser.GameObjects.Sprite {
  protected soundPress!: Phaser.Sound.BaseSound;

  // variables
  private tweenDown: Phaser.Tweens.Tween;
  private tweenUp: Phaser.Tweens.Tween;
	private numberOfFrames!: number;
  private isClick: boolean;

  constructor(aParams: IToggleButtonConstructor) {
    super(aParams.scene, aParams.x, aParams.y, aParams.texture, aParams.frame);

    // variables
    this.scene = aParams.scene;
		this.numberOfFrames = aParams.numberOfFrames;
    this.isClick = false;
    this.soundPress = this.scene.sound.add(aParams.soundPress);
    
    this.initSprite();
    this.initTween();
		this.onPress();
    this.scene.add.existing(this);
    this.setInteractive({ useHandCursor: true });
  }

  private initSprite() {
    // sprite
  }
  private initTween(){
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
      onComplete: ()=>{
          this.isClick = false;
          this.switchTexture();
          this.handerOnPress();
      }
    })
  }

  private onPress(){
    this.on(Phaser.Input.Events.POINTER_UP, () => {
			this.tweenUp.play();
    });

    this.on(Phaser.Input.Events.POINTER_DOWN, () => {
      this.isClick = true;
			this.tweenDown.play();
      if(!this.scene.registry.get('muteSound'))
        this.soundPress.play();
    });

    this.on(Phaser.Input.Events.POINTER_OVER, () => {
      if(this.isClick)
        this.tweenUp.play();
		})
  }

  private switchTexture() {
    let currentFrame = parseInt(this.frame.name);
    let nextFrame = currentFrame + 1;
    if(nextFrame > this.numberOfFrames - 1) 
      nextFrame = 0;
    this.setFrame(nextFrame);
  }

  protected handerOnPress(){

  }
}
