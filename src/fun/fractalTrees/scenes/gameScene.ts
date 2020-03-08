/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 Digitsensitive
 * @description  Fractal Trees: Game Scene
 * @license      Digitsensitive
 */

export class GameScene extends Phaser.Scene {
  private lines: Phaser.GameObjects.Graphics[];

  constructor() {
    super({
      key: "GameScene"
    });
  }

  preload(): void {
    this.load.image("player", "./assets/games/coinRunner/player.png");
  }

  create(): void {
    this.lines = [];
    this.lines.push(this.add.graphics());
    this.lines[0].lineStyle(1, 0xffffff);
    this.lines[0].beginPath();
    this.lines[0].moveTo(400, 800);
    this.lines[0].lineTo(400, 400);
    this.lines[0].strokePath();
    this.newBranch(100, 400, 400);

    this.input.once(
      "mouseout",
      function() {
        console.log("PAUSE");
        this.scene.stop("GameScene");
      },
      this
    );

    this.input.once(
      "pointerup",
      function() {
        console.log("RESUME");
        this.scene.start("GameScene");
      },
      this
    );
  }

  update(): void {
    this.lines[0].x += Math.sin(90);
    this.lines[0].y += Math.cos(90);
  }

  private newBranch(len: number, aX: number, aY: number): void {
    if (len > 4) {
      let newLine = this.add.graphics();
      newLine.lineStyle(1, 0xffffff);
      newLine.beginPath();
      newLine.moveTo(aX, aY);
      newLine.lineTo(aX / 2, aY / 2);
      newLine.strokePath();
      this.lines.push(newLine);
      this.newBranch(len / 2, aX / 2, aY / 2);
    }
  }
}
