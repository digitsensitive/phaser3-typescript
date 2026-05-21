import 'phaser';
import './eduplay'; // initializes EduPlay client + preloads the first question
import { GameConfig } from './config';

export class Game extends Phaser.Game {
  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config);
  }
}

window.addEventListener('load', () => {
  const game = new Game(GameConfig);
});
