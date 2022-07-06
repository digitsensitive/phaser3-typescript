import { ToggleButton } from "./toggle-button";

export class ButtonMusic extends ToggleButton{
  protected handerOnPress(){
    if(!this.currentScene.registry.get('muteSound'))
      this.currentScene.sound.add('click').play();
    this.currentScene.events.emit('musicChanged');
    console.log('musicChanged btn');
  }
}