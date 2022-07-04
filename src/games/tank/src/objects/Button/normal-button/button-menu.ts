import { Button } from "./button";

export class ButtonMenu extends Button{
	public handleOnPress(){
		this.currentScene.scene.pause();
    this.currentScene.scene.launch('PauseScene');
	}
}