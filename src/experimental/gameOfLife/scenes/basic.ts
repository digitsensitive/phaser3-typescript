/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 Digitsensitive
 * @description  Game Of Life: Basic
 * @license      Digitsensitive
 */

export class Basic extends Phaser.Scene {
  // grid
  private board: number[][];
  private boardWidth: number = 20;
  private boardHeight: number = 20;

  private generation: number;

  // graphic and variables
  private cellSize: number;
  private cellsGraphics: Phaser.GameObjects.Graphics[] = [];
  private horizontalSpacing: number;
  private offset: number;
  private fieldColor: number;
  private fieldAlpha: number;

  constructor() {
    super({
      key: "Basic"
    });
  }

  init(): void {
    // init board randomly
    let i = 0;
    this.board = [];
    for (let x = 0; x < this.boardWidth; x++) {
      this.board[x] = [];
      for (let y = 0; y < this.boardHeight; y++) {
        // randomly choose 0 or 1
        this.board[x][y] = Math.round(Math.random());
        // create the graphics
        this.createField(i, this.board[x][y]);
        i++;
      }
    }

    this.cellSize = 10;
    this.generation = 0;

    // graphic
    this.cellsGraphics = [];
    this.horizontalSpacing = this.cellSize;
    this.offset = 0;
    this.fieldColor = 0xffffff;
    this.fieldAlpha = 1;
  }

  create(): void {}

  update(): void {
    this.nextGeneration();
  }

  /**
   * This function creates the next generation with the predefined
   * set of rules.
   */
  private nextGeneration(): void {
    this.generation++;
    // grid
    let i = 0;
    let nextBoard = [];
    for (let x = 0; x < this.boardWidth; x++) {
      nextBoard[x] = [];
      for (let y = 0; y < this.boardHeight; y++) {
        // get number neighbours
        let n = this.checkNumberAliveNeighbors(x, y);

        // evaluate for the game of life rules
        if (this.board[x][y] === 1 && n < 2) {
          nextBoard[x][y] = 0;
        } else if (this.board[x][y] === 1 && n > 3) {
          nextBoard[x][y] = 0;
        } else if (this.board[x][y] === 0 && n === 3) {
          nextBoard[x][y] = 1;
        } else {
          nextBoard[x][y] = this.board[x][y];
        }

        // create the graphics
        this.createField(i, nextBoard[x][y]);
        i++;
      }
    }

    this.board = nextBoard;
  }

  /**
   * This function creates a new field if the value is 1.
   * The color is set with the variable fieldColor.
   * The alpha is set with the variable fieldAlpha.
   * @param i [The field index in the cells array]
   * @param v [The field value]
   */
  private createField(i: number, v: number): void {
    let g = this.add.graphics();
    if (v === 1) {
      g.fillStyle(this.fieldColor, this.fieldAlpha);
    } else {
      g.fillStyle(0x000000, 1);
    }

    g.fillRect(
      this.offset + i * this.horizontalSpacing,
      this.offset + this.generation * this.cellSize,
      this.cellSize,
      this.cellSize
    );

    this.cellsGraphics[i] = g;
  }

  /**
   * This function checks the number of alive neighbors
   * @param  x [x position of the field to check around]
   * @param  y [y position of the field to check around]
   * @return   [number of alive neighbors]
   */
  private checkNumberAliveNeighbors(x: number, y: number): number {
    let numberNeighbors = 0;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (
          x === 0 ||
          y === 0 ||
          x === this.boardWidth - 1 ||
          y === this.boardHeight - 1
        ) {
        } else {
          numberNeighbors += this.board[x + i][y + j];
        }
      }
    }
    numberNeighbors -= this.board[x][y];
    return numberNeighbors;
  }
}
