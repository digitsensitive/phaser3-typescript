import { ToggleButton } from "./toggle-button";

export class ButtonPause extends ToggleButton{
  protected handerOnPress(): void {
      this.currentScene.scene.pause();
      this.currentScene.scene.launch('PauseScene');
  }
}