import SceneKeys from "../../consts/SceneKeys";
import { PauseContainer } from "./pauseContainer";

export class PauseScene extends Phaser.Scene {
  private zone!: Phaser.GameObjects.Zone;
  private pauseContainer: PauseContainer;
  constructor() {
    super({
      key: SceneKeys.PauseScene,
    });
  }

  create(): void {
    this.createUI();
    this.createHandleEvents();
  }
  
  private createUI(){
    this.pauseContainer = new PauseContainer(this, 0,0);
    this.zone = this.add.zone(100, 140,this.cameras.main.width, this.cameras.main.height).setOrigin(0,0);
    Phaser.Display.Align.In.TopLeft(
      this.pauseContainer,
      this.zone
    )
    this.pauseContainer.setX(-400);
    this.add.existing(this.pauseContainer);
  }

  private createHandleEvents(){
    this.events.on('restartGame', ()=>{
      this.pauseContainer.createTweenClose("restart")
      console.log("restart: ");
    }, this);

    // create events
    this.events.on('continue', ()=>{
      this.pauseContainer.createTweenClose("continue")
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
