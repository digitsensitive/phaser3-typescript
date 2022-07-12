import { createTweenRotationTank } from "../helpers/helpers";
import { Player } from "../objects/player"
import BaseState from "./baseState"

export default class LeftState extends BaseState {
    // private player: Player;
    constructor(player: Player) {
        super("Left", player);
        this.player = player
    }

    public handleInput(): void {
      super.handleInput();
      if((!this.player.getTween().isPlaying())){

        if(this.moveKeyUp.isDown || this.moveKeyRight.isDown){
          console.log("Tween is already playing 3")
          // this.player.statePlayer = "4";
          this.player.setCurrentState("LeftUp")
          this.player.setTween(createTweenRotationTank(this.player, -45));
        }
        else if(this.moveKeyDown.isDown){
          // this.player.statePlayer = "2";
          this.player.setCurrentState("DownLeft")
          this.player.setTween(createTweenRotationTank(this.player, -135));
        }
      }
    }
}