import { CONST } from '../const/const';
import { IImageConstructor } from '../interfaces/image.interface';

export class Tile extends Phaser.GameObjects.Image {
  public tween: Phaser.Tweens.Tween;
  particles!: Phaser.GameObjects.Particles.ParticleEmitter;
  constructor(aParams: IImageConstructor) {
    super(aParams.scene, aParams.x, aParams.y, aParams.texture, aParams.frame);

    // set image settings
    this.setOrigin(0, 0);
    this.setInteractive();
    this.scene.add.existing(this);
  }

  public initTween(){
    // this.y = (this.y-CONST.gridHeight*(this.y/CONST.tileHeight))
    this.tween = this.scene.tweens.add({
      targets: this,
      scaleX: 0.5,
      scaleY: 0.5,
      ease: 'Sine.easeInOut',
      duration: 500,
      delay: (this.x / CONST.tileWidth + this.y / CONST.tileHeight) * 50,
      yoyo: true,
      repeat: 0,
    });

  }

  public initTweenMatch(){
    this.particles = this.scene.add.particles('flares').createEmitter({
        frame: "red",
        lifespan: 500,
        speed: { min: 400, max: 600 },
        angle: {min: 40, max: 80},
        gravityY: 300,
        scale: { start: 0.1, end: 0 },
        quantity: 2,
        blendMode: 'ADD',
        follow: this,
        followOffset: {x:CONST.tileWidth/2, y: CONST.tileHeight/2}
    }).stop();

    this.setDepth(1);
    this.scene.tweens.timeline({
      targets: this,
      ease: 'Sine.easeInOut',
      duration: 1000,
      yoyo: false,
      tweens: [{
        scaleX: 1.5,
        scaleY: 1.5,
        onComplete:()=>{
          this.particles.start();
        }
      },
      {
        scaleX: 0.5,
        scaleY: 0.5,
        x: -10,
        y: -10,
      }],
      onComplete:()=>{
        this.destroy();
        this.particles.stop();
      }
    });
  }
}
