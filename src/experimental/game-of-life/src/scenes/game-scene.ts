/**
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
 * [3] [Stephen Wolfram’s 1,280-page A New Kind of Science](http://www.wolframscience.com/nks)
 */

import { Grid } from '../objects/grid';
import { PATTERNS } from '../objects/patterns/patterns';

export class GameScene extends Phaser.Scene {
  // Grid
  private grid: Grid;
  private gridWidth: number;
  private gridHeight: number;

  // Variables
  private generation: number;

  // Timer
  private timerForNextGeneration: Phaser.Time.TimerEvent;

  // Graphic and variables
  private cellHeight: number;
  private cellsGraphics: Phaser.GameObjects.Graphics[] = [];
  private cellWidth: number;
  private fieldColor: number;
  private fieldAlpha: number;
  private generationText: Phaser.GameObjects.Text;

  constructor() {
    super({
      key: 'GameScene'
    });
  }

  init(): void {
    // Init grid instance
    this.gridWidth = 50;
    this.gridHeight = 50;
    this.grid = new Grid(this.gridHeight, this.gridWidth);

    // Init variables
    this.generation = 0;

    // Init graphic and variables
    this.cellWidth = this.sys.canvas.width / this.gridWidth;
    this.cellHeight = this.sys.canvas.height / this.gridHeight;
    this.cellsGraphics = [];
    this.fieldColor = 0xedbe3b;
    this.fieldAlpha = 1;
    this.generationText = this.add
      .text(10, 10, 'Generation: ' + this.generation.toString(), {
        fontFamily: 'Arial',
        fontSize: 20 + 'px',
        stroke: '#ffffff',
        strokeThickness: 1,
        color: '#000000'
      })
      .setDepth(2);

    // Init empty grid
    for (let cells of this.grid.getCells()) {
      this.createField(cells.getPosition(), cells.getValue());
    }

    // Load patterns
    this.grid.addPattern(5, 5, PATTERNS.BLINKER);
    this.grid.addPattern(8, 8, PATTERNS.BLOCK);
    this.grid.addPattern(20, 20, PATTERNS.EATER1);
    this.grid.addPattern(30, 40, PATTERNS.GLIDER);
    this.grid.addPattern(40, 20, PATTERNS.HERSCHEL);

    // Init timer
    this.timerForNextGeneration = this.time.addEvent({
      delay: 500,
      callback: this.nextGeneration,
      callbackScope: this,
      loop: true
    });
  }

  /**
   * This function creates the next generation with the predefined
   * set of rules.
   */
  private nextGeneration(): void {
    // Go to the next generation and update text
    this.generation++;
    this.generationText.setText('Generation: ' + this.generation.toString());

    this.grid.evaluateRules();
    this.clearGraphix();
    for (let cells of this.grid.getCells()) {
      this.createField(cells.getPosition(), cells.getValue());
    }
  }

  /**
   * This function creates a new field if the value is 1.
   * The color is set with the variable fieldColor.
   * The alpha is set with the variable fieldAlpha.
   * @param i [The field index in the cells array]
   * @param v [The field value]
   */
  private createField(position: Phaser.Math.Vector2, value: number): void {
    let g = this.add.graphics();
    if (value === 1) {
      g.fillStyle(this.fieldColor, this.fieldAlpha);
    } else {
      g.fillStyle(0xfcfcfc, 1);
    }

    g.fillRect(
      1 + position.x * this.cellWidth,
      1 + position.y * this.cellHeight,
      this.cellWidth - 2,
      this.cellHeight - 2
    );

    this.cellsGraphics.push(g);
  }

  private clearGraphix(): void {
    for (let i = 0; i < this.cellsGraphics.length; i++) {
      this.cellsGraphics[i].destroy();
    }
  }
}
