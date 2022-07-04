import { ISpriteConstructor } from "../../../interfaces/sprite.interface";

export class ToggleButton extends Phaser.GameObjects.Sprite {
  // variables
  protected currentScene: Phaser.Scene;
  tween: Phaser.Tweens.Tween;
	numberOfFrames!: number;

  constructor(aParams: ISpriteConstructor, numberOfFrames: number) {
    super(aParams.scene, aParams.x, aParams.y, aParams.texture, aParams.frame);

    // variables
    this.currentScene = aParams.scene;
		this.numberOfFrames = numberOfFrames;

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
    this.tween = this.currentScene.tweens.add({
			targets: this,
			scaleX: 0.9,
			scaleY: 0.9,
			ease: 'Sine.easeInOut',
			duration: 100,
			yoyo: true,
			repeat: 0,
			onComplete: () => {
					var currentFrame = parseInt(this.frame.name);
					var nextFrame = currentFrame + 1;
					if(nextFrame > this.numberOfFrames - 1) nextFrame = 0;
					this.setFrame(nextFrame);
			}
			})
      .pause();
  }

  private onPress(){
    this.setInteractive({ useHandCursor: true });
    this.on('pointerdown', () => {
			this.tween.play();
      this.handerOnPress();
    });
  }

  protected handerOnPress(){

  }
}
