import { IGraphics } from "../interfaces/graphics.interface";

export class Bomb {
  body: Phaser.Physics.Arcade.Body;

  // variables
  private currentScene: Phaser.Scene;
  private activated: boolean;
  public isExploding: boolean;

  // graphics
  private activationCircleGraphics: Phaser.GameObjects.Graphics;
  public activationCircle: Phaser.Geom.Circle;

  constructor(scene: Phaser.Scene) {
    // variables
    this.currentScene = scene;
    this.activated = false;
    this.isExploding = false;

    // graphics
    this.activationCircleGraphics = this.currentScene.add.graphics();

    // circle
    this.activationCircle = new Phaser.Geom.Circle(0, 0, 0);
  }

  update(): void {
    if (this.activated) {
      if (this.activationCircle.isEmpty()) {
        this.activated = false;
        this.isExploding = false;
        return;
      }
      this.activationCircleGraphics.clear();
      this.activationCircle.radius += 0.05;
      this.activationCircleGraphics.lineStyle(3, 0x306230);
      this.activationCircleGraphics.strokeCircleShape(this.activationCircle);
    } else {
      this.activationCircleGraphics.clear();
    }
  }

  public isActive(): boolean {
    return this.activated;
  }

  private isActivated(active: boolean): void {
    this.activated = active;
  }

  private createActivationCircle(x: number, y: number): void {
    this.activationCircle.x = x;
    this.activationCircle.y = y;
    this.activationCircle.radius = 5;
    this.activationCircleGraphics.strokeCircleShape(this.activationCircle);
    this.isActivated(true);
  }

  private explode(): void {
    this.currentScene.cameras.main.shake();
    let tween = this.currentScene.tweens.add({
      targets: this.activationCircle,
      props: { radius: this.activationCircle.radius + 20, alpha: 0 },
      duration: 200,
      ease: "Power0",
      repeat: 0,
      onComplete: function () {
        this.targets[0].setEmpty();
      },
      yoyo: false,
    });
    this.isExploding = true;
  }
}
