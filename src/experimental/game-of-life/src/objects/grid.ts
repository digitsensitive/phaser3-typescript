import { Cell } from './cell';

export class Grid {
  private cells: Cell[][];
  private height: number;
  private width: number;

  constructor(height: number, width: number) {
    // Init grid parameters
    this.height = height;
    this.width = width;

    // Init empty cells
    this.cells = this.createCells(this.width, this.height);
  }

  /**
   * Create an array with a specific value to start with.
   * @param w
   * @param h
   * @param val
   */
  private createCells(w: number, h: number): Cell[][] {
    let array: Cell[][] = [];
    for (let y = 0; y < h; y++) {
      array[y] = [];
      for (let x = 0; x < w; x++) {
        array[y][x] = new Cell(x, y, 0);
      }
    }

    return array;
  }

  /**
   * Get the number of alive neighbors
   * @param x
   * @param y
   */
  private getNumberOfAliveNeighbors(x: number, y: number): number {
    let numberOfAliveNeighbors = 0;

    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        if (!this.isOutsideOfGrid(x + dx, y + dy)) {
          numberOfAliveNeighbors += this.cells[y + dy][x + dx].getValue();
        }
      }
    }
    if (this.cells[y][x].getValue() === 1) {
      if (numberOfAliveNeighbors > 0) {
        numberOfAliveNeighbors -= 1;
      }
    }

    return numberOfAliveNeighbors;
  }

  /**
   * Check if cell is outside of the grid.
   * @param x
   * @param y
   */
  public isOutsideOfGrid(x: number, y: number): boolean {
    return x < 0 || y < 0 || x > this.width - 1 || y > this.height - 1;
  }

  /**
   * Get all the cells of this grid.
   */
  public getCells(): Cell[] {
    let cellArray: Cell[] = [];
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        cellArray.push(this.cells[y][x]);
      }
    }
    return cellArray;
  }

  /**
   * Add a pattern at a specific position on the grid.
   * @param xPos
   * @param yPos
   * @param pattern
   */
  public addPattern(xPos: number, yPos: number, pattern: number[][]): void {
    for (let y = 0; y < pattern.length; y++) {
      for (let x = 0; x < pattern[y].length; x++) {
        if (pattern[y][x] === 0) {
          continue;
        }

        this.cells[y + yPos][x + xPos].setValue(pattern[y][x]);
      }
    }
  }

  public evaluateRules(): void {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        // get number neighbours
        let n = this.getNumberOfAliveNeighbors(x, y);

        // evaluate for the game of life rules
        if (this.cells[y][x].getValue() === 1) {
          if (n < 2 || n > 3) {
            this.cells[y][x].setValueChange();
          }
        } else {
          if (n === 3) {
            this.cells[y][x].setValueChange();
          }
        }
      }
    }

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        if (this.cells[y][x].changeValue()) {
          if (this.cells[y][x].getValue() === 1) {
            this.cells[y][x].setValue(0);
          } else {
            this.cells[y][x].setValue(1);
          }
          this.cells[y][x].setValueToFalse();
        }
      }
    }
  }
}
