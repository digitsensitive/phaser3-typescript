import { Player } from "../objects/player"
import BaseState from "./BaseState"

export default class DownState extends BaseState {
    private player: Player;
    constructor(player: Player) {
        super("Down")
        this.player = player
    }

    public override handleInput(): void {
      if((!this.player.tween || !this.player.tween.isPlaying())&&(this.player.moveKeyLeft.isDown||this.player.moveKeyUp.isDown)){
        // this.player.statePlayer = "2";
        this.player.setCurrentState("DownLeft")
        this.player.tween = this.player.scene.tweens.add({
          targets: this.player.tank,
          angle: -135,
          ease: 'Sine.easeInOut',
          duration: 100,
          yoyo: false,
          repeat: 0,
        });
      }
      else if((!this.player.tween || !this.player.tween.isPlaying())&&(this.player.moveKeyRight.isDown)){
        // this.player.statePlayer = "8";
        this.player.setCurrentState("RightDown")
        this.player.tween = this.player.scene.tweens.add({
          targets: this.player.tank,
          angle: -225,
          ease: 'Sine.easeInOut',
          duration: 100,
          yoyo: false,
          repeat: 0,
        });
      }
    }
}