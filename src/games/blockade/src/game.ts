/**
 * In October 1976 Gremlin published a 2-player Maze Game called Blockade.
 * It is the first of what would become known as snake games.
 *
 * The display was 256 x 224 pixels and the game had only 2 colors.
 * Using four directional buttons, each player could move his character around
 * leaving a solid line behind them, turning at 90 degree angles. To win, a player
 * had to last longer than the opponent before hitting something. The game ended
 * after one player gained six wins ([Wikipedia](<https://en.wikipedia.org/wiki/Blockade_(video_game)>)).
 */

import 'phaser';
import { GameConfig } from './config';

export class Game extends Phaser.Game {
  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config);
  }
}

window.addEventListener('load', () => {
  const game = new Game(GameConfig);
});
