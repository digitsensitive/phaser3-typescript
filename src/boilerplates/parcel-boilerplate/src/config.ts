import { MainScene } from './scenes/main-scene';

export const GameConfig: Phaser.Types.Core.GameConfig = {
  title: 'Webpack-Boilerplate',
  url: 'https://github.com/digitsensitive/phaser3-typescript',
  version: '2.0',
  width: 800,
  height: 600,
  backgroundColor: 0x282c34,
  type: Phaser.AUTO,
  parent: 'game',
  scene: [MainScene]
};
