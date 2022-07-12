import { createTweenRotationTank } from "../helpers/helpers";
import { Player } from "../objects/player"
import BaseState from "./BaseState"

export default class RightDownState extends BaseState {
    // private player: Player;
    constructor(player: Player) {
        super("RightDown", player);
        // this.player = player
    }

    public handleInput(): void {
      super.handleInput();
      if(!this.player.getTween().isPlaying() && !(this.moveKeyDown.isDown&&this.moveKeyRight.isDown)){

        if((this.moveKeyLeft.isDown||this.moveKeyDown.isDown)){
          console.log("Tween is already playing 8")
          // this.player.statePlayer = "1";
          this.player.setCurrentState("Down")
          this.player.setTween(createTweenRotationTank(this.player, 180));
        }
        else if (this.moveKeyRight.isDown|| this.moveKeyUp.isDown){
          // this.player.statePlayer = "7";
          this.player.setCurrentState("Right")
          this.player.setTween(createTweenRotationTank(this.player, 90))
        }
      }
    }
}