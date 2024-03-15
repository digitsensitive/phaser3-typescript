import { GameScene } from './scenes/game-scene';

export const GameConfig: Phaser.Types.Core.GameConfig = {
  title: 'Fractal tree',
  url: 'https://github.com/digitsensitive/phaser3-typescript',
  version: '0.0.1',
  width: 600,
  height: 600,
  type: Phaser.AUTO,
  parent: 'game',
  scene: [GameScene],
  backgroundColor: '#de3412',
  render: { pixelArt: false, antialias: true }
};
