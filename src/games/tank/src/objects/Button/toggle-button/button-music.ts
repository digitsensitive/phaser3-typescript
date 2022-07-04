import { ToggleButton } from "./toggle-button";

export class ButtonMusic extends ToggleButton{
  protected handerOnPress(){
    this.currentScene.scene.stop();
    this.currentScene.scene.stop("GameScene");
    this.currentScene.scene.start("GameScene");
    console.log("GameScene: ");
  }
}