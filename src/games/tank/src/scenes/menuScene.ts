import { ButtonStart } from "../objects/button/normalButton/buttonStart";
import { ButtonMusic } from "../objects/button/toggleButton/buttonMusic";
import { ButtonSound } from "../objects/button/toggleButton/buttonSound";

export class MenuScene extends Phaser.Scene {
  private btnStart: ButtonStart;
  private btnSound: ButtonSound;
  private btnMusic: ButtonMusic;
  private zone!: Phaser.GameObjects.Zone;
  private menuTrackAudio: Phaser.Sound.BaseSound;
  private menuStartAudio: Phaser.Sound.BaseSound;
  private switchScene!: boolean;
  constructor() {
    super({
      key: 'MenuScene'
    });
  }
  
  init(): void {
    this.initGlobalDataManager();
    this.createHandleEvents();
    this.switchScene = false;
  }
  
  create(): void {
    
    this.initAudio();
    this.createUI();
    this.createTweens();
  }

  update(): void {
    // if switchScene then stop audio
    if(!this.switchScene && !this.menuStartAudio.isPlaying){
      if(!this.registry.get('muteMusic')&&!this.menuTrackAudio.isPlaying){
        if(this.menuTrackAudio.isPaused)
          this.menuTrackAudio.resume();
        else
          this.menuTrackAudio.play();
      }
      else if(this.registry.get('muteMusic')&&this.menuTrackAudio.isPlaying){
        this.menuTrackAudio.pause();
      }
    }

  }
  
  private initAudio() {
    this.menuTrackAudio = this.sound.add('menu_track');
    this.menuStartAudio = this.sound.add('menu_strat');
    this.menuStartAudio.play();
    this.menuStartAudio.on('complete', ()=>{
      this.menuStartAudio.pause();
      this.menuTrackAudio.play();
      this.btnStart.setVisible(true);
    });
  }

  private createUI(){
    this.add.image(0,0,'background')
      .setOrigin(0,0)
      .setScale(0.75,0.75);
    
    const logo = this.add.image(0,0,'logo');
    this.zone = this.add.zone(140, 90, this.cameras.main.width - 140*2, this.cameras.main.height - 90*2).setOrigin(0,0)
    //  Center the picture in the game
    
    this.btnStart = new ButtonStart({
      scene: this,
      x: 0,
      y: 0,
      texture: 'btn-start',
      soundPress: 'select',
    }).setVisible(false);
    
    
    this.btnSound =  new ButtonSound({
      scene: this,
      x: 0,
      y: 0,
      texture: 'btn-sound',
      frame: 1,
      numberOfFrames: 2,
      soundPress: 'click',
    })
    
    this.btnMusic =  new ButtonMusic({
      scene: this,
      x: 0,
      y: 0,
      texture: 'btn-music',
      frame: 1,
      numberOfFrames: 2,
      soundPress: 'click',
    })
    
    Phaser.Display.Align.In.TopCenter(logo, this.zone);
    Phaser.Display.Align.In.Center(this.btnStart, this.zone);
    Phaser.Display.Align.In.BottomLeft(this.btnSound, this.zone);
    Phaser.Display.Align.In.BottomRight(this.btnMusic, this.zone);

    this.add.existing(this.btnSound);
  }
  
  private createTweens(): void {
    this.tweens.add({
      targets: this.btnStart,
      scaleX: 1.2,
      scaleY: 1.2,
      ease: 'Sine.easeInOut',
      duration: 500,
      yoyo: true,
      repeat: -1,
    })
  }

  private createHandleEvents(): void {
    this.events.on('startGame', ()=>{
      this.menuTrackAudio.stop();
      this.switchScene = true;
      this.tweens.add({
        targets: [this.btnSound, this.btnMusic],
        y: this.cameras.main.height + 200,
        ease: 'Power1',
        duration: 500,
      });
      this.tweens.add({
        targets: [this.btnStart],
        y: -200,
        ease: 'Power1',
        duration: 500,
        onComplete: () => {
          this.scene.stop("MenuScene")
          this.game.input.mouse.requestPointerLock();
          this.scene.stop("GameScene");
          this.scene.start("GameScene");
        }
      });
    }, this);

    this.events.on('start', ()=>{
      this.removeListener();
      this.input.mouse.releasePointerLock();
    }, this);
  }

  private removeListener() {
    this.events.removeListener('startGame');
  }

  private initGlobalDataManager(): void {
    this.registry.set('score', 0);
    this.registry.set('muteSound', false);
    this.registry.set('muteMusic', false);
  }
}
