/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2020 Digitsensitive
 * @description  Cellular automaton: Game Scene
 *
 * This experimental project was created to explore `cellular automaton`,
 * originally discovered in the 1940s by Stanislaw Ulam and John von Neumann.
 *
 * A cellular automaton is a `discrete model`, that consists of a `grid of cells`
 * (can be in any finite number of dimensions).
 * Each cell is in `one of a finite number of states`. The simplest example has
 * two possibilities of 1 and 0 (“on” and “off” or “alive” and “dead”).
 *
 * Every cell defines a set of cells called its `neighborhood`.
 *
 * At start an initial state (t = 0) is selected by assigning a state for each cell.
 * New generation are created (t = t + 1) according to some fixed rule
 * (f.e. a mathematical function) that determine the new state of a cell in terms
 * of the current state of the cell and the states of the cells in its neighborhood.
 * Typically, the rule for updating the state of cells is the same for each cell
 * and does not change over time, and is applied to the whole grid simultaneously.
 * Exceptions are: The stochastic cellular automaton and asynchronous cellular automaton.
 *
 * Cellular automata can simulate a variety of real-world systems, including
 * biological and chemical ones. Von Neumann’s work in self-replication and
 * cellular automaton is conceptually similar to what is probably the most famous
 * cellular automaton: the "Game of Life".
 *
 * Ressources:
 * [1] [Wikipedia](https://en.wikipedia.org/wiki/Cellular_automaton)
 * [2] [Nature Of Code](http://natureofcode.com/book/chapter-7-cellular-automata)
 * [3] [The Wolfram Atlas](http://atlas.wolfram.com/TOC/TOC_101.html)
 * [3] [Stephen Wolfram’s 1,280-page A New Kind of Science](http://www.wolframscience.com/nks)
 *
 * @license      Digitsensitive
 */

import { RULESETS } from "./const/rulesets";
import { Cell } from "./objects/cell";
import { CONST } from "./const/const";

export class GameScene extends Phaser.Scene {
  private cells: Cell[][];
  private generation: number;
  private ruleset: number[];

  constructor() {
    super({
      key: "GameScene",
    });
  }

  init(): void {
    // Fill out grid with cells
    this.cells = [];
    for (let y = 0; y < CONST.GRID_HEIGHT; y++) {
      this.cells[y] = [];
      for (let x = 0; x < CONST.GRID_HEIGHT; x++) {
        this.cells[y][x] = new Cell({
          scene: this,
          x: x * CONST.CELLSIZE,
          y: y * CONST.CELLSIZE,
        });
      }
    }

    // Push our 9 cells into line one in the center
    const fixedCells = [0, 1, 0, 0, 1, 1, 1, 1, 1];
    const startingPosition = CONST.GRID_WIDTH / 2 - 4;

    for (let x = 0; x < fixedCells.length; x++) {
      this.cells[0][startingPosition + x].setValue(fixedCells[x]);
    }

    this.generation = 0;
    this.ruleset = RULESETS[11];
  }

  update(): void {
    for (let x = 0; x < CONST.GRID_WIDTH; x++) {
      if (this.cells[this.generation][x].getValue() === 1) {
        this.cells[this.generation][x].setVisible(true);
      }
    }

    if (this.generation < CONST.GRID_HEIGHT - 1) {
      this.evaluateNextGeneration();
    }
  }

  private evaluateNextGeneration(): void {
    for (let x = 0; x < CONST.GRID_WIDTH; x++) {
      // only process the rules when not the edge cells
      if (x !== 0 && x !== CONST.GRID_WIDTH - 1) {
        const left = this.cells[this.generation][x - 1].getValue();
        const current = this.cells[this.generation][x].getValue();
        const right = this.cells[this.generation][x + 1].getValue();
        this.cells[this.generation + 1][x].setValue(
          this.parseThroughTheRules(left, current, right)
        );
      } else {
        this.cells[this.generation + 1][x].setVisible(false);
      }
    }

    this.generation++;
  }

  /**
   * Parse the neightbour as a string and convert it to a integer
   */
  private parseThroughTheRules(l: number, c: number, r: number): number {
    const s = "" + l + c + r;
    const index = parseInt(s, 2);
    return this.ruleset[index];
  }

  private getRandomRuleset(): number[] {
    return RULESETS[Math.floor(Math.random() * RULESETS.length)];
  }
}
