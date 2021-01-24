/** This is just a concept for a game **/

import 'phaser';
import { BootScene } from './scenes/boot-scene';
import { GameScene } from './scenes/game-scene';

const config: Phaser.Types.Core.GameConfig = {
  title: 'Blocks',
  url: 'https://github.com/digitsensitive/phaser3-typescript',
  version: '1.0',
  width: 160,
  height: 144,
  zoom: 3,
  type: Phaser.AUTO,
  parent: 'game',
  scene: [BootScene, GameScene],
  backgroundColor: '#24232e',
  render: { pixelArt: true, antialias: false }
};

export class Game extends Phaser.Game {
  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config);
  }
}

window.addEventListener('load', () => {
  var game = new Game(config);
});
