import SceneKeys from "../../consts/SceneKeys";
import { ButtonPlay } from "../../objects/button/normalButton/buttonPlay";
import { ButtonReplay } from "../../objects/button/normalButton/buttonReplay";
import { ButtonMusic } from "../../objects/button/toggleButton/buttonMusic";
import { ButtonSound } from "../../objects/button/toggleButton/buttonSound";

export class PauseContainer extends Phaser.GameObjects.Container{
  private currentScene: Phaser.Scene;
  private btnMusic: ButtonMusic;
  private btnReplay: ButtonReplay;
  private btnPlay: ButtonPlay;
  private btnSound: ButtonSound;
  private zone!: Phaser.GameObjects.Zone;

  constructor(scene: Phaser.Scene, x: number, y: number){
    super(scene, x, y);
    this.currentScene = scene;
    this.createUI();
    this.createTweenOpen();
  }
  createUI(){
    this.zone = this.currentScene.add.zone(0, 0, 350, 450).setOrigin(0,0);
    this.add(this.zone);

    this.btnMusic =  new ButtonMusic({
      scene: this.currentScene,
      x: 0,
      y: 0,
      texture: 'btn-music',
      frame: 1,
      numberOfFrames: 2,
      soundPress: 'click',
    }).setOrigin(0,0)

    this.btnSound =  new ButtonSound({
      scene: this.currentScene,
      x: 0,
      y: 0,
      texture: 'btn-sound',
      frame: 1,
      numberOfFrames: 2,
      soundPress: 'click',
    }).setOrigin(0,0);
   
    this.btnPlay =  new ButtonPlay({
      scene: this.currentScene,
      x: 0,
      y: 0,
      texture: 'btn-play',
      soundPress: 'click',
    }).setOrigin(0,0)
    
    this.btnReplay =  new ButtonReplay({
      scene: this.currentScene,
      x: 0,
      y: 0,
      texture: 'btn-replay',
      soundPress: 'click',
    }).setOrigin(0,0);
    
    Phaser.Display.Align.In.TopRight(
      this.btnMusic,
      this.zone
    )
    Phaser.Display.Align.In.TopLeft(
      this.btnSound,
      this.zone
    )
    Phaser.Display.Align.In.Center(
      this.btnPlay,
      this.zone
    )
      
    Phaser.Display.Align.In.BottomCenter(
      this.btnReplay,
      this.zone
    )

    this.add([this.btnMusic, this.btnPlay, this.btnReplay, this.btnSound]);
  }
  
  private createTweenOpen(): void {
    // tweens open
    this.scene.tweens.timeline({
      ease: 'Back.easeOut',
      duration: 300,
      tweens:[
        {
          targets: this.btnMusic,
          x: 800,
        },
        {
          targets: this.btnSound,
          x: 600,
        },
        {
          targets: this.btnPlay,
          x: 600,
        },
        {
          targets: this.btnReplay,
          x: 600,
        }
      ]
    })
  }

  public createTweenClose(modeClose: string){
    this.scene.tweens.timeline({
      // targets: [this.btnReplay, this.btnPlay, this.btnSound, this.btnMusic],
      ease: 'Power1',
      duration: 200,
      tweens:[
        {
          targets: this.btnSound,
          x: -100,
        },
        {
          targets: this.btnMusic,
          x: -100,
        },
        {
          targets: this.btnPlay,
          x: -100,
        },
        {
          targets: this.btnReplay,
          x: -100,
        }
      ],
      onComplete: () => {
        if(modeClose == 'continue'){
          this.currentScene.game.input.mouse.requestPointerLock();
          this.currentScene.scene.resume(SceneKeys.GameScene);
        }else{
          this.currentScene.scene.stop(SceneKeys.GameScene);
          this.currentScene.scene.stop(SceneKeys.MenuScene);
          this.currentScene.scene.start(SceneKeys.MenuScene);
          this.currentScene.scene.stop();
        }
      },
    });
  }
}