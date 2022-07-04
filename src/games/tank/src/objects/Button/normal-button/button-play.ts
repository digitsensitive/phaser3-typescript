import { Button } from "./button";

export class ButtonPlay extends Button{
	public handleOnPress(){
		this.currentScene.events.emit('continue');
    console.log("GameScene: ");
	}
}