import { Player } from "../objects/player"
import BaseState from "./BaseState"

export default class UpState extends BaseState {
    private player: Player;
    constructor(player: Player) {
        super("Up")
        this.player = player
    }

    public override handleInput(): void {
      if(!this.player.tween.isPlaying()&& (this.player.moveKeyRight.isDown||this.player.moveKeyDown.isDown)){
        console.log("Tween is already playing 5")
        // this.player.statePlayer = "6";
        this.player.setCurrentState("UpRight")
        this.player.tween = this.player.scene.tweens.add({
          targets: this.player.tank,
          angle: 45,
          ease: 'Sine.easeInOut',
          duration: 100,
          yoyo: false,
          repeat: 0,
        });
      }
      else if(!this.player.tween.isPlaying()&& this.player.moveKeyLeft.isDown){
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
    }
}