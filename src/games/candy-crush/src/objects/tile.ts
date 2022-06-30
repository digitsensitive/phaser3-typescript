import { CONST } from '../const/const';
import { IImageConstructor } from '../interfaces/image.interface';

export class Tile extends Phaser.GameObjects.Image {
  constructor(aParams: IImageConstructor) {
    super(aParams.scene, aParams.x, aParams.y, aParams.texture, aParams.frame);

    // set image settings
    this.setOrigin(0, 0);
    this.setInteractive();
    this.scene.add.existing(this);
  }

  public initTween(){
    this.setScale(0,0);
    this.scene.tweens.add({
      targets: this,
      scaleX: 1,
      scaleY: 1,
      ease: 'Sine.easeInOut',
      duration: 1000,
      delay: (this.x / CONST.tileWidth) * 50,
      repeat: 0,
      yoyo: false,
  });
  }

  public initTweenMatch(){
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
