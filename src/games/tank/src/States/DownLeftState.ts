import { Player } from "../objects/player"
import BaseState from "./BaseState"

export default class DownLeftState extends BaseState {
    private player: Player;
    constructor(player: Player) {
        super("DownLeft")
        this.player = player
    }

    public override handleInput(): void {
      if((!this.player.tween.isPlaying())&&(!(this.player.moveKeyLeft.isDown&&this.player.moveKeyDown.isDown)&&(this.player.moveKeyUp.isDown||this.player.moveKeyLeft.isDown))){
        console.log("Tween is already playing 2")
        // this.player.statePlayer = "3";
        this.player.setCurrentState("Left")
        this.player.tween = this.player.scene.tweens.add({
          targets: this.player.tank,
          angle: -90,
          ease: 'Sine.easeInOut',
          duration: 100,
          yoyo: false,
          repeat: 0,
        });
      }else if((!this.player.tween.isPlaying())&&(!(this.player.moveKeyLeft.isDown&&this.player.moveKeyDown.isDown)&&(this.player.moveKeyRight.isDown||this.player.moveKeyDown.isDown))){
        // this.player.statePlayer = "1";
        this.player.setCurrentState("Down")
        this.player.tween = this.player.scene.tweens.add({
          targets: this.player.tank,
          angle: -180,
          ease: 'Sine.easeInOut',
          duration: 100,
          yoyo: false,
          repeat: 0,
        });
      }
    }
}