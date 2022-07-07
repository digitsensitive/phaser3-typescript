import { ToggleButton } from "./toggle-button";

export class ButtonMusic extends ToggleButton{
  preUpdate(): void {
    if(this.currentScene.registry.get('muteMusic'))
      this.setFrame(0);
    else{
      this.setFrame(1);
    }
  }
  protected handerOnPress(){
    if(!this.currentScene.registry.get('muteSound'))
      this.currentScene.sound.add('click').play();

    if(!this.currentScene.registry.get('muteMusic')){
      this.currentScene.registry.set('muteMusic', true);
    }else{
      this.currentScene.registry.set('muteMusic', false);
    }

    this.currentScene.events.emit('musicChanged');
    console.log('musicChanged btn');
  }
}