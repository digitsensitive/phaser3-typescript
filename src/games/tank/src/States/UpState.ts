import { createTweenRotationTank } from "../helpers/helpers";
import { Player } from "../objects/player"
import BaseState from "./baseState"

export default class UpState extends BaseState {
    // private player: Player;
    constructor(player: Player) {
        super("Up", player)
        // this.player = player
    }

    public handleInput(): void {
      super.handleInput();
      if(!this.player.getTween().isPlaying()){

        if(this.moveKeyRight.isDown||this.moveKeyDown.isDown){
          console.log("Tween is already playing 5")
          // this.player.statePlayer = "6";
          this.player.setCurrentState("UpRight")
          this.player.setTween(createTweenRotationTank(this.player, 45));
        }

        else if (this.moveKeyLeft.isDown){
          // this.player.statePlayer = "4";
          this.player.setCurrentState("LeftUp")
          this.player.setTween(createTweenRotationTank(this.player, -45));
        }
      }
    }
}