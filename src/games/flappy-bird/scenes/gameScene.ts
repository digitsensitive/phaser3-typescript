/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 Digitsensitive
 * @description  Flappy Bird: Game Scene
 * @license      Digitsensitive
 */

import { Bird } from "../objects/bird";
import { Pipe } from "../objects/pipe";

export class GameScene extends Phaser.Scene {
  // objects
  private bird: Bird;
  private pipes: Phaser.GameObjects.Group;
  private bg: Phaser.GameObjects.TileSprite;

  // variables
  private timer: Phaser.Time.TimerEvent;
  private score: number;
  private scoreText: Phaser.GameObjects.Text[];

  constructor() {
    super({
      key: "GameScene"
    });
  }

  init(): void {
    // objects
    this.bird = null;
    this.pipes = this.add.group({ classType: Pipe });
    this.bg = null;

    // variables
    this.timer = undefined;
    this.score = -1;
    this.scoreText = [];
  }

  create(): void {
    this.bg = this.add.tileSprite(0, 0, 135, 200, "background");
    this.bg.setScale(6);

    this.scoreText.push(
      this.add.text(this.sys.canvas.width / 2 - 14, 30, "0", {
        fontFamily: "Connection",
        fontSize: "40px",
        fill: "#000"
      })
    );
    this.scoreText.push(
      this.add.text(this.sys.canvas.width / 2 - 16, 30, "0", {
        fontFamily: "Connection",
        fontSize: "40px",
        fill: "#fff"
      })
    );

    this.addRowOfPipes();

    this.bird = new Bird({
      scene: this,
      x: 50,
      y: 100,
      key: "bird"
    });

    this.timer = this.time.addEvent({
      delay: 1500,
      callback: this.addRowOfPipes,
      callbackScope: this,
      loop: true
    });
  }

  update(): void {
    if (!this.bird.getDead()) {
      this.bg.tilePositionX -= 1;
      this.bird.update();
      this.physics.overlap(this.bird, this.pipes, this.hitPipe, null, this);
    } else {
      Phaser.Actions.Call(
        this.pipes.getChildren(),
        function(pipe) {
          pipe.body.setVelocityX(0);
        },
        this
      );

      if (this.bird.y > this.sys.canvas.height) {
        this.restartGame();
      }
    }
  }

  private addOnePipe(x, y, frame, hole): void {
    // create a pipe at the position x and y
    let pipe = new Pipe({
      scene: this,
      x: x,
      y: y,
      frame: frame,
      key: "pipe"
    });

    // add pipe to group
    this.pipes.add(pipe);
  }

  private addRowOfPipes(): void {
    // update the score
    this.score += 1;
    this.scoreText[0].setText("" + this.score);
    this.scoreText[1].setText("" + this.score);

    // randomly pick a number between 1 and 5
    let hole = Math.floor(Math.random() * 5) + 1;

    // add 6 pipes with one big hole at position hole and hole + 1
    for (let i = 0; i < 10; i++) {
      if (i != hole && i != hole + 1 && i != hole + 2) {
        if (i == hole - 1) {
          this.addOnePipe(400, i * 60, 0, hole);
        } else if (i == hole + 3) {
          this.addOnePipe(400, i * 60, 1, hole);
        } else {
          this.addOnePipe(400, i * 60, 2, hole);
        }
      }
    }
  }

  private hitPipe() {
    this.bird.setDead(true);
  }

  private restartGame(): void {
    this.scene.start("MainMenuScene");
  }
}
