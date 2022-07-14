import { settings } from '../settings';

export class Brick extends Phaser.GameObjects.Rectangle {
  body: Phaser.Physics.Arcade.Body;
  isdestroyed!: boolean;
  constructor(aParams: IRectangleConstructor) {
    super(
      aParams.scene,
      aParams.x,
      aParams.y,
      aParams.width,
      aParams.height,
      aParams.fillColor,
      aParams.fillAlpha
    );
    this.isdestroyed = false;
    this.initRectangle();
    this.initPhysics(); 
    this.scene.add.existing(this);
  }

  private initRectangle(): void {
    this.setOrigin(0);
    this.setScale(0,0);
    const x = this.x / (settings.BRICK.WIDTH + settings.BRICK.SPACING);
    const y = (this.y - settings.BRICK.MARGIN_TOP) / (settings.BRICK.HEIGHT + settings.BRICK.SPACING);
    const WIDTH = settings.LEVELS[settings.currentLevel].WIDTH;
    this.scene.tweens.add({
      targets: this,
      scaleX: 1,
      scaleY: 1,
      ease: 'Sine.easeInOut',
      duration: 300,
      delay: this.scene.tweens.stagger(50, {}),
      repeat: 0,
      yoyo: false,
      onComplete: () => {
        this.body.setSize(settings.BRICK.WIDTH, settings.BRICK.HEIGHT);
      }
    });
    
  }

  update(): void {
    if(this.y > this.scene.scale.height - 100)
      this.destroy();
  }

  private initPhysics(): void {
    this.scene.physics.world.enable(this);
    this.body.setImmovable(true);
  }

  public destroyBrick(): void {
    this.isdestroyed = true;
    this.setOrigin(0.5,0.5);
    this.body.setAccelerationY(150);
    this.body.checkCollision.none = true;
    this.scene.tweens.add({
      targets: this,
      duration: 1000,
      yoyo: false,
      angle: 360,
      repeat: -1,
    });
  }
}
