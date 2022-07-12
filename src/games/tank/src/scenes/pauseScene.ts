import { ButtonReplay } from "../objects/button/normalButton/buttonReplay";
import { ButtonPlay } from "../objects/button/normalButton/buttonPlay";
import { ButtonMusic } from "../objects/button/toggleButton/buttonMusic";
import { ButtonSound } from "../objects/button/toggleButton/buttonSound";

export class PauseScene extends Phaser.Scene {
  private btnMusic: ButtonMusic;
  private btnReplay: ButtonReplay;
  private btnPlay: ButtonPlay;
  private btnSound: ButtonSound;
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
    this.btnMusic =  new ButtonMusic({
      scene: this,
      x: 0,
      y: 0,
      texture: 'btn-music',
      frame: 1,
      numberOfFrames: 2,
      soundPress: 'click',
    })

    this.btnSound =  new ButtonSound({
      scene: this,
      x: 0,
      y: 0,
      texture: 'btn-sound',
      frame: 1,
      numberOfFrames: 2,
      soundPress: 'click',
    });
   
    this.btnPlay =  new ButtonPlay({
      scene: this,
      x: 0,
      y: 0,
      texture: 'btn-play',
      soundPress: 'click',
    }).setOrigin(0,0)
    
    this.btnReplay =  new ButtonReplay({
      scene: this,
      x: 0,
      y: 0,
      texture: 'btn-replay',
      soundPress: 'click',
    }).setOrigin(0,0);
    
    this.zone = this.add.zone(100, 140, 350, 450).setOrigin(0,0);
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
    this.btnMusic.setX(-600);
    this.btnSound.setX(-600);
    this.btnPlay.setX(-600);
    this.btnReplay.setX(-600);
    
    this.add.existing(this.btnSound);
    this.add.existing(this.btnMusic);
  }

  private initTween(){
    this.tweens.add({
      targets: this.btnMusic,
      x: 300,
      ease: 'Power1',
      duration: 300,
    });

    this.tweens.add({
      targets: this.btnSound,
      x: 100,
      ease: 'Power1',
      duration: 300,
      delay: 200,
    });

    this.tweens.add({
      targets: this.btnPlay,
      x: 100,
      ease: 'Power1',
      duration: 300,
      delay: 400,
    });
    this.tweens.add({
      targets: this.btnReplay,
      x: 100,
      ease: 'Power1',
      duration: 300,
      delay: 600,
    });
  }

  private createHandleEvents(){
    this.events.on('restartGame', ()=>{
      this.tweens.add({
        targets: [this.btnReplay, this.btnPlay, this.btnSound, this.btnMusic],
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
        targets: [this.btnReplay, this.btnPlay, this.btnSound, this.btnMusic],
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
