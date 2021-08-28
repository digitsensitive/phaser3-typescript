import { settings } from '../settings';
import { IClockConstructor } from '../interfaces/interfaces';

export class Clock extends Phaser.GameObjects.Sprite {
  body: Phaser.Physics.Arcade.Body;

  private face: Phaser.GameObjects.Sprite;
  private hand: Phaser.GameObjects.Sprite;

  constructor(aParams: IClockConstructor) {
    super(aParams.scene, aParams.x, aParams.y, aParams.texture, aParams.frame);

    // face sprite
    this.face = this.scene.add.sprite(
      aParams.x,
      aParams.y,
      aParams.prefix + 'clockface'
    );
    this.face.setVisible(false);

    // hand sprite
    this.hand = this.scene.add.sprite(
      aParams.x,
      aParams.y,
      aParams.prefix + 'hand'
    );

    this.hand.setTint(0xff6378);
    this.hand.setDepth(2);
    this.hand.setRotation(Phaser.Math.Angle.Random());
    this.scene.physics.world.enable(this.hand);

    const handBody = this.hand.body as Phaser.Physics.Arcade.Body;

    handBody.angularVelocity =
      Phaser.Math.RND.between(
        settings.LEVELS[settings.currentLevel].CLOCK_SPEED.MIN,
        settings.LEVELS[settings.currentLevel].CLOCK_SPEED.MAX
      ) * Phaser.Math.RND.sign();

    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
  }

  public setActiveAppearance(): void {
    this.setDepth(1);
    this.setFrame(1);
    this.face.setDepth(2);
    this.face.setVisible(true);
    this.face.setTintFill(0xfff730);
    this.hand.setDepth(2);
    this.hand.setFrame(1);
    this.hand.setTintFill(0xfff730);
  }

  public getCurrentHandRotation(): number {
    return this.hand.rotation;
  }

  public kill(): void {
    this.face.destroy();
    this.hand.destroy();
    this.destroy();
  }
}
