import { ToggleButton } from "./toggleButton";

export class ButtonSound extends ToggleButton{
  preUpdate(): void {
    if(this.currentScene.registry.get('muteSound'))
      this.setFrame(0);
    else{
      this.setFrame(1);
    }
  }
  protected handerOnPress(): void {
    if(!this.currentScene.registry.get('muteSound'))
      this.currentScene.sound.add('click').play();
    
    if(!this.currentScene.registry.get('muteSound')){
      this.currentScene.registry.set('muteSound', true);
    }else{
      this.currentScene.registry.set('muteSound', false);
    }
    console.log('muteSound', this.currentScene.registry.get('muteSound'))
  }
}