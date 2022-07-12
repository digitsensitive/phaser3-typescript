import { Player } from "../objects/player";

export default class BaseState {
	state: string
	player: Player
	// input
	public moveKeyLeft: Phaser.Input.Keyboard.Key;
	public moveKeyRight: Phaser.Input.Keyboard.Key;
	public moveKeyUp: Phaser.Input.Keyboard.Key;
	public moveKeyDown: Phaser.Input.Keyboard.Key;
	constructor(state: string, player: Player) {
			this.state = state
			this.player = player;
			this.initInput();
	}

	public handleInput(): void {
		this.player.body.setVelocity(0);

    // move tank
    if (this.moveKeyLeft.isDown) {
      this.player.body.setVelocityX(-this.player.getSpeed())
    } else if (this.moveKeyRight.isDown) {
        this.player.body.setVelocityX(this.player.getSpeed())
    }
    if (this.moveKeyUp.isDown) {
      this.player.body.setVelocityY(-this.player.getSpeed())
    } else if (this.moveKeyDown.isDown) {
      this.player.body.setVelocityY(this.player.getSpeed());
    }
	}

	private initInput(): void {
			// input
		this.moveKeyLeft = this.player.scene.input.keyboard.addKey(
			Phaser.Input.Keyboard.KeyCodes.A
		);
		this.moveKeyRight = this.player.scene.input.keyboard.addKey(
			Phaser.Input.Keyboard.KeyCodes.D
		);
		this.moveKeyUp = this.player.scene.input.keyboard.addKey(
			Phaser.Input.Keyboard.KeyCodes.W
		);
		this.moveKeyDown = this.player.scene.input.keyboard.addKey(
			Phaser.Input.Keyboard.KeyCodes.S
		);
	}
}