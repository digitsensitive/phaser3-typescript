import { IImageConstructor } from '../interfaces/image.interface';

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
    var emitter = particles.createEmitter({
        frame: 'yellow',
        x: this.x,
        y: this.y,
        lifespan: 2000,
        speed: { min: 400, max: 600 },
        scale: { start: 0.4, end: 0 },
        quantity: 1,
        blendMode: 'ADD'
    });
    this.scene.time.delayedCall(50, ()=>{
      emitter.stop();
    }, [], this);

    // tweens
    this.scene.tweens.add({
      targets: this,
      scaleX: 0.5,
      scaleY: 0.5,
      x: this.scene.sys.canvas.width / 2,
      y: this.scene.sys.canvas.height - 50,
      angle: 0,
      ease: 'Sine.easeInOut',
      duration: 500,
      repeat: 0,
      yoyo: false,
      onComplete:()=>{
        this.setScale(0.01,1)
        this.changePosition();
      }
    });
  }
}
