export class MainScene extends Phaser.Scene {
  private mySprite: Phaser.GameObjects.Sprite;

  // Basic sine wave
  protected amplitude: number = 5;
  protected frequency: number = 0.5;
  protected angularFrequency: number = 2 * Math.PI * this.frequency;
  protected phase: number = 1;

  constructor() {
    super({ key: "MainScene" });
  }

  preload(): void {
    this.load.image("myTexture", "../assets/phaser.png");
  }

  create(): void {
    this.mySprite = this.add.sprite(400, 350, "myTexture");
  }

  update(time: number): void {
    this.mySprite.y +=
      this.amplitude *
      Math.sin(this.angularFrequency * (time / 1000) + this.phase);
  }
}
