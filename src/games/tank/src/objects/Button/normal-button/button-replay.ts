import { Button } from "./button";

export class ButtonReplay extends Button{
	public handleOnPress(){
        if(!this.currentScene.registry.get('muteSound'))
            this.currentScene.sound.add('click').play();
        this.currentScene.events.emit('restartGame');
        console.log("GameScene: ");
	}
}