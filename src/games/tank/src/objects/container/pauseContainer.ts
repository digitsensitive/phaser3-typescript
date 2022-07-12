import { ButtonPlay } from "../button/normalButton/buttonPlay";
import { ButtonReplay } from "../button/normalButton/buttonReplay";
import { ButtonMusic } from "../button/toggleButton/buttonMusic";
import { ButtonSound } from "../button/toggleButton/buttonSound";

export class PauseContainer extends Phaser.GameObjects.Container{
  private currentScene: Phaser.Scene;
  private btn_music: ButtonMusic;
  private btn_replay: ButtonReplay;
  private btn_play: ButtonPlay;
  private btn_sound: ButtonSound;

  constructor(scene: Phaser.Scene, x: number, y: number){
    super(scene, x, y);
    this.currentScene = scene;
    this.createUI();
    this.createTweens();
  }
  createUI(){
    this.btn_music =  new ButtonMusic({
      scene: this.currentScene,
      x: 0,
      y: 0,
      texture: 'btn-music',
      frame: 1,
      numberOfFrames: 2,
      soundPress: 'click',
    })

    this.btn_sound =  new ButtonSound({
      scene: this.currentScene,
      x: 0,
      y: 0,
      texture: 'btn-sound',
      frame: 1,
      numberOfFrames: 2,
      soundPress: 'click',
    });
   
    this.btn_play =  new ButtonPlay({
      scene: this.currentScene,
      x: 0,
      y: 0,
      texture: 'btn-play',
      soundPress: 'click',
    }).setOrigin(0,0)
    
    this.btn_replay =  new ButtonReplay({
      scene: this.currentScene,
      x: 0,
      y: 0,
      texture: 'btn-replay',
      soundPress: 'click',
    }).setOrigin(0,0);

    this.add([this.btn_music, this.btn_play, this.btn_replay, this.btn_sound]);
  }

  private createTweens(): void {
    // tweens open
    this.scene.tweens.add({
      targets: this.btn_music,
      x: 300,
      ease: 'Power1',
      duration: 300,
    });

    this.scene.tweens.add({
      targets: this.btn_sound,
      x: 100,
      ease: 'Power1',
      duration: 300,
      delay: 200,
    });

    this.scene.tweens.add({
      targets: this.btn_play,
      x: 100,
      ease: 'Power1',
      duration: 300,
      delay: 400,
    });
    this.scene.tweens.add({
      targets: this.btn_replay,
      x: 100,
      ease: 'Power1',
      duration: 300,
      delay: 600,
    });
  }

  public createTweenClose(modeClose: string){
    this.scene.tweens.add({
      targets: [this.btn_replay, this.btn_play, this.btn_sound, this.btn_music],
      x: -600,
      ease: 'Power1',
      duration: 500,
      onComplete: () => {
        if(modeClose == 'continue'){
          this.currentScene.scene.stop("GameScene");
          this.currentScene.scene.stop("MenuScene");
          this.currentScene.scene.start("MenuScene");
          this.currentScene.scene.stop();
        }else{
          this.currentScene.game.input.mouse.requestPointerLock();
          this.currentScene.scene.resume("GameScene");
        }
      },
    });
  }
}