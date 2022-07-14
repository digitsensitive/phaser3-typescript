import EventKeys from "../../../consts/EventKeys";
import { Button } from "./Button";

export class PlayButton extends Button{
	public handleOnPress(){
		this.scene.events.emit(EventKeys.CONTINUE);
	}
}