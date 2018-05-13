/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 Digitsensitive
 * @description  Flappy Bird: Boot Scene
 * @license      Digitsensitive
 */

export class BootScene extends Phaser.Scene {
  constructor() {
    super({
      key: "BootScene"
    });
  }

  preload(): void {
    this.load.image("background", "./assets/games/flappyBird/bg.png");
    this.load.image("bird", "./assets/games/flappyBird/bird.png");
    this.load.spritesheet("pipe", "./assets/games/flappyBird/pipe.png", {
      frameWidth: 20,
      frameHeight: 20
    });
  }

  update(): void {
    this.scene.start("MainMenuScene");
  }
}
