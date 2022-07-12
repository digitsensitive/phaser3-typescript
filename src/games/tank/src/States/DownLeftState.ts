import { createTweenRotationTank } from "../helpers/helpers";
import { Player } from "../objects/player"
import BaseState from "./baseState"

export default class DownLeftState extends BaseState {
    // private player: Player;
    constructor(player: Player) {
        super("DownLeft", player)
        // this.player = player
    }

    public handleInput(): void {
      super.handleInput();
      if(!this.player.getTween().isPlaying() && !(this.moveKeyLeft.isDown&&this.moveKeyDown.isDown)){
        
        if (this.moveKeyUp.isDown||this.moveKeyLeft.isDown){
          console.log("Tween is already playing 2")
          // this.player.statePlayer = "3";
          this.player.setCurrentState("Left")
          this.player.setTween(createTweenRotationTank(this.player, -90))
        }
        else if (this.moveKeyRight.isDown||this.moveKeyDown.isDown){
          // this.player.statePlayer = "1";
          this.player.setCurrentState("Down")
          this.player.setTween( createTweenRotationTank(this.player, -180));
        }
      }
    }
}