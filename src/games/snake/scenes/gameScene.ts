/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 Digitsensitive
 * @description  Snake: Game Scene
 * @license      Digitsensitive
 */

import { Apple } from "../objects/apple";
import { Snake } from "../objects/snake";

export class GameScene extends Phaser.Scene {
  private fieldSize: number;
  private gameHeight: number;
  private gameWidth: number;
  private boardWidth: number;
  private boardHeight: number;
  private numberHorizontalFields: number;
  private numberVerticalFields: number;
  private tick: number;

  // objects
  private player: Snake;
  private apple: Apple;
  private gameBorder: Phaser.GameObjects.Graphics[];

  // texts
  private scoreText: Phaser.GameObjects.Text;

  constructor() {
    super({
      key: "GameScene"
    });
  }

  init(): void {
    this.fieldSize = 8;
    this.gameHeight = this.sys.canvas.height;
    this.gameWidth = this.sys.canvas.width;
    this.boardWidth = this.gameWidth - 2 * this.fieldSize;
    this.boardHeight = this.gameHeight - 2 * this.fieldSize;
    this.numberHorizontalFields = this.boardWidth / this.fieldSize;
    this.numberVerticalFields = this.boardHeight / this.fieldSize;
    this.tick = 0;

    // objects
    this.player = new Snake(this);
    this.apple = new Apple();
    this.gameBorder = [];

    // texts
    this.scoreText = this.add.text(
      this.sys.canvas.width / 2,
      0,
      "" + this.player.getSnakeLength(),
      {
        fontFamily: "Courier",
        fontSize: "8px",
        fontStyle: "",
        fill: "#4df24c"
      }
    );
  }

  create(): void {
    // build game border
    let i = 0;
    for (let x = 0; x < this.gameWidth / this.fieldSize; x++) {
      for (let y = 0; y < this.gameHeight / this.fieldSize; y++) {
        if (
          y === 0 ||
          y === this.gameHeight / this.fieldSize - 1 ||
          x === 0 ||
          x === this.gameWidth / this.fieldSize - 1
        ) {
          this.gameBorder[i] = this.add
            .graphics({
              x: -this.fieldSize + x * this.fieldSize,
              y: -this.fieldSize + y * this.fieldSize,
              fillStyle: { color: "0x61e85b", alpha: 0.3 }
            })
            .fillRect(
              this.fieldSize,
              this.fieldSize,
              this.fieldSize,
              this.fieldSize
            );
          i++;
        }
      }
    }

    // create new apple
    this.apple.spawnApple({
      scene: this,
      fieldSize: this.fieldSize,
      hFields: this.numberHorizontalFields,
      vFields: this.numberVerticalFields
    });
  }

  update(time): void {
    if (this.tick === 0) {
      this.tick = time;
    }
    if (!this.player.isDead()) {
      if (time - this.tick > 100) {
        this.player.move();
        this.checkCollision();
        this.tick = time;
      }
      this.player.handleInput();
    } else {
      this.scene.start("MainMenuScene");
    }
  }

  private checkCollision(): void {
    // check collision with apple
    if (
      this.player.getHead().x === this.apple.getGraphic().x &&
      this.player.getHead().y === this.apple.getGraphic().y
    ) {
      this.player.growSnake(this);
      this.scoreText.setText("" + this.player.getSnakeLength());
      this.apple.spawnApple({
        scene: this,
        fieldSize: this.fieldSize,
        hFields: this.numberHorizontalFields,
        vFields: this.numberVerticalFields
      });
    }

    // check collision border <-> snake
    for (let i = 0; i < this.gameBorder.length; i++) {
      if (
        this.player.getHead().x === this.gameBorder[i].x &&
        this.player.getHead().y === this.gameBorder[i].y
      ) {
        this.player.setDead(true);
      }
    }

    // check snake <-> snake collision
    this.player.checkSnakeSnakeCollision();
  }
}
