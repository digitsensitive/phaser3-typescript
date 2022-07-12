import { createTweenRotationTank } from "../helpers/helpers";
import { Player } from "../objects/player"
import BaseState from "./baseState"

export default class UpRightState extends BaseState {
    // private player: Player;
    constructor(player: Player) {
        super("UpRight",player)
        // this.player = player
    }

    public handleInput(): void {
      super.handleInput();
      if(!this.player.getTween().isPlaying()&& !(this.moveKeyRight.isDown&&this.moveKeyUp.isDown)){

        if(this.moveKeyDown.isDown||this.moveKeyRight.isDown){
          console.log("Tween is already playing 6")
          // this.player.statePlayer = "7";
          this.player.setCurrentState("Right")
          this.player.setTween(createTweenRotationTank(this.player, 90));
        }

        else if (this.moveKeyUp.isDown||this.moveKeyLeft.isDown){
          // this.player.statePlayer = "5";
          this.player.setCurrentState("Up")
          this.player.setTween(createTweenRotationTank(this.player, 0))
        }
      }
    }
}