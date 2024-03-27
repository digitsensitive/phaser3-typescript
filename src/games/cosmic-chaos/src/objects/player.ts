import { PlayerConstructor } from '../interfaces/player.interface';
import { settings } from '../settings';

export class Player extends Phaser.GameObjects.Image {
  private cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;
  private movementSpeed: number;
  private shoot: Phaser.GameObjects.Rectangle;
  private hasShoot: boolean;

  constructor(params: PlayerConstructor) {
    super(params.scene, params.x, params.y, params.texture);

    this.initVariables();
    this.initInput();
    this.initGameObjects();
    this.scene.add.existing(this);
  }

  private initVariables(): void {
    this.movementSpeed = 1.5;
    this.hasShoot = false;
  }

  private initInput(): void {
    this.cursorKeys = this.scene.input.keyboard.createCursorKeys();
  }

  private initGameObjects(): void {
    this.shoot = this.scene.add
      .rectangle(this.x, this.y, 2, 20, 0xff0000)
      .setVisible(false);
  }

  update(): void {
    this.handleInput();
    this.updateShoot();
  }

  private handleInput(): void {
    // Movement to left and right
    if (this.cursorKeys.left.isDown && this.x > 100) {
      this.x -= this.movementSpeed;
    } else if (
      this.cursorKeys.right.isDown &&
      this.x < this.scene.game.canvas.width - 100
    ) {
      this.x += this.movementSpeed;
    }

    // Shooting
    if (this.cursorKeys.space.isDown && !this.hasShoot) {
      this.hasShoot = true;
      this.shoot.setPosition(this.x, this.y);
      this.shoot.setVisible(true);
    }
  }

  private updateShoot(): void {
    if (this.hasShoot) {
      this.shoot.y -= 5;

      if (settings.misslesControlled) {
        this.shoot.x = this.x;
      }

      if (this.shoot.y < 0) {
        this.shoot.setPosition(this.x, this.y);
        this.shoot.setVisible(false);
        this.hasShoot = false;
      }
    }
  }

  public getShootBounds(): Phaser.Geom.Rectangle {
    return this.shoot.getBounds();
  }
}
