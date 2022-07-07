import { CONST } from '../const/const';
import { IImageConstructor } from '../interfaces/image.interface';

export class Tile extends Phaser.GameObjects.Image {
  public tween: Phaser.Tweens.Tween;
  constructor(aParams: IImageConstructor) {
    super(aParams.scene, aParams.x, aParams.y, aParams.texture, aParams.frame);

    // set image settings
    this.setOrigin(0, 0);
    this.setInteractive();
    this.initTween();
    this.scene.add.existing(this);
  }

  public initTween(){
    // this.setScale(0.3);
    // this.scene.tweens.add({
    //   targets: this,
    //   scaleX: 1,
    //   scaleY: 1,
    //   ease: 'Sine.easeInOut',
    //   duration: 1000,
    //   delay: (this.x / CONST.tileWidth) * 50,
    //   repeat: 0,
    //   yoyo: false,
    // });

    this.tween = this.scene.tweens.add({
      targets: this,
      scaleX: 0.5,
      scaleY: 0.5,
      ease: 'Sine.easeInOut',
      duration: 500,
      delay: (this.x / CONST.tileWidth + this.y / CONST.tileHeight) * 50,
      yoyo: true,
      repeat: -1,
      repeatDelay: 5000,
    });

  }

  public initTweenMatch(){
    this.setDepth(1);
    this.scene.tweens.add({
      targets: this,
      scaleX: 1.5,
      scaleY: 1.5,
      angle: 0,
      ease: 'Sine.easeInOut',
      duration: 1000,
      repeat: 0,
      yoyo: false,
      onComplete:()=>{
        this.scene.tweens.add({
          targets: this,
          scaleX: 0.5,
          scaleY: 0.5,
          x: -10,
          y: -10,
          angle: 0,
          ease: 'Sine.easeInOut',
          duration: 1000,
          repeat: 0,
          yoyo: false,
          onComplete:()=>{
            this.destroy();
          }
      });
      }
    });
  }
}
