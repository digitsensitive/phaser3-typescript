import { GameScene } from './scenes/game-scene';

export const GameConfig: Phaser.Types.Core.GameConfig = {
  title: 'Alpha Adjust',
  url: 'https://github.com/digitsensitive/phaser3-typescript',
  version: '2.0',
  width: 800,
  height: 600,
  type: Phaser.AUTO,
  parent: 'game',
  scene: [GameScene],
  input: {
    mouse: true
  },
  backgroundColor: '#1d2b53',
  render: { pixelArt: true, antialias: false }
};
