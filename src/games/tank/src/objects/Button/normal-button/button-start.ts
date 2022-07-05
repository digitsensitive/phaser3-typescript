import { Button } from "./button";

export class ButtonStart extends Button{
  protected initTween(){
			super.initTween();
			this.currentScene.tweens.add({
					targets: this,
					scaleX: 1.2,
					scaleY: 1.2,
					ease: 'Sine.easeInOut',
					duration: 500,
					yoyo: true,
					repeat: -1,
				})
  }
	public handleOnPress(){
		this.currentScene.events.emit('startgame');
	}
}