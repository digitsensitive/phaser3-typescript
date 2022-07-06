import { Button } from "./button";

export class ButtonPlay extends Button{
	public handleOnPress(){
		if(!this.currentScene.registry.get('muteSound'))
		 this.currentScene.sound.add('click').play();
		this.currentScene.events.emit('continue');
    console.log("GameScene: ");
	}
}