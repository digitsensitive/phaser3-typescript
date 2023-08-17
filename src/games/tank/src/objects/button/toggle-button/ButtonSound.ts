import { ToggleButton } from "./ToggleButton";

export class ButtonSound extends ToggleButton{
  preUpdate(): void {
    if(this.scene.registry.get('muteSound'))
      this.setFrame(0);
    else{
      this.setFrame(1);
    }
  }
  protected handerOnPress(): void {
    if(!this.scene.registry.get('muteSound')){
      this.scene.registry.set('muteSound', true);
    }else{
      this.scene.registry.set('muteSound', false);
    }
  }
}