/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2020 Digitsensitive
 * @description  Game Of Life: Patterns
 * @license      Digitsensitive
 */

/**
 * A selection of patterns for Game of Life
 * https://www.conwaylife.com
 */
export const PATTERNS = {
  BLINKER: [[1, 1, 1]],
  BLOCK: [
    [1, 1],
    [1, 1]
  ],
  EATER1: [
    [1, 1, 0, 0],
    [1, 0, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 1, 1]
  ],
  GLIDER: [
    [0, 1, 0],
    [0, 0, 1],
    [1, 1, 1]
  ],
  HERSCHEL: [
    [1, 0, 0],
    [1, 1, 1],
    [1, 0, 1],
    [0, 0, 1]
  ]
};
