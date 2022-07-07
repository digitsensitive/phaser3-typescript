import { ButtonMusic } from "../objects/Button/toggle-button/button-music";
import { ButtonStart } from "../objects/Button/normal-button/button-start";
import { ButtonSound } from "../objects/Button/toggle-button/button-sound";

export class MenuScene extends Phaser.Scene {
  private btn_start: ButtonStart;
  private btn_sound: ButtonSound;
  private btn_music: ButtonMusic;
  private zone!: Phaser.GameObjects.Zone;
  private menu_trackAudio: Phaser.Sound.BaseSound;

  constructor() {
    super({
      key: 'MenuScene'
    });
  }
  
  init(): void {
    this.initGlobalDataManager();
    this.createHandleEvents();
  }
  
  create(): void {
    this.menu_trackAudio = this.sound.add('menu_track');
    const menu_startAudio = this.sound.add('menu_strat');
    menu_startAudio.play();
    menu_startAudio.on('complete', ()=>{
      menu_startAudio.removeAllListeners();
      this.menu_trackAudio.play();
      this.btn_start.setVisible(true);
    });
    this.createUI();
    this.createTweens();
  }

  update(): void {
    if(!this.registry.get('muteMusic')&&!this.menu_trackAudio.isPlaying){
      if(this.menu_trackAudio.isPaused)
        this.menu_trackAudio.resume();
      else
        this.menu_trackAudio.play();
    }
    else if(this.registry.get('muteMusic')&&this.menu_trackAudio.isPlaying){
      this.menu_trackAudio.pause();
      console.log('Audio is paused',this.menu_trackAudio.isPaused);
    }
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
          this.menu_trackAudio.pause();
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
