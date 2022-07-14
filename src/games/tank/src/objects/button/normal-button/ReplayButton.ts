import EventKeys from "../../../consts/EventKeys";
import { Button } from "./Button";

export class ReplayButton extends Button{
	public handleOnPress(){
		this.scene.events.emit(EventKeys.RESTART_GAME);
		console.log("GameScene: ");
	}
}