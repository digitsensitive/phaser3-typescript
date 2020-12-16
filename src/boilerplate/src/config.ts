import { MainScene } from './scenes/main-scene';

export const GameConfig: Phaser.Types.Core.GameConfig = {
  title: 'Boilerplate',
  url: 'https://github.com/digitsensitive/phaser3-typescript',
  version: '2.0',
  width: 800,
  height: 600,
  type: Phaser.AUTO,
  parent: 'game',
  scene: [MainScene]
};
