import { createTweenRotationTank } from "../helpers/helpers";
import { Player } from "../objects/player"
import BaseState from "./BaseState"

export default class LeftUpState extends BaseState {
    // private player: Player;
    constructor(player: Player) {
        super("LeftUp", player);
        // this.player = player
    }

    public handleInput(): void {
      super.handleInput();
      if(!this.player.getTween().isPlaying() && !(this.moveKeyUp.isDown&&this.moveKeyLeft.isDown)){

        if (this.moveKeyRight.isDown||this.moveKeyUp.isDown){
          console.log("Tween is already playing 4")
          // this.player.statePlayer = "5";
          this.player.setCurrentState("Up")
          this.player.setTween(createTweenRotationTank(this.player, 0));
        }
        else if (this.moveKeyLeft.isDown||this.moveKeyDown.isDown){
          // this.player.statePlayer = "3";
          this.player.setCurrentState("Left")
          this.player.setTween(createTweenRotationTank(this.player, -90));
        }
      }
    }
}