import EventKeys from "../../../consts/EventKeys";
import SceneKeys from "../../../consts/SceneKeys";
import { Button } from "./Button";

export class StartButton extends Button{
  protected initTween(){
			super.initTween();
			this.scene.tweens.add({
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
		this.scene.events.emit(EventKeys.START_GAME);
	}
}