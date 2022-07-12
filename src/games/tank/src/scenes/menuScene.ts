import { MenuContainer } from "../objects/container/menuContainer";

export class MenuScene extends Phaser.Scene {
  private menuContainer: MenuContainer; 
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
    this.menuContainer = new MenuContainer(this, 0,0);
    this.add.existing(this.menuContainer);
    this.initAudio();
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
      this.menuContainer.setVisibleBtnStart();
    });
  }

  private createHandleEvents(): void {
    this.events.on('startGame', ()=>{
      this.menuTrackAudio.stop();
      this.switchScene = true;
      this.menuContainer.createTweenClose();
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
