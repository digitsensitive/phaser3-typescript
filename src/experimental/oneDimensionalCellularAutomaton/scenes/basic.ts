/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 Digitsensitive
 * @description  Cellular Automaton: Basic
 * @license      Digitsensitive
 */

export class Basic extends Phaser.Scene {
  // grid
  private numberOfCells: number;
  private cells: number[];
  private generation: number;
  private ruleset: number[];

  // graphic and variables
  private cellSize: number;
  private cellsGraphics: Phaser.GameObjects.Graphics[];
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
    // grid
    this.cellSize = 10;
    this.numberOfCells = this.sys.canvas.width / this.cellSize;
    this.cells = [];
    this.generation = 0;
    this.ruleset = [0, 1, 0, 1, 1, 0, 1, 0];
    this.generateRuleset();
    this.generateStartingCells();

    // graphic
    this.cellsGraphics = [];
    this.horizontalSpacing = this.cellSize;
    this.offset = 0;
    this.fieldColor = 0xffffff;
    this.fieldAlpha = 1;
  }

  create(): void {
    // create the graphics
    this.cells.forEach((item, index) => {
      this.createField(index, item);
    });
  }

  update(): void {
    this.nextGeneration();

    if (this.generation * this.cellSize > this.sys.canvas.height) {
      this.scene.start("Basic");
    }
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
   * This function creates the next generation with the predefined
   * set of rules.
   */
  private nextGeneration(): void {
    this.generation++;
    let nextGen = [];

    for (let i = 0; i < this.cells.length; i++) {
      // only process the rules when not the edge points
      if (i !== 0 && i !== this.cells.length - 1) {
        let left = this.cells[i - 1];
        let current = this.cells[i];
        let right = this.cells[i + 1];
        nextGen[i] = this.parseThroughTheRules(left, current, right);
      } else {
        nextGen[i] = 0;
      }

      this.createField(i, nextGen[i]);
    }

    this.cells = nextGen;
  }

  /**
   * Parse the neightbour as a string and convert it to a integer
   * @param  l [value of the field on the left]
   * @param  c [value of the current field]
   * @param  r [value of the field on the right]
   * @return   [the value]
   */
  private parseThroughTheRules(l: number, c: number, r: number): number {
    let s = "" + l + c + r;
    let index = parseInt(s, 2);

    return this.ruleset[index];
  }

  private generateRuleset(): void {
    let newRuleset = [];
    for (let i = 0; i < 8; i++) {
      newRuleset.push(Math.round(Math.random()));
    }
    this.ruleset = newRuleset;
  }

  private generateStartingCells(): void {
    let newStartingCells = [];
    for (let i = 0; i < this.numberOfCells; i++) {
      newStartingCells.push(Math.round(Math.random()));
    }
    this.cells = newStartingCells;
  }
}
