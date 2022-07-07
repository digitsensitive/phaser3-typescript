import { ButtonMusic } from "../objects/Button/toggle-button/button-music";
import { ButtonSound } from "../objects/Button/toggle-button/button-sound";
import { ButtonReplay } from "../objects/Button/normal-button/button-replay";
import { ButtonPlay } from "../objects/Button/normal-button/button-play";

export class PauseScene extends Phaser.Scene {
  private btn_music: ButtonMusic;
  private btn_replay: ButtonReplay;
  private btn_play: ButtonPlay;
  private btn_sound: ButtonSound;
  private zone!: Phaser.GameObjects.Zone;
  constructor() {
    super({
      key: 'PauseScene'
    });
  }

  create(): void {
    this.createUI();
    this.initTween();
    this.createHandleEvents();
  }
  private createUI(){
    this.btn_music =  new ButtonMusic({
      scene: this,
      x: 0,
      y: 0,
      texture: 'btn-music',
      frame: 1,
    }, 2)

    this.btn_sound =  new ButtonSound({
      scene: this,
      x: 0,
      y: 0,
      texture: 'btn-sound',
      frame: 1,
    }, 2);
   
    this.btn_play =  new ButtonPlay({
      scene: this,
      x: 0,
      y: 0,
      texture: 'btn-play',
    }).setOrigin(0,0)
    
    this.btn_replay =  new ButtonReplay({
      scene: this,
      x: 0,
      y: 0,
      texture: 'btn-replay',
    }).setOrigin(0,0);
    
    this.zone = this.add.zone(100, 140, 350, 450).setOrigin(0,0);
    Phaser.Display.Align.In.TopRight(
      this.btn_music,
      this.zone
    )
    Phaser.Display.Align.In.TopLeft(
      this.btn_sound,
      this.zone
    )
    Phaser.Display.Align.In.Center(
      this.btn_play,
      this.zone
    )
      
    Phaser.Display.Align.In.BottomCenter(
      this.btn_replay,
      this.zone
    )
    this.btn_music.setX(-600);
    this.btn_sound.setX(-600);
    this.btn_play.setX(-600);
    this.btn_replay.setX(-600);
    
    this.add.existing(this.btn_sound);
    this.add.existing(this.btn_music);
  }
  private initTween(){
    this.tweens.add({
      targets: this.btn_music,
      x: 300,
      ease: 'Power1',
      duration: 300,
    });

    this.tweens.add({
      targets: this.btn_sound,
      x: 100,
      ease: 'Power1',
      duration: 300,
      delay: 200,
    });

    this.tweens.add({
      targets: this.btn_play,
      x: 100,
      ease: 'Power1',
      duration: 300,
      delay: 400,
    });
    this.tweens.add({
      targets: this.btn_replay,
      x: 100,
      ease: 'Power1',
      duration: 300,
      delay: 600,
    });
  }
  private createHandleEvents(){
    this.events.on('restartGame', ()=>{
      this.tweens.add({
        targets: [this.btn_replay, this.btn_play, this.btn_sound, this.btn_music],
        x: -600,
        ease: 'Power1',
        duration: 500,
        onComplete: () => {
          this.scene.stop("GameScene");
          this.scene.stop("MenuScene");
          this.scene.start("MenuScene");
          this.scene.stop();
        }
      });
      console.log("restart: ");
    }, this);

    // create events
    this.events.on('continue', ()=>{
      this.tweens.add({
        targets: [this.btn_replay, this.btn_play, this.btn_sound, this.btn_music],
        x: -600,
        ease: 'Power1',
        duration: 500,
        onComplete: () => {
          // this.scene.stop();
          this.game.input.mouse.requestPointerLock();
          this.scene.resume("GameScene");
        }
      });
      console.log("continue: ");
    }, this);

    this.events.on('start', ()=>{
      console.log("start Pause: ");
      this.removeListener();
    }, this);
  }

  private removeListener(){
    this.events.removeListener('continue');
    this.events.removeListener('restartGame');
  }

  update(): void {
  }
}
