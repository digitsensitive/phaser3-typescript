import SceneKeys from "../../../consts/SceneKeys";
import { Button } from "./Button";

export class MenuButton extends Button{
	public handleOnPress(){
		this.scene.scene.pause();
    this.scene.scene.launch(SceneKeys.PAUSE_SCENE);
	}
}