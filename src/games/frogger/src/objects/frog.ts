import { ImageConstructor } from '../interfaces/image.interface';

export class Frog extends Phaser.GameObjects.Image {
  body: Phaser.Physics.Arcade.Body;

  private keys: {
    up: Phaser.Input.Keyboard.Key;
    down: Phaser.Input.Keyboard.Key;
    left: Phaser.Input.Keyboard.Key;
    right: Phaser.Input.Keyboard.Key;
  };
  private moveDelay: number = 0;
  private moveSpeed: number = 150;
  private gridSize: number = 16;
  private canMove: boolean = true;

  constructor(params: ImageConstructor) {
    super(params.scene, params.x, params.y, params.texture, params.frame);

    // image
    this.setScale(1);
    this.setOrigin(0.5, 0.5);

    // physics
    this.scene.physics.world.enable(this);
    this.body.setCollideWorldBounds(false);

    // input
    this.keys = {
      up: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP),
      down: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN),
      left: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT),
      right: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
    };

    this.scene.add.existing(this);
  }

  update(): void {
    this.moveDelay++;

    if (this.moveDelay > 8 && this.canMove) {
      this.canMove = false;

      if (this.keys.up.isDown) {
        this.y -= this.gridSize;
        this.canMove = true;
        this.moveDelay = 0;
      } else if (this.keys.down.isDown) {
        this.y += this.gridSize;
        this.canMove = true;
        this.moveDelay = 0;
      } else if (this.keys.left.isDown) {
        this.x -= this.gridSize;
        this.canMove = true;
        this.moveDelay = 0;
      } else if (this.keys.right.isDown) {
        this.x += this.gridSize;
        this.canMove = true;
        this.moveDelay = 0;
      }
    } else if (this.moveDelay > 8) {
      this.canMove = true;
    }
  }
}
