import { ToggleButton } from "./toggle-button";

export class ButtonSound extends ToggleButton{
  protected handerOnPress(): void {
    this.currentScene.scene.stop();
    this.currentScene.scene.resume("GameScene")
    console.log("GameScene: ");
  }
}