import { Button } from "./button";

export class ButtonMenu extends Button{
	public handleOnPress(){
		console.log("onPress", this.currentScene.registry.get('muteSound'));
		if(!this.currentScene.registry.get('muteSound'))
			this.currentScene.sound.add('click').play();
		this.currentScene.scene.pause();
    this.currentScene.scene.launch('PauseScene');
	}
}