import EventKeys from "../../consts/EventKeys";
import SceneKeys from "../../consts/SceneKeys";
import { MenuContainer } from "./MenuContainer";

export class MenuScene extends Phaser.Scene {
  private menuContainer: MenuContainer; 
  private menuTrackAudio: Phaser.Sound.BaseSound;
  private menuStartAudio: Phaser.Sound.BaseSound;
  constructor() {
    super({
      key: SceneKeys.MENU_SCENE
    });
  }
  
  init(): void {
    this.initGlobalDataManager();
    this.createHandleEvents();
  }
  
  create(): void {
    this.menuContainer = new MenuContainer(this, 0,0);
    this.add.existing(this.menuContainer);
    this.initAudio();
  }

  update(): void {
  }
  
  private initAudio() {
    this.menuTrackAudio = this.sound.add('menu_track');
    this.menuStartAudio = this.sound.add('menu_start');
    this.menuStartAudio.play();
    this.menuStartAudio.on('complete', ()=>{
      this.menuStartAudio.pause();
      this.menuTrackAudio.play();
      this.menuContainer.setVisibleBtnStart();
    });
  }

  private createHandleEvents(): void {
    this.events.on(EventKeys.START_GAME, ()=>{
      this.menuTrackAudio.stop();
      this.menuContainer.createTweenClose();
    }, this);

    this.events.on('start', ()=>{
      this.removeListener();
      this.input.mouse.releasePointerLock();
    }, this);

    this.events.on(EventKeys.MUTE_MUSIC, ()=>{
      if(this.menuTrackAudio.isPlaying){
        this.menuTrackAudio.pause();
      }
    })
    
    this.events.on(EventKeys.UNMUTE_MUSIC, ()=>{
      if(this.menuTrackAudio.isPaused)
          this.menuTrackAudio.resume();
      else
        this.menuTrackAudio.play();
    })
  }

  private removeListener() {
    this.events.removeListener(EventKeys.START_GAME);
    this.events.removeListener(EventKeys.MUTE_MUSIC);
    this.events.removeListener(EventKeys.UNMUTE_MUSIC);
  }

  private initGlobalDataManager(): void {
    this.registry.set('score', 0);
    this.registry.set('muteSound', false);
    this.registry.set('muteMusic', false);
  }
}
