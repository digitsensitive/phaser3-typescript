import { Button } from "./button";

export class ButtonReplay extends Button{
	public handleOnPress(){
    this.currentScene.events.emit('restart');
    console.log("GameScene: ");
	}
}