import { createTweenRotationTank } from "../helpers/helpers";
import { Player } from "../objects/player"
import BaseState from "./baseState"

export default class RightState extends BaseState {
    // private player: Player;
    constructor(player: Player) {
        super("Right", player);
        // this.player = player
    }

    public handleInput(): void {
      super.handleInput();
        if(!this.player.getTween().isPlaying()){
          if(this.moveKeyDown.isDown|| this.moveKeyLeft.isDown){
            console.log("Tween is already playing 7")
            // this.statePlayer = "8";
            this.player.setCurrentState("RightDown")
            this.player.setTween(createTweenRotationTank(this.player, 135));
          }
          else if (this.moveKeyUp.isDown){
            // this.player.statePlayer = "6";
            this.player.setCurrentState("UpRight")
            this.player.setTween(createTweenRotationTank(this.player, 45));
          }
        }
    }
}