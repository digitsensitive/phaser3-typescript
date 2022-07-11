import { ButtonStart } from "../objects/button/normalButton/buttonStart";
import { ButtonMusic } from "../objects/button/toggleButton/buttonMusic";
import { ButtonSound } from "../objects/button/toggleButton/buttonSound";

export class MenuScene extends Phaser.Scene {
  private btn_start: ButtonStart;
  private btn_sound: ButtonSound;
  private btn_music: ButtonMusic;
  private zone!: Phaser.GameObjects.Zone;
  private menu_trackAudio: Phaser.Sound.BaseSound;
  private menu_startAudio: Phaser.Sound.BaseSound;
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
    if(!this.switchScene && !this.menu_startAudio.isPlaying){
      if(!this.registry.get('muteMusic')&&!this.menu_trackAudio.isPlaying){
        if(this.menu_trackAudio.isPaused)
          this.menu_trackAudio.resume();
        else
          this.menu_trackAudio.play();
      }
      else if(this.registry.get('muteMusic')&&this.menu_trackAudio.isPlaying){
        this.menu_trackAudio.pause();
      }
    }

  }
  private initAudio() {
    this.menu_trackAudio = this.sound.add('menu_track');
    this.menu_startAudio = this.sound.add('menu_strat');
    this.menu_startAudio.play();
    this.menu_startAudio.on('complete', ()=>{
      this.menu_startAudio.pause();
      this.menu_trackAudio.play();
      this.btn_start.setVisible(true);
    });
  }
  private createUI(){
    this.add.image(0,0,'background')
      .setOrigin(0,0)
      .setScale(0.75,0.75);
    
    const logo = this.add.image(0,0,'logo');
    this.zone = this.add.zone(140, 90, this.cameras.main.width - 140*2, this.cameras.main.height - 90*2).setOrigin(0,0)
    //  Center the picture in the game
    
    this.btn_start = new ButtonStart({
      scene: this,
      x: 0,
      y: 0,
      texture: 'btn-start'
    }).setVisible(false);
    
    
    this.btn_sound =  new ButtonSound({
      scene: this,
      x: 0,
      y: 0,
      texture: 'btn-sound',
      frame: 1,
    }, 2)
    
    this.btn_music =  new ButtonMusic({
      scene: this,
      x: 0,
      y: 0,
      texture: 'btn-music',
      frame: 1,
    }, 2)
    
    Phaser.Display.Align.In.TopCenter(logo, this.zone);
    Phaser.Display.Align.In.Center(this.btn_start, this.zone);
    Phaser.Display.Align.In.BottomLeft(this.btn_sound, this.zone);
    Phaser.Display.Align.In.BottomRight(this.btn_music, this.zone);

    this.add.existing(this.btn_sound);
  }
  
  private createTweens(): void {
    this.tweens.add({
      targets: this.btn_start,
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
      this.menu_trackAudio.stop();
      this.switchScene = true;
      this.tweens.add({
        targets: [this.btn_sound, this.btn_music],
        y: this.cameras.main.height + 200,
        ease: 'Power1',
        duration: 500,
      });
      this.tweens.add({
        targets: [this.btn_start],
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
      console.log("startGame: ");
    }, this);

    this.events.on('start', ()=>{
      this.removeListener();
      this.input.mouse.releasePointerLock();
      console.log("startMenu: ");
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
