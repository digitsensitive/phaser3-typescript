import { ImageConstructor } from '../interfaces/image.interface';

interface CarConstructor extends ImageConstructor {
  speed: number;
}

export class Car extends Phaser.GameObjects.Image {
  body: Phaser.Physics.Arcade.Body;
  private speed: number;

  constructor(params: CarConstructor) {
    super(params.scene, params.x, params.y, params.texture, params.frame);

    // image
    this.setScale(1);
    this.setOrigin(0.5, 0.5);
    this.speed = params.speed;

    // Randomize car color
    const colors = [0xff0000, 0xff6600, 0xffff00, 0x0099ff, 0xff00ff];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    this.setTint(randomColor);

    // physics
    this.scene.physics.world.enable(this);
    this.body.setVelocityX(this.speed);

    this.scene.add.existing(this);
  }

  update(): void {
    // Car movement is handled by physics velocity
  }
}
