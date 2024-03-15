import { GameScene } from './scenes/game-scene';

export const GameConfig: Phaser.Types.Core.GameConfig = {
  title: 'Point in Polygon',
  url: 'https://github.com/digitsensitive/phaser3-typescript',
  version: '0.0.1',
  width: 600,
  height: 600,
  type: Phaser.AUTO,
  parent: 'game',
  scene: [GameScene],
  physics: {
    default: 'arcade'
  },
  backgroundColor: '#000000',
  render: { pixelArt: false, antialias: true }
};
