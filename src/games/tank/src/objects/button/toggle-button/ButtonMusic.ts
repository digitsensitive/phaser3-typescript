import EventKeys from "../../../consts/EventKeys";
import { ToggleButton } from "./ToggleButton";

export class ButtonMusic extends ToggleButton{
  preUpdate(): void {
    if(this.scene.registry.get('muteMusic'))
      this.setFrame(0);
    else{
      this.setFrame(1);
    }
  }

  protected handerOnPress(){
    const isMuteMusic = this.scene.registry.get('muteMusic');
    
    if(!isMuteMusic){
      this.scene.registry.set('muteMusic', true);
      this.scene.events.emit(EventKeys.MUTE_MUSIC);
    }else{
      this.scene.registry.set('muteMusic', false);
      this.scene.events.emit(EventKeys.UNMUTE_MUSIC);
    }
  }
}