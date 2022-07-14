import SceneKeys from "../../consts/SceneKeys";
import { PlayButton } from "../../objects/button/normal-button/PlayButton";
import { ReplayButton } from "../../objects/button/normal-button/ReplayButton";
import { ButtonMusic } from "../../objects/button/toggle-button/ButtonMusic";
import { ButtonSound } from "../../objects/button/toggle-button/ButtonSound";

export class PauseContainer extends Phaser.GameObjects.Container{
  private musicButton: ButtonMusic;
  private replayButton: ReplayButton;
  private playButton: PlayButton;
  private soundButton: ButtonSound;
  private zone!: Phaser.GameObjects.Zone;

  constructor(scene: Phaser.Scene, x: number, y: number){
    super(scene, x, y);
    this.scene = scene;
    this.createUI();
    this.alignUI();
    this.createTweenOpen();
  }
  
  private createUI(){
    const background = this.scene.add.rectangle(
      0, 
      0, 
      this.scene.cameras.main.width, 
      this.scene.cameras.main.height, 
      0x000000
    )
      .setOrigin(0,0)
      .setAlpha(0.5);
    
    this.zone = this.scene.add.zone(
      0, 
      140, 
      350, 
      450
    )
      .setOrigin(0,0);
    this.add(this.zone);

    this.musicButton =  new ButtonMusic({
      scene: this.scene,
      x: 0,
      y: 0,
      texture: 'btn-music',
      frame: 1,
      numberOfFrames: 2,
      soundPress: 'click',
    })

    this.soundButton =  new ButtonSound({
      scene: this.scene,
      x: 0,
      y: 0,
      texture: 'btn-sound',
      frame: 1,
      numberOfFrames: 2,
      soundPress: 'click',
    })
   
    this.playButton =  new PlayButton({
      scene: this.scene,
      x: 0,
      y: 0,
      texture: 'btn-play',
      soundPress: 'click',
    })
    
    this.replayButton =  new ReplayButton({
      scene: this.scene,
      x: 0,
      y: 0,
      texture: 'btn-replay',
      soundPress: 'click',
    })

    this.add([
      this.musicButton, 
      this.playButton, 
      this.replayButton, 
      this.soundButton
    ]);
  }

  private alignUI(){
    Phaser.Display.Align.In.TopRight(
      this.musicButton,
      this.zone
    )
    Phaser.Display.Align.In.TopLeft(
      this.soundButton,
      this.zone
    )
    Phaser.Display.Align.In.Center(
      this.playButton,
      this.zone
    )
      
    Phaser.Display.Align.In.BottomCenter(
      this.replayButton,
      this.zone
    )
  }
  
  private createTweenOpen(): void {
    // tweens open
    this.scene.tweens.timeline({
      ease: 'Back.easeOut',
      duration: 300,
      tweens:[
        {
          targets: this.musicButton,
          x: 800,
        },
        {
          targets: this.soundButton,
          x: 600,
        },
        {
          targets: this.playButton,
          x: 750,
        },
        {
          targets: this.replayButton,
          x: 750,
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
          targets: this.soundButton,
          x: -100,
        },
        {
          targets: this.musicButton,
          x: -100,
        },
        {
          targets: this.playButton,
          x: -100,
        },
        {
          targets: this.replayButton,
          x: -100,
        }
      ],
      onComplete: () => {
        if(modeClose == 'continue'){
          this.scene.game.input.mouse.requestPointerLock();
          this.scene.scene.resume(SceneKeys.GAME_SCENE);
          this.scene.scene.sendToBack();
        }else{
          this.scene.scene.stop(SceneKeys.GAME_SCENE);
          this.scene.scene.stop(SceneKeys.MENU_SCENE);
          this.scene.scene.start(SceneKeys.MENU_SCENE);
          this.scene.scene.stop();
        }
      },
    });
  }
}