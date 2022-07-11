
export class Coin extends Phaser.GameObjects.Image {
  private centerOfScreen: number;
  private changePositionTimer: Phaser.Time.TimerEvent;
  private lastPosition: string;

  constructor(aParams: IImageConstructor) {
    super(aParams.scene, aParams.x, aParams.y, aParams.texture);

    this.initVariables();
    this.initImage();
    this.initEvents();

    this.scene.add.existing(this);
  }

  private initVariables(): void {
    this.centerOfScreen = this.scene.sys.canvas.width / 2;
    this.changePositionTimer = null;
    this.setFieldSide();
  }

  private initImage(): void {
    this.setOrigin(0.5, 0.5);
    this.setScale(0.01,1);
    this.scene.tweens.add({
      targets: this,
      scaleX: 1,
      flipX: true,
      ease: 'Sine.easeInOut',
      duration: 1000,
      yoyo: true,
      repeat: -1
  });
  }

  private initEvents(): void {
    this.changePositionTimer = this.scene.time.addEvent({
      delay: 2000,
      callback: this.changePosition,
      callbackScope: this,
      loop: true
    });
  }

  update(): void {}

  public changePosition(): void {
    this.setNewPosition();
    this.setFieldSide();

    this.changePositionTimer.reset({
      delay: 2000,
      callback: this.changePosition,
      callbackScope: this,
      loop: true
    });
  }

  private setNewPosition(): void {
    if (this.lastPosition == 'right') {
      this.x = Phaser.Math.RND.integerInRange(100, this.centerOfScreen);
    } else {
      this.x = Phaser.Math.RND.integerInRange(385, 700);
    }
    this.y = Phaser.Math.RND.integerInRange(100, 500);
  }

  private setFieldSide(): void {
    if (this.x <= this.centerOfScreen) {
      this.lastPosition = 'left';
    } else {
      this.lastPosition = 'right';
    }
  }

  public playerHitCoin(){
    // emitter
    var particles = this.scene.add.particles('flares');
    const emitterUpCoin = particles.createEmitter({
      frame: 'yellow',
			x: this.x,
			y: this.y,
			quantity: 2,
			speed: { random: [50, 100] },
			lifespan: { random: [200, 400]},
			scale: { start: 0.2, end: 0 },
			angle: { random: true, start: 0, end: 270 },
			blendMode: 'ADD'
		})

    const xVals = [this.x,100, 300, 100, this.scene.sys.canvas.width / 2]
		const yVals = [this.y,200, 100, 150, this.scene.sys.canvas.height - 50]
		
		this.scene.tweens.addCounter({
			from: 0,
			to: 1,
			ease: Phaser.Math.Easing.Sine.InOut,
			duration: 1000,
			onUpdate: tween => {
				const v = tween.getValue()
				const x = Phaser.Math.Interpolation.CatmullRom(xVals, v)
				const y = Phaser.Math.Interpolation.CatmullRom(yVals, v)

				emitterUpCoin.setPosition(x, y)
			},
			onComplete: () => {
				emitterUpCoin.stop()
				this.scene.time.delayedCall(1000, () => {
					particles.removeEmitter(emitterUpCoin);
				})
			}
		})
  }
}
