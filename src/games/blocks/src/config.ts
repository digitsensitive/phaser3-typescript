import { BootScene } from './scenes/boot-scene';
import { GameScene } from './scenes/game-scene';

export const GameConfig: Phaser.Types.Core.GameConfig = {
  title: 'Blocks',
  url: 'https://github.com/digitsensitive/phaser3-typescript',
  version: '0.0.1',
  width: 160,
  height: 144,
  zoom: 3,
  type: Phaser.AUTO,
  parent: 'game',
  scene: [BootScene, GameScene],
  backgroundColor: '#24232e',
  render: { pixelArt: true, antialias: false }
};
