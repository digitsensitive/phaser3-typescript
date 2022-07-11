
export class ToggleButton extends Phaser.GameObjects.Sprite {
  protected soundPress!: Phaser.Sound.BaseSound;

  // variables
  protected currentScene: Phaser.Scene;
  tweenDown: Phaser.Tweens.Tween;
  tweenUp: Phaser.Tweens.Tween;
	numberOfFrames!: number;

  constructor(aParams: IToggleButtonConstructor) {
    super(aParams.scene, aParams.x, aParams.y, aParams.texture, aParams.frame);

    // variables
    this.currentScene = aParams.scene;
		this.numberOfFrames = aParams.numberOfFrames;

    this.soundPress = this.currentScene.sound.add(aParams.soundPress);
    this.initSprite();
    this.initTween();
		this.onPress();
    this.currentScene.add.existing(this);
  }

  protected initSprite() {
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
			})
      .pause();
    
    this.tweenUp = this.currentScene.tweens.add({
    targets: this,
    scaleX: 1,
    scaleY: 1,
    ease: 'Sine.easeInOut',
    duration: 100,
    repeat: 0,
    onComplete: ()=>{
        let currentFrame = parseInt(this.frame.name);
        let nextFrame = currentFrame + 1;
        if(nextFrame > this.numberOfFrames - 1) nextFrame = 0;
        this.setFrame(nextFrame);
        this.handerOnPress();
  }
    })
    .pause();
  }

  private onPress(){
    this.setInteractive({ useHandCursor: true });
    this.on('pointerup', () => {
			this.tweenUp.play();
    });
    this.on('pointerdown', () => {
      if(!this.currentScene.registry.get('muteSound'))
        this.soundPress.play();
			this.tweenDown.play();
    });
    this.on('pointerover', () => {

		})
  }

  protected handerOnPress(){

  }
}
