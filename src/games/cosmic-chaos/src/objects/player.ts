import { PlayerConstructor } from '../interfaces/player.interface';

export class Player extends Phaser.GameObjects.Image {
  private cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;
  private movementSpeed: number;

  constructor(params: PlayerConstructor) {
    super(params.scene, params.x, params.y, params.texture);

    this.initVariables();
    this.initInput();
    this.scene.add.existing(this);
  }

  private initVariables(): void {
    this.movementSpeed = 1.5;
  }

  private initInput(): void {
    this.cursorKeys = this.scene.input.keyboard.createCursorKeys();
  }

  update(): void {
    this.handleInput();
  }

  private handleInput(): void {
    if (this.cursorKeys.left.isDown && this.x > 100) {
      this.x -= this.movementSpeed;
    } else if (
      this.cursorKeys.right.isDown &&
      this.x < this.scene.game.canvas.width - 100
    ) {
      this.x += this.movementSpeed;
    }
  }
}
