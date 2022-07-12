import { Player } from "../objects/player"
import BaseState from "./BaseState"

export default class LeftState extends BaseState {
    private player: Player;
    constructor(player: Player) {
        super("Left")
        this.player = player
    }

    public override handleInput(): void {
      if((!this.player.tween.isPlaying())&&(this.player.moveKeyUp.isDown || this.player.moveKeyRight.isDown)){
        console.log("Tween is already playing 3")
        // this.player.statePlayer = "4";
        this.player.setCurrentState("LeftUp")
        this.player.tween = this.player.scene.tweens.add({
          targets: this.player.tank,
          angle: -45,
          ease: 'Sine.easeInOut',
          duration: 100,
          yoyo: false,
          repeat: 0,
        });
      }
      else if((!this.player.tween.isPlaying())&&this.player.moveKeyDown.isDown){
        // this.player.statePlayer = "2";
        this.player.setCurrentState("DownLeft")
        this.player.tween = this.player.scene.tweens.add({
          targets: this.player.tank,
          angle: -135,
          ease: 'Sine.easeInOut',
          duration: 100,
          yoyo: false,
          repeat: 0,
        });
      }
    }
}