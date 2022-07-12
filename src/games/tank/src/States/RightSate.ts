import { Player } from "../objects/player"
import BaseState from "./BaseState"

export default class RightState extends BaseState {
    private player: Player;
    constructor(player: Player) {
        super("Right")
        this.player = player
    }

    public override handleInput(): void {
        if(!this.player.tween.isPlaying()&& (this.player.moveKeyDown.isDown|| this.player.moveKeyLeft.isDown)){
          console.log("Tween is already playing 7")
          // this.statePlayer = "8";
          this.player.setCurrentState("RightDown")
          this.player.tween = this.player.scene.tweens.add({
            targets: this.player.tank,
            angle: 135,
            ease: 'Sine.easeInOut',
            duration: 100,
            yoyo: false,
            repeat: 0,
          });
        }
        else if(!this.player.tween.isPlaying()&& this.player.moveKeyUp.isDown){
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
    }
}