import EventKeys from "../../consts/EventKeys";
import SceneKeys from "../../consts/SceneKeys";
import { PauseContainer } from "./PauseContainer";

export class PauseScene extends Phaser.Scene {
  private pauseContainer: PauseContainer;

  constructor() {
    super({
      key: SceneKeys.PAUSE_SCENE,
    });
  }

  create(): void {
    this.createUI();
    this.createHandleEvents();
  }

  update(): void {
  }
  
  private createUI(){
    this.pauseContainer = new PauseContainer(this, 0,0)
    this.pauseContainer.setX(-400);
    this.add.existing(this.pauseContainer);
  }

  private createHandleEvents(){
    this.events.on(EventKeys.RESTART_GAME, 
      ()=>{
      this.pauseContainer.createTweenClose("restart")
    }, this);

    // create events
    this.events.on(EventKeys.CONTINUE, 
      ()=>{
      this.pauseContainer.createTweenClose("continue")
    }, this);

    this.events.on('start', 
      ()=>{
      this.removeListener();
    }, this);
  }

  private removeListener(){
    this.events.removeListener(EventKeys.CONTINUE);
    this.events.removeListener(EventKeys.RESTART_GAME);
  }
}
