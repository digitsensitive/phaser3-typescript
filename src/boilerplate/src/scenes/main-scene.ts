export class MainScene extends Phaser.Scene {
  private mySprite: Phaser.GameObjects.Sprite;

  constructor() {
    super({ key: 'MainScene' });
  }

  preload(): void {
    this.load.image('myTexture', '../assets/phaser.png');
  }

  create(): void {
    this.mySprite = this.add.sprite(400, 300, 'myTexture');
  }
}
