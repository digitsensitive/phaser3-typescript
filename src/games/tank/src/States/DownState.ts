import { createTweenRotationTank } from "../helpers/helpers";
import { Player } from "../objects/player"
import BaseState from "./baseState"

export default class DownState extends BaseState {
    // private player: Player;
    constructor(player: Player) {
        super("Down", player);
        // this.player = player
    }

    public handleInput(): void {
      super.handleInput();
      if((!this.player.getTween() || !this.player.getTween().isPlaying())){

        if (this.moveKeyLeft.isDown||this.moveKeyUp.isDown){
          // this.player.statePlayer = "2";
          this.player.setCurrentState("DownLeft")
          this.player.setTween(createTweenRotationTank(this.player, -135));
        }
        else if (this.moveKeyRight.isDown){
          // this.player.statePlayer = "8";
          this.player.setCurrentState("RightDown")
          this.player.setTween(createTweenRotationTank(this.player, -225));
        }
      }
    }
}